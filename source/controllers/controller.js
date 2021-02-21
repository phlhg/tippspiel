import View from "../views/view";

export default class Controller {
    
    constructor(){
        this.view = new View();
        this._active = false;
        this._timeout = -1;
        this.params = {};
        this.init();
    }

    setView(v){
        this.view.remove();
        this.view = new v();
    }

    init(){ }

    async _load(params){
        if(!this._active){
            this._active = true;
            this.params = params ?? {};
            if(await this.load() !== false){
                this.view._show();
                App.setEvents(this.view.root);
            }
        }
    }

    async load(){ }

    _unload(){
        if(this._active){
            this.view._hide()
            setTimeout(() => { this.unload() }, 250);
            this._active = false;
        }
    }

    unload(){ }

}