import View from './view'
import GameModel from '../models/games/game'

export default class Game extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = `<div class="tipp-game-header">
            <div class="top">
                <span class="team1"><span class="tflag" data-t="sui" ></span> <span class="name">Schweiz</span></span>
                <span class="team2"><span class="name">Spanien</span> <span class="tflag" data-t="esp" ></span></span>
            </div>
            <div class="score">
                <span class="normal">1:1</span>
                <span class="penalty">Penaltyschiessen<span>4:6</span></span>
            </div>
            <div class="meta"><span class="time">01.01. 20:00</span> | <span class="location">Letzigrund Zürich</span></div>
            <img class="flag1" src="/img/flag/sui.png"/>   
            <img class="flag2" src="/img/flag/esp.png"/>  
        </div>`

        this.team1 = {}
        this.team2 = {}

        this.team1.name = this.root.querySelector(".team1 .name")
        this.team2.name = this.root.querySelector(".team2 .name")

        this.team1.flag = this.root.querySelector(".team1 .tflag")
        this.team2.flag = this.root.querySelector(".team2 .tflag")

        this.team1.bg = this.root.querySelector(".flag1")
        this.team2.bg = this.root.querySelector(".flag2")

        this.score = {}
        this.score.normal = this.root.querySelector(".score .normal")
        this.score.penalty = this.root.querySelector(".score .penalty")

        this.meta = {}
        this.meta.time = this.root.querySelector(".meta .time")
        this.meta.location = this.root.querySelector(".meta .location")
    }

    setGame(game){
        this.game = game;
        window.removeEventListener("datachange",this._func)
        this._func = function(e){
            console.log("LOL");
            if(e.detail.type == "game" && e.detail.id == this.game.id)
                this.update()
        }.bind(this)
        window.addEventListener("datachange",this._func);
        this.update();
    }

    update(){
        this.team1.name.innerText = this.game.team1.name;
        this.team2.name.innerText = this.game.team2.name;

        this.team1.flag.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.team2.flag.setAttribute("data-t",this.game.team2.short.toLowerCase())

        this.team1.bg.src = '/img/flag/' + this.game.team1.short.toLowerCase() + '.png';
        this.team2.bg.src = '/img/flag/' + this.game.team2.short.toLowerCase() + '.png';

        this.score.normal.innerText = this.game.team1.points + ":" + this.game.team2.points;

        if(this.game.phase == GameModel.PHASE.PENALTY){
            this.score.penalty.classList.add("active");
            this.score.penalty.innerText = this.game.team1.points + ":" + this.game.team2.points;
        } else {
            this.score.penalty.classList.remove("active");
        }

        this.meta.time.innerText = `${("0"+this.game.start.getDate()).slice(-2)}.${("0"+(this.game.start.getMonth()+1)).slice(-2)} ${("0"+this.game.start.getHours()).slice(-2)}:${("0"+this.game.start.getMinutes()).slice(-2)}`;
        this.meta.location.innerText = this.game.location;
    }

    clear(){

    }

}