import View from '../view'

export default class GroupsIndexView extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("tipp-error-page");
        this.root.innerHTML = `<div class="inner">
            <h3>${Lang.get("section/groups/title")}</h3>
            <p>${Lang.get("section/groups/desc")}</p>
        </div>`
    }

}
