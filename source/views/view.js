export default class View {

    constructor(){
        this.active = false;
        this.root = document.createElement("section");
        document.querySelector(".tipp-section-wrapper").appendChild(this.root);
        this.init();
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