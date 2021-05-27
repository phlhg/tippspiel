import Form from '../../components/form';
import TippNotification from '../../helper/notification';
import Section from '../section';

export default class SignIn extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.tokenPattern = new RegExp('^(?:(?:https?:\/\/)?tipp.phlhg.ch\/token\/)?([0-9]{0,9}-[A-Za-z0-9]{5,20})(?:\/)?','i');

        this.view.root.classList.add("tipp-login-page");
        this.view.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/signIn/title")}</h3>
            <p>${Lang.get("section/signIn/desc")}</p>
            <form>
                <input required="" value="" type="text" name="username" style="display:none" />
                <input required="" name="token" type="password" pattern="${this.tokenPattern.source}" placeholder="${Lang.get("section/signIn/placeholder/code")}" />
                <input type="submit" value="${Lang.get("section/signIn/action")}"/>
            </form>
            <span class="meta">
                ${Lang.get("section/signIn/signUpInstead", { a: `<a class="signUpLink">${Lang.get("section/signIn/signUpLink")}</a>` })}<br/><br/>
                ${Lang.get("section/signIn/recover", { a: `<a href="/recover/">${Lang.get("section/signIn/recoverLink")}</a>` })}
            </span>
        </div>`

        this.form = new Form(this.view.root.querySelector("form"));

        this.view.signUpLink = this.view.root.querySelector(".signUpLink");
        this.view.signUpLink.onclick = e => { App.router.overwrite("/signup/"); }
        
        this.view.user = this.view.root.querySelector("input[name='username']")
        this.view.token = this.view.root.querySelector("input[name='token']");
        this.view.token.type = "text";

        this.view.token.onchange = e => { this.view.user.value = this.view.token.value; }
        this.view.token.oninput = e => { this.view.user.value = this.view.token.value; }

        this.form.onSubmit = async (data) => {
            let match = data.token.match(this.tokenPattern);
            if(match === null || match.length < 2){ 
                this.form.info("Bitte gib einen Zugangslink oder Zugangscode ein");
            } else {
                var r = await this.signIn(match[1]);
                if(r){ this.form.reset(); }
            }
        }

    }

    async signIn(token){
        var r = await App.client.signIn(token)
        if(!r.success){
            this.form.error(r.message);
            return false;
        } else {
            TippNotification.create(Lang.get("notifications/postSignIn"), 3000, "login", "success").show();
            App.router.load(window.location.pathname.indexOf("/signin/") < 0 ? window.location.pathname : "/");
            return true;
        }
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        
        if(this._params.hasOwnProperty("token")){
            this.view.token.value = this._params["token"];
            await this.signIn(this._params["token"]);
        }
    }

    async unload(){
        this.form.reset();
    }

}