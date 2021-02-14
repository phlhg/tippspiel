import View from './view'

export default class SignIn extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("tipp-login-page");
        this.root.innerHTML = `<div class="inner">
            <h3>Registrieren</h3>
            <p>Gib deinen Namen und deine E-Mail ein und erhalte von uns einen Zugangscode.</p>
            <form>
                <input type="name" placeholder="Name: z.B. Max Mustermann" />
                <input type="email" placeholder="E-Mail: z.B. max.mustermann@beispiel.ch" />
                <input type="submit" value="Registrieren"/>
            </form>
            <span class="meta">Falls du schon einen Account hast, <a href="/signin/">melde dich an</a></span>
        </div>`;
    }

}