export default class Section {

    constructor(){

        this._active = false;
        this._params = {};

        this.view = {}
        this.view.root = document.createElement("section");
        this.view.root.setAttribute("data-section",this.constructor.name);
        document.querySelector(".tipp-section-wrapper").appendChild(this.view.root);

        this.init();

    }

    init(){ }

    async _load(params){
        if(!this._active){
            this._active = true;
            this._params = params ?? {};
            await this.load();
            if(this._active){
                this.view.root.classList.add("active");
                App.setEvents(this.view.root);
            } else {
                this._unload();
            }
        }
    }

    async load(){ }

    async _unload(){
        this.view.root.classList.remove("active");
        this.unload()
        this._active = false;
    }

    async unload(){ }

}