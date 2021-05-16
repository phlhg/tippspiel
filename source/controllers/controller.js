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
            await this.load()
            if(this._active){
                this.view._show();
                App.setEvents(this.view.root);
            } else {
                this._unload();
            }
        }
    }

    async load(){ }

    _unload(){
        this.view._hide()
        this.unload()
        //setTimeout(() => { this.unload() }, 250);
        this._active = false;
    }

    unload(){ }

}