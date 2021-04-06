import View from './view'
import GameTile from './components/gametile'

export default class Home extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `<div class="tipp_home_upcoming"></div><h3>${Lang.get("section/home/pastgames")}</h3><div class="tipp_home_over"></div>`
        this.upcoming = this.root.querySelector(".tipp_home_upcoming");
        this.over = this.root.querySelector(".tipp_home_over");
    }

    addUpcoming(game){
        let g = new GameTile(game);
        this.upcoming.appendChild(g.getHtml())
    }

    addOver(game){
        let g = new GameTile(game);
        this.over.appendChild(g.getHtml())
    }

    clear(){
        this.upcoming.innerHTML = '';
        this.over.innerHTML = '';
    }

}