import TippDate from '../../helper/date';
import { GameStatus } from '../../models/games/enums';
import Component from './component'

export default class GameTile extends Component {
    
    constructor(promise){
        super("game","a");
        this.init();
        promise.then(game => {
            this.set(game)
        },e => {
            console.log("LOL");
            this.remove();
        })
    }

    init(){
        this.view.root.classList.add("game-tile")
        this.view.root.classList.add("loading")
        this.view.root.innerHTML = `<span class="live-indicator">live</span><span class="title"><span class="tflag"></span> <span class="t"></span> <span class="tflag"></span></span><span class="meta"></span></div>`;
        this.view.title = this.view.root.querySelector(".title > .t")
        this.view.flag1 = this.view.root.querySelectorAll(".title .tflag")[0]
        this.view.flag2 = this.view.root.querySelectorAll(".title .tflag")[1]
        this.view.meta = this.view.root.querySelector(".meta");

        this.view.title.innerText = `AAA 0:0 AAA`;
        this.view.meta.innerText = `00.00 00:00 | 0 Tipps`;
    }

    update(){
        this.view.root.setAttribute("href",`/game/${this.obj.id}/${this.obj.team1.short.toLowerCase()}-${this.obj.team2.short.toLowerCase()}/`)
        this.view.title.innerText = `${this.obj.team1.name}  ${this.obj.team1.score}:${this.obj.team2.score}  ${this.obj.team2.name}`;
        this.view.flag1.setAttribute("data-t",this.obj.team1.short.toLowerCase());
        this.view.flag2.setAttribute("data-t",this.obj.team2.short.toLowerCase());
        this.view.meta.innerText = `${TippDate.toString(this.obj.start)} | ${this.obj.tipps.length != 1 ? Lang.get("section/game/tipps/multi",{n: this.obj.tipps.length}) : Lang.get("section/game/tipps/single") }`;
        this.view.root.classList.remove("loading")
        
        if(this.obj.status == GameStatus.RUNNING){ 
            this.view.root.classList.add("live") 
        } else { 
            this.view.root.classList.remove("live")
        }

    }

}