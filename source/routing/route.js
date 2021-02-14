export default class Route {

    constructor(router, pattern, controller){
        this.router = router;
        this.pattern = this._bakePattern(pattern)

        this.root = document.createElement("section");
        this.root.setAttribute("data-route",pattern);
        this.router.root.appendChild(this.root);

        this.controller = new controller(this);
    }

    _bakePattern(p){
        p = p.replace(/\//ig,"\\/");
        p = p.replace(/\{(\w+)\}/ig,'(?<$1>[^/]+)')
        p = '^'+p+'$'
        return new RegExp(p,'i');
    }

    matches(path){
        return this.pattern.test(path);
    }

    take(path){
        if(!this.matches(path)){ return false; }
        var match = this.pattern.exec(path);
        return this.load(match.groups ? match.groups : {});
    }

    load(params){
        params = params ?? {}
        this.controller._load(params);
        return true;
    }

    unload(){
        this.controller._unload();
    }

}