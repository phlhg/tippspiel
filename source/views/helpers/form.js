export default class Form {

    constructor(root){

        this.root = root;
        this.dom = {}
        this.dom.submit = this.root.querySelector("input[type=submit]");

        this.dom.info = document.createElement("span");
        this.dom.info.classList.add("info");
        this.dom.error = document.createElement("span");
        this.dom.error.classList.add("error");

        this.root.insertBefore(this.dom.info, this.dom.submit);
        this.root.insertBefore(this.dom.error, this.dom.submit);

        this.onSubmit = (data) => {}

        this.setEvents();
    }

    setEvents(){
        this.root.addEventListener("submit",e => {
            e.preventDefault();
            this.info(""); 
            this.error("");
            let data = Object.fromEntries(new FormData(e.target).entries());
            this.onSubmit(data)
        })
    }


    info(message){
        this.dom.info.innerText = message;
    }

    error(message){
        this.dom.error.innerText = message;
    }

}