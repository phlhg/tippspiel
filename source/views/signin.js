import View from './view'

export default class SignIn extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("tipp-login-page");
        this.root.innerHTML = `<div class="inner">
            <h3>Anmelden</h3>
            <p>Gib deinen Zugangscode <i>aus der E-Mail</i>, die wir dir gesendet haben, ein.</p>
            <form>
                <input type="text" pattern="TPS[0-9]{9}" placeholder="Zugangscode: z.B. TPS123456789" />
                <input type="submit" value="Anmelden"/>
            </form>
            <span class="meta">Falls du noch keinen Account hast, <a href="/signup/">registriere dich</a></span>
        </div>`
    }

}