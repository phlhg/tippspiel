import Form from './helpers/form';
import View from './view'

export default class RecoverView extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this._pattern = new RegExp('^(?:(?:https?:\/\/)?tipp.phlhg.ch\/token\/)?([0-9]{0,9}-[A-Za-z0-9]{5,20})(?:\/)?','i');
        this.root.classList.add("tipp-login-page");
        this.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/recover/title")}</h3>
            <p>${Lang.get("section/recover/desc")}</p>
            <form>
                <input required="" name="email" type="email" placeholder="${Lang.get("section/recover/placeholder")}" />
                <input type="submit" value="${Lang.get("section/recover/submit")}"/>
            </form>
            <span class="meta">${Lang.get("section/recover/meta1", { a: `<a href="https://phlhg.ch/about/contact/" target="_blank" >${Lang.get("section/recover/meta2")}</a>`})}</span>
        </div>`

        this.form = new Form(this.root.querySelector("form"))
        
        this.email = this.root.querySelector("input[name='email']");

        this.form.onSubmit = data => {
            this.event("submit",data);
        }

    }

    hide(){
        this.email.value = "";
    }



}