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
                <input name="name" type="name" required="" placeholder="Name: z.B. Max Mustermann" />
                <input name="email" type="email" required="" placeholder="E-Mail: z.B. max.mustermann@beispiel.ch" />
                <span class="info"></span>
                <span class="error"></span>
                <input type="submit" value="Registrieren"/>
            </form>
            <span class="meta">Falls du schon einen Account hast, <a href="/signin/">melde dich an</a></span>
        </div>`;
        this.form = this.root.querySelector("form");
        this.dominfo = this.root.querySelector(".info");
        this.domerror = this.root.querySelector(".error");

        this.event.submit = (data) => {};
        this.form.addEventListener("submit",e => {
            e.preventDefault();
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