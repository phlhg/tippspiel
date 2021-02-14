import View from "../views/view";

export default class Controller {
    
    constructor(route){

        this.params = {};
        this.view = new View();

        this.route = route;
        this.router = this.route.router;
        this.app = this.router.app;
        this.models = this.app.models;

        this.init();
    }

    setView(v){
        this.view.remove();
        this.view = new v();
    }

    init(){ }

    _load(params){
        this.params = params ?? {};
        this.load();
        this.view._show();
        this.app.setEvents(this.view.root);
    }

    load(){ }

    _unload(){
        this.view._hide();
        setTimeout(() => { this.unload() }, 400);
    }

    unload(){ }

}