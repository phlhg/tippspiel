import View from '../view'
import Form from '../helpers/form'

export default class GroupCreateView extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = `
            <form class="tipp-form" style="margin-top: 10px">
                <input type="text" required="" name="name" value="" placeholder="${Lang.get("section/groups/create/placeholder")}" />
                <input type="submit" value="${Lang.get("section/groups/create/submit")}" style="margin: 5px 0 0 15px;"/>
            </form>`

        this.form = new Form(this.root.querySelector("form"));
        
        this.form.onSubmit = async (data) => {
            await this.event("submit",data);
        }
    }

    clear(){
        this.form.reset();
    }

}