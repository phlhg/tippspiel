import Section from '../../section'
import Form from '../../../components/form';

export default class SignUpName extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.classList.add("tipp-login-page");
        this.view.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/signUp/name/title")}</h3>
            <p>${Lang.get("section/signUp/name/desc")}</p>
            <form>
                <input name="name" type="name" required="" placeholder="${Lang.get("section/signUp/placeholder/name")}" />
                <input type="submit" value="${Lang.get("section/signUp/name/action")}"/>
            </form>
            <span class="meta">${Lang.get("section/signUp/name/meta")}</span>
        </div>`;

        this.form = new Form(this.view.root.querySelector("form"));
        this.form.onSubmit = async data => {

            if(!("email" in this._params) || this._params.email == null){ App.router.overwrite("/signup/"); return false; }

            if(!("name" in data) || data.name.length < 1){
                this.form.info(Lang.get("section/signUp/errors/noName"));
                return false;
            }

            if(data.name.length > 50){
                this.form.info(Lang.get("section/signUp/errors/nameTooLong"));
                return false;
            }

            var r = await App.client.singUp(data.name, this._params.email)

            if(!r.success){
                if(r._response.error == "2"){
                    await App.router.forward("/signup/", {
                        forwarded: true,
                        email: this._params.email,
                        name: data.name,
                        error: r.message
                    });
                    return false;
                } else {
                    this.form.error(r.message);
                    return false;
                }
            }

            await App.router.load("/signup/3/", { forwarded: true });

        }
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!("forwarded" in this._params) || this._params?.email == null){ App.router.forward("/signup/"); return false; }
        if("name" in this._params && this._params.name != null){ this.form.root.querySelector("input[name='name']").value = this._params.name; }
        if("error" in this._params){ this.form.error(this._params.error); }
    }

    async unload(){
        this.form.reset();
    }

}