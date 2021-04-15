import View from './view'
import Form from './helpers/form';

export default class SignIn extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this._pattern = new RegExp('^(?:(?:https?:\/\/)?tipp.phlhg.ch\/token\/)?([0-9]{0,9}-[A-Za-z0-9]{5,20})(?:\/)?','i');
        this.root.classList.add("tipp-login-page");
        this.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/signIn/title")}</h3>
            <p>${Lang.get("section/signIn/desc")}</p>
            <form>
                <input required="" value="" type="text" name="username" style="display:none" />
                <input required="" name="token" type="password" pattern="${this._pattern.source}" placeholder="${Lang.get("section/signIn/placeholder/code")}" />
                <input type="submit" value="${Lang.get("section/signIn/action")}"/>
            </form>
            <span class="meta">
                ${Lang.get("section/signIn/signUpInstead", { a: `<a class="signUpLink">${Lang.get("section/signIn/signUpLink")}</a>` })}<br/><br/>
                ${Lang.get("section/signIn/recover", { a: `<a href="/recover/">${Lang.get("section/signIn/recoverLink")}</a>` })}
            </span>
        </div>`

        this.form = new Form(this.root.querySelector("form"));

        this.signUpLink = this.root.querySelector(".signUpLink");
        this.recoverLink = this.root.querySelector(".recoverLink");

        this.signUpLink.onclick = e => { App.router.overwrite("/signup/"); }
        
        this.user = this.root.querySelector("input[name='username']")
        this.token = this.root.querySelector("input[name='token']");
        this.token.type = "text";

        this.token.onchange = e => { this.user.value = this.token.value; }
        this.token.oninput = e => { this.user.value = this.token.value; }

        this.form.onSubmit = async (data) => {
            let match = data.token.match(this._pattern);
            if(match === null || match.length < 2){ 
                this.info("Bitte gib einen Zugangslink oder Zugangscode ein");
            } else {
                data.token = match[1];
                var r = await this.event("submit",data)
                if(r){ this.form.reset(); }
            }
        }

    }

    hide(){
        this.form.reset();
    }

}