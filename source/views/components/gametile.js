import TippDate from '../../helper/date';
import { GameStatus } from '../../models/games/enums';
import Component from './component'

export default class GameTile extends Component {
    
    constructor(promise){
        super("game","a", promise);
        this.init();
    }

    init(){
        this.view.root.classList.add("game-tile")
        this.view.root.classList.add("loading")
        this.view.root.innerHTML = `
        <span class="t1 tflag"></span>
        <span class="t2 tflag"></span>
        <span class="t1 name"></span>
        <span class="t2 name"></span>
        <div class="result"></div>
        <div class="meta"><span class="date"></span><span class="live-indicator">live</span><span class="tipps"></span></div>`;

        this.view.team1 = this.view.root.querySelector(".t1.name")
        this.view.team2 = this.view.root.querySelector(".t2.name")
        this.view.flag1 = this.view.root.querySelector(".t1.tflag")
        this.view.flag2 = this.view.root.querySelector(".t2.tflag")
        this.view.result = this.view.root.querySelector(".result");
        this.view.date = this.view.root.querySelector(".date");
        this.view.tipps = this.view.root.querySelector(".tipps");
    }

    update(){

        this.view.root.setAttribute("href",this.obj.url);

        this.view.team1.innerText = this.obj.team1.name;
        this.view.team2.innerText = this.obj.team2.name;
        this.view.flag1.setAttribute("data-t",this.obj.team1.short.toLowerCase());
        this.view.flag2.setAttribute("data-t",this.obj.team2.short.toLowerCase());
        this.view.date.innerText = TippDate.toString(this.obj.start)
        this.view.tipps.innerText = this.obj.tipps.length != 1 ? Lang.get("section/game/tipps/multi",{n: this.obj.tipps.length}) : Lang.get("section/game/tipps/single")

        if(this.obj.status != GameStatus.UPCOMING){
            this.view.result.innerText = `${this.obj.team1.score}:${this.obj.team2.score}`
        } else {
            this.view.result.innerText = ""
        }

        if(this.obj.status == GameStatus.RUNNING || this.obj.status == GameStatus.PENDING){ 
            this.view.root.classList.add("live") 
        } else { 
            this.view.root.classList.remove("live")
        }

        this.view.root.classList.remove("loading")

    }

}