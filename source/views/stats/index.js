import UserTile from '../components/usertile'
import View from '../view'

export default class TippIndexView extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `<div class="user-list rank"></div>`
        this.list = this.root.querySelector(".user-list");
    }

    addUser(u){
        var u = new UserTile(u);
        this.list.appendChild(u.getHtml());
        return u;
    }

    clear(){
        this.list.innerHTML = ``
    }

}