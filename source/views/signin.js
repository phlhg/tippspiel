import View from './view'

export default class SignIn extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this._pattern = new RegExp('^(?:(?:https?:\/\/)?new.phlhg.ch\/token\/)?([0-9]{0,9};[A-Za-z0-9]{10})(?:\/)?','i');
        this.root.classList.add("tipp-login-page");
        this.root.innerHTML = `<div class="inner">
            <h3>Anmelden</h3>
            <p>Gib deinen Zugangscode oder den Link <i>aus der E-Mail</i>, die wir dir gesendet haben, ein.</p>
            <form>
                <input required="" name="token" title="Code aus 9 Zahlen oder ein Anmelde-Link" type="text" pattern="${this._pattern.source}" placeholder="Zugangscode: z.B. 0;1a2b3c4d5e" />
                <span class="info"></span>
                <span class="error"></span>
                <input type="submit" value="Anmelden"/>
            </form>
            <span class="meta">Falls du noch keinen Account hast, <a href="/signup/">registriere dich</a></span>
        </div>`
        this.form = this.root.querySelector("form");
        this.dominfo = this.root.querySelector(".info");
        this.domerror = this.root.querySelector(".error");

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