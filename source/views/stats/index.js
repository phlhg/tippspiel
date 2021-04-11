import RankTile from '../components/ranktile'
import View from '../view'

export default class TippIndexView extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `<div class="rank-list rank"></div>`
        this.list = this.root.querySelector(".rank-list");
    }

    addUser(u){
        var u = new RankTile(u);
        this.list.appendChild(u.getHtml());
        return u;
    }

    clear(){
        this.list.innerHTML = ``
    }

}