import Debugger from '../debugger';

export default class View {

    constructor(){
        this._events = {};
        this._timeout = -1;
        this.root = document.createElement("section");
        this.root.setAttribute("data-view",this.constructor.name);
        document.querySelector(".tipp-section-wrapper").appendChild(this.root);
        this.init();
    }

    on(e,callback){
        this._events[e] = callback;
    }

    async event(e,...args){
        if(this._events.hasOwnProperty(e)){
            return await this._events[e](...args);
        } else {
            Debugger.error(this,`Unknown event "${e}" was called`)();
            return false;
        }
    }

    init(){

    }

    _show(){
        this.show();
        /*clearTimeout(this._timeout)
        this._timeout = setTimeout(() => { this.root.classList.add("active") },250);*/
        this.root.classList.add("active")
    }

    show(){

    }

    _hide(){
        this.root.classList.remove("active");
        /*clearTimeout(this._timeout)
        this._timeout = setTimeout(() => { this.hide(); },250)*/
        this.hide();
    }

    hide(){

    }

    remove(){
        this.root.remove();
    }

    clear(){
        
    }

}