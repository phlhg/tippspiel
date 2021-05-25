import Section from '../section'
import Form from '../../helper/form';

export default class SignUp extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.classList.add("tipp-login-page");
        this.view.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/signUp/title")}</h3>
            <p>${Lang.get("section/signUp/desc")}</p>
            <form>
                <input name="name" type="name" required="" placeholder="${Lang.get("section/signUp/placeholder/name")}" />
                <input name="email" type="email" required="" placeholder="${Lang.get("section/signUp/placeholder/email")}" />
                <input type="submit" value="${Lang.get("section/signUp/action")}"/>
            </form>
            <span class="meta">${Lang.get("section/signUp/signInInstead",{ a: `<a class="signInLink" >${Lang.get("section/signUp/signInLink")}</a>` })}</span>
        </div>`;

        this.form = new Form(this.view.root.querySelector("form"));

        this.view.singInLink = this.view.root.querySelector(".signInLink");
        this.view.singInLink.onclick = e => { App.router.overwrite("/signin/"); }

        this.form.onSubmit = async data => {

            var r = await App.client.singUp(data.name, data.email)
            if(!r.success){
                this.form.error(r.message);
                return false;
            } else {
                TippNotification.success(Lang.get("notifications/postSignUp"),8000);
                App.router.load(window.location.pathname);
                this.form.reset();
            }

        }
    }

    async load(){
        if(!App.promptConnection()){ return false; }
    }

    async unload(){
        this.form.reset();
    }

}