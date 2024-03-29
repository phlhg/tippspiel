import Debugger from "./debugger";

export default class Language {

    constructor(){

        this.id = "en" //Default language
        this.ref = {};

        this.available = Object.keys(__LANG);
        // From: https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
        this.available.sort((a,b) => __LANG[a]._name.localeCompare(__LANG[b]._name))

        if(localStorage.getItem("tipp-lang") != null){
            if(!this.setLanguage(localStorage.getItem("tipp-lang"))){ this.setLanguage("en") }
        } else {
            var matching = navigator.languages
            .map(l => l.toLowerCase().split("-")[0]) // Remove region
            .filter((v, i, a) => a.indexOf(v) == i) // Remove duplicates
            .filter(l => this.available.includes(l)) // Filter available

            if(matching.length > 0){ 
                this.setLanguage(matching[0])
            } else {
                this.setLanguage("en")
            }
        }

    }

    async setLanguage(id){
        if(!this.available.includes(id)) return false;
        this.id = id
        this.ref = this.load(this.id);
        localStorage.setItem("tipp-lang",this.id)
        return true
    }

    load(id){
        var l = [id];
        var n = __LANG[id];
        var t = {};
        while(true){
            if(!n.hasOwnProperty("_extends") || l.includes(n._extends) || !this.available.includes(n._extends)){ break; }
            l.unshift(n._extends);
            n = __LANG[n._extends];
        }
        l.forEach(id => { t = this.merge(t,__LANG[id]); });
        return t;
    }

    merge(one,two){
        var o = one;
        if(typeof one !== 'object'){
            if(typeof two === 'object'){  Debugger.error(this,`Detected inconsistent property in language - Overwritten`)() }
            return two;
        }
        for(var i in two){
            if(i in o){
                o[i] = this.merge(o[i],two[i])
            } else {
                o[i] = two[i];
            }
        }
        return o;
    }


    getError(id,data){
        data = data ?? {}
        var e = this.getRaw("errors/server");
        if(e.hasOwnProperty(id)){ return this.bake(e[id],data);  }
        return this.bake(e[0],data)
    }

    get(path,data){
        data = data ?? {}
        var t = this.getRaw(path);
        if(typeof t === 'object'){
            Debugger.warn(this,`Object "${path}" can't be inserted - Use Lang.getRaw() instead`)()
            return `[${path}]`
        }
        return this.bake(t,data);
    }

    getRaw(path){
        var t = this.resolve(this.ref,path.split("/"));
        if(t === false){ 
            Debugger.warn(this,`Translation for "${path}" was not found - Placeholder was returned`)()
            return `[${path}]`; 
        }
        return t;
    }

    resolve(object,path){
        var next = path.shift();
        if(path.length < 1){ return object[next] ?? false; }
        if(typeof object === 'object' && next in object){
            return this.resolve(object[next],path);
        } else {
            return false
        }
    }

    bake(text, data){
        data = data ?? {}
        return text.replace(/{(\w+)}/ig, (match, id) => {
            if(!data.hasOwnProperty(id)){
                Debugger.warn(this,`Parameter "${id}" was not supplied for "${text}"`)();
                return "{"+id+"}";
            }
            return data[id];
        })
    }

    normalize(text){
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("ø","o").toLowerCase()
    }

}