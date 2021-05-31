import TippNotification from "../helper/notification";

export default class Form {

    constructor(root){

        this.root = root;

        this.dom = {}

        this.dom.submitInput = this.root.querySelector("input[type='submit']");
        this.dom.submitInput.style.display = "none";

        this.dom.submitWrapper = document.createElement("div")
        this.dom.submitWrapper.classList.add("submit")

        this.dom.submitText = document.createElement("span");
        this.dom.submitText.innerText = this.dom.submitInput.value;

        this.dom.loader = document.createElement("span");
        this.dom.loader.classList.add("loader");

        this.dom.submitWrapper.appendChild(this.dom.submitText)
        this.dom.submitWrapper.appendChild(this.dom.loader)

        this.root.appendChild(this.dom.submitWrapper)

        this.dom.info = document.createElement("span");
        this.dom.info.classList.add("info");
        this.dom.error = document.createElement("span");
        this.dom.error.classList.add("error");

        this.root.appendChild(this.dom.info);
        this.root.appendChild(this.dom.error);

        this.onSubmit = async (data) => {}

        this.isSubmitting = false;

        this.setEvents();

    }

    setEvents(){
        this.root.addEventListener("submit",e => { this._onSubmit(e) })
        this.dom.submitWrapper.addEventListener("click", e => { this._onSubmit(e) })
    }

    async _onSubmit(e){
        e.preventDefault();
            
        // Check if form is already submitting
        if(this.isSubmitting){ return; }
        this.isSubmitting = true;

        this.info(""); 
        this.error("");
        let data = Object.fromEntries(new FormData(this.root).entries());
        this.dom.loader.classList.add("active");

        // Small timeout to prevent to many submits
        await new Promise(r => setTimeout(r,250))

        await this.onSubmit(data);

        this.dom.loader.classList.remove("active");
        this.isSubmitting = false;
    }


    info(message){
        this.dom.info.innerText = message;
    }

    error(message){
        this.dom.error.innerText = message;
    }

    reset(){
        this.info(""); 
        this.error("");
        this.root.reset();
    }

}