import View from "../views/view";

export default class Controller {
    
    constructor(){
        this.params = {};
        this.view = new View();
        this.init();
    }

    setView(v){
        this.view.remove();
        this.view = new v();
    }

    init(){ }

    _load(params){
        this.params = params ?? {};
        if(this.load() !== false){
            this.view._show();
            App.setEvents(this.view.root);
        }
    }

    load(){ }

    _unload(){
        this.view._hide();
        setTimeout(() => { this.unload() }, 400);
    }

    unload(){ }

}