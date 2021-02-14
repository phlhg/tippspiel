export default class Component {

    constructor(type, id, element){
        this._type = type;
        this._id = id;
        this.view = {}
        this.view.root = document.createElement(element);

        this._func = function(e){
            if(e.detail?.type == this._type && e.detail?.id == this._id){ 
                this.update(); 
            }
        }.bind(this);
        window.addEventListener("datachange", this._func);
        this.view.root.addEventListener("removed",e => { 
            window.removeEventListener("datachange",this._func) 
        });
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