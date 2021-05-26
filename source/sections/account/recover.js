import Form from '../../components/form';
import Section from '../section';

export default class Recover extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.view.root.classList.add("tipp-login-page");
        this.view.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/recover/title")}</h3>
            <p>${Lang.get("section/recover/desc")}</p>
            <form>
                <input required="" name="email" type="email" placeholder="${Lang.get("section/recover/placeholder")}" />
                <input type="submit" value="${Lang.get("section/recover/submit")}"/>
            </form>
            <span class="meta">${Lang.get("section/recover/meta1", { a: `<a href="https://phlhg.ch/about/contact/" target="_blank" >${Lang.get("section/recover/meta2")}</a>`})}</span>
        </div>`

        this.form = new Form(this.view.root.querySelector("form"))
        
        this.email = this.view.root.querySelector("input[name='email']");

        this.form.onSubmit = async data => {
            var r = await App.client.recoverToken(data.email);
            if(!r.success){
                this.form.error(r.message);
            } else {
                this.form.reset()
                App.router.load("/signin/");
            }
        }

    }

    async load(){
        if(!App.promptConnection()){ return false; }
    }

    async unload(){
        this.form.reset()
    }



}