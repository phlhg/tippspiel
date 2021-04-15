import Form from './helpers/form';
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
                <input type="submit" value="${Lang.get("section/signUp/action")}"/>
            </form>
            <span class="meta">${Lang.get("section/signUp/signInInstead",{ a: `<a class="signInLink" >${Lang.get("section/signUp/signInLink")}</a>` })}</span>
        </div>`;

        this.form = new Form(this.root.querySelector("form"));

        this.singInLink = this.root.querySelector(".signInLink");
        this.singInLink.onclick = e => { App.router.overwrite("/signin/"); }

        this.event.submit = (data) => {};

        this.form.onSubmit = async data => {
            var r = await this.event("submit",data)
            if(r){ this.form.reset(); }
        }
    }

    hide(){
        this.form.reset();
    }

}