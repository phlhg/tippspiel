import View from './view'

export default class SignUp extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("tipp-login-page");
        this.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/signUp/title")}</h3>
            <p>${Lang.get("section/signUp/desc")}</p>
            <form>
                <input name="name" type="name" required="" placeholder="${Lang.get("section/signUp/placeholder/name")}" />
                <input name="email" type="email" required="" placeholder="${Lang.get("section/signUp/placeholder/email")}" />
                <span class="info"></span>
                <span class="error"></span>
                <input type="submit" value="${Lang.get("section/signUp/action")}"/>
            </form>
            <span class="meta">${Lang.get("section/signUp/signInInstead",{ a: `<a href="/signin/">${Lang.get("section/signUp/signInLink")}</a>` })}</span>
        </div>`;
        this.form = this.root.querySelector("form");
        this.dominfo = this.root.querySelector(".info");
        this.domerror = this.root.querySelector(".error");

        this.event.submit = (data) => {};
        this.form.addEventListener("submit",e => {
            e.preventDefault();
            this.event("submit",Object.fromEntries(new FormData(e.target).entries())).then(r => {
                if(r){ this.form.reset(); }
            })
        })
    }

    hide(){
        this.clear();
        this.info("");
        this.error("");
    }

    clear(){
        this.form.reset();
    }

    info(message){
        this.dominfo.innerText = message;
    }

    error(message){
        this.domerror.innerText = message;
    }

}