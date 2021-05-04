export default class Form {

    constructor(root){

        this.root = root;

        this.dom = {}
        this.dom.submit = this.root.querySelector("input[type=submit]");

        this.dom.info = document.createElement("span");
        this.dom.info.classList.add("info");
        this.dom.error = document.createElement("span");
        this.dom.error.classList.add("error");

        this.dom.loader = document.createElement("span");
        this.dom.loader.classList.add("loader");

        this.root.insertBefore(this.dom.info, this.dom.submit);
        this.root.insertBefore(this.dom.error, this.dom.submit);
        this.root.appendChild(this.dom.loader);

        this.onSubmit = async (data) => {}

        this.isSubmitting = false;

        this.setEvents();

    }

    setEvents(){
        this.root.addEventListener("submit",async e => {
            e.preventDefault();
            
            // Check if form is already submitting
            if(this.isSubmitting){ return; }
            this.isSubmitting = true;

            this.info(""); 
            this.error("");
            let data = Object.fromEntries(new FormData(e.target).entries());
            this.dom.loader.classList.add("active");

            await this.onSubmit(data);

            this.dom.loader.classList.remove("active");
            this.isSubmitting = false;
        })
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