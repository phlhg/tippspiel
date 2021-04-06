export default class Route {

    constructor(pattern, controller){
        this.raw = pattern;
        this.pattern = null;
        this.params = {}
        this.controller = controller;
        this.bakePattern()
    }

    bakePattern(){
        var p = this.raw;
        p = p.replace(/\//ig,"\\/")
        p = p.replace(/\{(\w+)\}/ig,(m,name) => {
            if(name in this.params)
                return `(?<${name}>${this.params[name]})`
            return `(?<${name}>[^/]+)`
        })
        p = '^'+p+'$'
        this.pattern = new RegExp(p,'i');
    }

    matches(path){
        return this.pattern.test(path);
    }

    take(path){
        if(!this.matches(path)){ return false; }
        var match = this.pattern.exec(path);
        return this.load(Object.assign({}, match.groups ? match.groups : {}));
    }

    load(params){
        params = params ?? {}
        this.controller._load(params);
        return true;
    }

    unload(){
        this.controller._unload();
    }

    where(params){
        var pre = { 'NUMBER': '\\d+', 'TEXT': '[^\/]+' } // Predefined regexp
        for(var [key, value] of Object.entries(params)){
            if(value in pre){
                this.params[key] = pre[value];
            } else {
                this.params[key] = value;
            } 
        }
        this.bakePattern();
        return this;
    }

    alias(pattern){
        return App.router.add(pattern, this.controller);
    }

}