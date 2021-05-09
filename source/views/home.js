import View from './view'
import GameTile from './components/gametile'
import EventTile from './components/eventtile';

export default class Home extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = 
        `<div class="tipp_home_event" style="margin-bottom: 20px;"></div>
        <div class="tipp_home_upcoming"></div>
        <h3>${Lang.get("section/home/pastgames")}</h3>
        <div class="tipp_home_over"></div>`

        this.events = this.root.querySelector(".tipp_home_event");
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

    addEvent(event){
        var e = new EventTile(event);
        this.events.appendChild(e.getHtml())
    }

    clear(){
        this.upcoming.innerHTML = '';
        this.over.innerHTML = '';
        this.events.innerHTML = '';
    }

}