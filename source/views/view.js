import Debugger from '../debugger';

export default class View {

    constructor(){
        this.active = false;
        this._events = {};
        this.root = document.createElement("section");
        document.querySelector(".tipp-section-wrapper").appendChild(this.root);
        this.init();
    }



    on(e,callback){
        this._events[e] = callback;
    }

    event(e,...args){
        if(this._events.hasOwnProperty(e)){
            return this._events[e](...args);
        } else {
            Debugger.error(this,`Unknown event "${e}" was called`)();
            return false;
        }
    }

    init(){

    }

    _show(){
        this.active = true;
        this.root.classList.add("active");
        this.show();
    }

    show(){

    }

    _hide(){
        if(this.active){
            this.hide();
            this.root.classList.remove("active");
            this.active = false;
        }
    }

    hide(){

    }

    remove(){
        this.root.remove();
    }

}