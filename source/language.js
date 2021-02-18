import Debugger from "./debugger";

export default class Language {

    constructor(){

        this.id = "de" //Default language
        this.ref = __LANG.de;

        this.available = Object.keys(__LANG);

        if(localStorage.getItem("tipp-lang") != null){
            this.setLanguage(localStorage.getItem("tipp-lang"))
        } else {
            var matching = navigator.languages.filter(l => this.available.includes(l))
            if(matching.length > 0){ this.setLanguage(matching[0]) }
        }

    }

    setLanguage(id){
        if(!this.available.includes(id)) return false;
        this.id = id
        this.ref = __LANG[this.id];
        localStorage.setItem("tipp-lang",this.id)
        return true
    }

    getError(id,data){
        data = data ?? {}
        if(!this.ref.errors.hasOwnProperty(id)){ id = 0; }
        return this.bake(__LANG.de.errors[id],data)
    }

    get(path,data){
        data = data ?? {}
        var t = this.resolve(this.ref,path.split("/"));
        if(t === false){ 
            Debugger.warn(this,`Translation for "${path}" was not found - Placeholder was returned`)()
            return `[${path}]`; 
        }
        return this.bake(t,data);
    }

    resolve(object,path){
        var next = path.shift();
        if(next in object){
            if(typeof object[next] !== 'object'){
                return object[next]
            } else {
                return this.resolve(object[next],path);
            }
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

}