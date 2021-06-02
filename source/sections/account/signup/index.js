import Section from '../../section'
import Form from '../../../components/form';

export default class SignUp extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.classList.add("tipp-login-page");
        this.view.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/signUp/email/title")}</h3>
            <p>${Lang.get("section/signUp/email/desc")}</p>
            <form>
                <input name="email" type="email" required="" placeholder="${Lang.get("section/signUp/placeholder/email")}" />
                <input type="submit" value="${Lang.get("section/signUp/email/action")}"/>
            </form>
            <span class="meta">
                ${Lang.get("section/signUp/email/meta")}<br/>
                <br/>
                ${Lang.get("section/signUp/signInInstead",{ a: `<a href="/signin/" >${Lang.get("section/signUp/signInLink")}</a>` })}
            </span>
        </div>`;

        this.form = new Form(this.view.root.querySelector("form"));

        this.form.onSubmit = async data => {

            if(!("email" in data) || data.email.length < 1){
                this.form.info(Lang.get("section/signUp/errors/noEmail"));
                return false;
            }

            await App.router.load("/signup/2/", { 
                forwarded: true, 
                name: this._params.name ?? null,
                email: data.email
            });

        }
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if("email" in this._params && this._params.email != null){ this.form.root.querySelector("input[name='email']").value = this._params.email; }
        if("error" in this._params){ this.form.error(this._params.error); }
    }

    async unload(){
        this.form.reset();
    }

}