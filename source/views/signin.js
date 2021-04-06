import View from './view'

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
                <span class="info"></span>
                <span class="error"></span>
                <input type="submit" value="${Lang.get("section/signIn/action")}"/>
            </form>
            <span class="meta">${Lang.get("section/signIn/signUpInstead", { a: `<a href="/signup/">${Lang.get("section/signIn/signUpLink")}</a>` })}</span>
        </div>`

        this.form = this.root.querySelector("form");
        this.dominfo = this.root.querySelector(".info");
        this.domerror = this.root.querySelector(".error");
        
        this.user = this.root.querySelector("input[name='username']")
        this.token = this.root.querySelector("input[name='token']");
        this.token.type = "text";

        this.token.onchange = e => { this.user.value = this.token.value; }

        this.form.addEventListener("submit",e => {
            e.preventDefault();
            this.info("");
            this.error("");
            let data = Object.fromEntries(new FormData(e.target).entries());
            let match = data.token.match(this._pattern);
            if(match === null || match.length < 2){ 
                this.info("Bitte gib einen Zugangslink oder Zugangscode ein");
            } else {
                data.token = match[1];
                this.event("submit",data).then(r => {
                    if(r){ this.form.reset(); }
                })
            }
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