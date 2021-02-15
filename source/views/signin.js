import View from './view'

export default class SignIn extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("tipp-login-page");
        this.root.innerHTML = `<div class="inner">
            <h3>Anmelden</h3>
            <p>Gib deinen Zugangscode oder den Link <i>aus der E-Mail</i>, die wir dir gesendet haben, ein.</p>
            <form>
                <input required="" name="token" title="Code aus 9 Zahlen oder ein Anmelde-Link" type="text" pattern="^([0-9]{9})|(?:(?:https?:\/\/)?tipp.phlhg.ch\/token\/([0-9]{9})\/)$" placeholder="Zugangscode: z.B. 042069420" />
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
            if(this.event("submit",Object.fromEntries(new FormData(e.target).entries()))){
                this.form.reset();
            }
        })

    }

    hide(){
        this.form.reset();
        this.info("");
        this.error("");
    }

    info(message){
        this.dominfo.innerText = message;
    }

    error(message){
        this.domerror.innerText = message;
    }

}