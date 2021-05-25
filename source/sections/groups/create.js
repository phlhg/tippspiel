import Form from '../../components/form'
import Section from '../section';

export default class GroupCreateView extends Section {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){

        this.view.root.classList.add("tipp-login-page");
        this.view.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/groups/new/title")}</h3>
            <form class="tipp-form" style="margin-top: 10px">
                <input type="text" required="" name="name" value="" placeholder="${Lang.get("section/groups/create/placeholder")}" />
                <input type="submit" value="${Lang.get("section/groups/create/submit")}"/>
            </form>
        </div>`

        this.form = new Form(this.view.root.querySelector("form"));
        
        this.form.onSubmit = async (data) => {
            var r = await App.model.groups.create(data.name);
            if(!r.success){
                this.view.form.error(r.message);
            } else {
                TippNotification.success(Lang.get("section/groups/messages/created"));
                var g = await App.model.groups.get(parseInt(r.data.id));
                App.router.forward(g.url);
            }
        }

    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        if(!App.client.permission.groupCreate){ return App.router.forward(`/groups/`); }
    }

    async unload(){
        this.form.reset();
    }

}