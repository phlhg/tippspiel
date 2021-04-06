export default class Component {

    constructor(type, element){
        this._type = type;
        this._id = -1;
        this.obj = null;
        this.view = {}
        this.view.root = document.createElement(element);
    }

    set(obj){

        this.obj = obj;
        
        this._func = function(e){
            if(e.detail?.type == this._type && e.detail?.id == this._id){ 
                this.update(); 
            }
        }.bind(this);
        
        window.addEventListener("datachange", this._func);

        this.view.root.addEventListener("removed",e => { 
            window.removeEventListener("datachange",this._func) 
        });

        this.update();

        App.setEvents(this.view.root);
    }

    init(){

    }

    update(){

    }

    remove(){
        this.view.root.remove();
    }

    getHtml(){
        return this.view.root;
    }


}