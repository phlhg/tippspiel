import TippDate from '../../helper/date';
import { GamePhase, GameStatus } from '../../models/games/enums';
import Tile from './tile';

export default class GameTile extends Tile {
    
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
        <span class="t1 short"></span>
        <span class="t2 short"></span>
        <div class="result"></div>
        <div class="meta"><span class="date"></span><span class="live-indicator">live</span><span class="tipps"></span></div>`;

        this.view.team1 = this.view.root.querySelector(".t1.name")
        this.view.team2 = this.view.root.querySelector(".t2.name")
        this.view.short1 = this.view.root.querySelector(".t1.short")
        this.view.short2 = this.view.root.querySelector(".t2.short")
        this.view.flag1 = this.view.root.querySelector(".t1.tflag")
        this.view.flag2 = this.view.root.querySelector(".t2.tflag")
        this.view.result = this.view.root.querySelector(".result");
        this.view.date = this.view.root.querySelector(".date");
        this.view.tipps = this.view.root.querySelector(".tipps");


        this._metronom = e => {
            if(this.obj != null){
                this.view.date.innerText = this.obj.status == GameStatus.RUNNING ? Lang.get("date/past_min", {m: this.obj.getPlayedTime()}) : TippDate.toString(this.obj.start)
            }
        }

        window.addEventListener("metronom",this._metronom)

        this.view.root.addEventListener("removed",() => {
            window.removeEventListener("metronom",this._metronom);
        })
    }

    update(){

        this.view.root.setAttribute("href",this.obj.url);

        this.view.team1.innerText = this.obj.team1.name;
        this.view.team2.innerText = this.obj.team2.name;
        this.view.short1.innerText = this.obj.team1.short.toUpperCase();
        this.view.short2.innerText = this.obj.team2.short.toUpperCase();
        this.view.flag1.setAttribute("data-t",this.obj.team1.short.toLowerCase());
        this.view.flag2.setAttribute("data-t",this.obj.team2.short.toLowerCase());
        this.view.date.innerText = this.obj.status == GameStatus.RUNNING ? Lang.get("date/past_min", {m: this.obj.getPlayedTime()}) : TippDate.toString(this.obj.start)
        this.view.tipps.innerText = this.obj.tipps.length != 1 ? Lang.get("section/game/tipps/multi",{n: this.obj.tipps.length}) : Lang.get("section/game/tipps/single")

        if(this.obj.status != GameStatus.UPCOMING){
            if(this.obj.phase == GamePhase.PENALTY){
                this.view.result.innerHTML = `<span style="font-weight: normal; font-size: 16px; vertical-align: top;">(${this.obj.team1.penalty})</span> ${this.obj.team1.score}:${this.obj.team2.score} <span style="font-weight: normal; font-size: 16px; vertical-align: top;">(${this.obj.team2.penalty})</span>`
            } else {
                this.view.result.innerText = `${this.obj.team1.score}:${this.obj.team2.score}`
            }
        } else {
            this.view.result.innerText = ""
        }

        if(this.obj.status == GameStatus.RUNNING || this.obj.status == GameStatus.PENDING){ 
            this.view.root.classList.add("live") 
        } else { 
            this.view.root.classList.remove("live")
        }

        if(this.obj.status != GameStatus.UPCOMING || !App.client.active || this.obj.hasOwnTipp()){
            this.view.root.classList.remove("nobet")
        } else {
            this.view.root.classList.add("nobet")
        }

        this.view.root.classList.remove("loading")

    }

}