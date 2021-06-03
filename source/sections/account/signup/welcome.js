import Section from '../../section'
import Form from '../../../components/form';

export default class SignUpWelcome extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.classList.add("tipp-login-page");
        this.view.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/signUp/welcome/title")}</h3>
            <p>${Lang.get("section/signUp/welcome/desc")}</p>
            <form>
                <input type="submit" value="${Lang.get("section/signUp/welcome/action")}"/>
            </form>
            <span class="meta">${Lang.get("section/signUp/welcome/meta",{
                a: `<a href="https://phlhg.ch/about/contact/" target="_blank" >${Lang.get("section/signUp/welcome/metaLink")}</a>`
            })}</span>
        </div>`;

        this.form = new Form(this.view.root.querySelector("form"));
        this.form.onSubmit = async data => { await App.router.load("/signin/"); }

    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!("forwarded" in this._params)){ App.router.forward("/signup/"); return false; }
    }

}