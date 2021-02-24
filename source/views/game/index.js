import View from '../view'
import { GamePhase, GameStatus } from '../../models/games/enums'
import TippDate from '../../helper/date'
import TippTile from '../components/tipptile'
import Game from '../../models/games/game'

export default class GameIndex extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = `<div class="game-stream">
            <span class="live">live</span>
            <iframe frameborder="0" allow="picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="game-header">
            <h2 class="top">
                <span class="team1"><span class="tflag" data-t="sui" ></span> <span class="name">Schweiz</span></span>
                <span class="team2"><span class="name">Spanien</span> <span class="tflag" data-t="esp" ></span></span>
            </h2>
            <div class="score">
                <span class="normal">1:1</span>
                <span class="penalty">Penaltyschiessen<span>4:6</span></span>
            </div>
            <div class="meta"><span class="time">01.01. 20:00</span> | <span class="location">Letzigrund Zürich</span></div>
            <img class="flag1" src="/img/flag/sui.png"/>
            <img class="flag2" src="/img/flag/esp.png"/>
        </div>
        <div class="game-mytipp">
            <a class="tipp-tile fullwidth">
                <span class="tflag" data-t=""></span>
                <span class="name">${Lang.get("section/game/tipp/your")}</span>
                <span class="meta">${Lang.get("general/loading")}</span>
            </a>
        </div>
        <div class="game-tipps">
            <h3>Tipps</h3>
            <div class="tipp-list"></div>
        </div>`

        this.stream = {}
        this.stream.root = this.root.querySelector(".game-stream")
        this.stream.iframe = this.stream.root.querySelector("iframe")

        this.header = {}
        this.header.root = this.root.querySelector(".game-header")

        this.header.score = {}
        this.header.score.normal = this.header.root.querySelector(".score .normal")
        this.header.score._penalty = this.header.root.querySelector(".score .penalty")
        this.header.score.penalty = this.header.score._penalty.querySelector("span")

        this.header.team1 = {}
        this.header.team1.name = this.header.root.querySelector(".team1 .name")
        this.header.team1.flag = this.header.root.querySelector(".team1 .tflag")
        this.header.team1.bg = this.header.root.querySelector(".flag1")
        
        this.header.team2 = {}
        this.header.team2.name = this.header.root.querySelector(".team2 .name")
        this.header.team2.flag = this.header.root.querySelector(".team2 .tflag")
        this.header.team2.bg = this.header.root.querySelector(".flag2")

        this.header.meta = {}
        this.header.meta.time = this.header.root.querySelector(".meta .time")
        this.header.meta.location = this.header.root.querySelector(".meta .location")

        this.tipps = {}
        this.tipps.root = this.root.querySelector(".game-tipps")
        this.tipps.list = this.tipps.root.querySelector(".tipp-list")

        this.mytipp = {}
        this.mytipp.root = this.root.querySelector(".game-mytipp")
        this.mytipp.a = this.mytipp.root.querySelector("a")
        this.mytipp.title = this.mytipp.root.querySelector(".name")
        this.mytipp.meta = this.mytipp.root.querySelector(".meta")
        this.mytipp.flag = this.mytipp.root.querySelector(".tflag")

    }

    setGame(game){
        this.game = game;
        window.removeEventListener("datachange",this._func)
        this._func = function(e){
            if(e.detail.type == "game" && e.detail.id == this.game.id){ this.update() }
        }.bind(this)
        window.addEventListener("datachange",this._func);
        this.update();
    }

    addTipps(tipps){
        tipps.forEach(tipp => {
            var t = new TippTile(tipp);
            this.tipps.list.appendChild(t.getHtml())
        });
    }

    update(){
        this.header.team1.name.innerText = this.game.team1.name;
        this.header.team2.name.innerText = this.game.team2.name;

        this.header.team1.flag.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.header.team2.flag.setAttribute("data-t",this.game.team2.short.toLowerCase())

        this.header.team1.bg.src = '/img/flag/' + this.game.team1.short.toLowerCase() + '.png';
        this.header.team2.bg.src = '/img/flag/' + this.game.team2.short.toLowerCase() + '.png';

        this.header.score.normal.innerText = this.game.team1.score + ":" + this.game.team2.score;

        if(this.game.status == GameStatus.UPCOMING){
            this.tipps.root.classList.add("hidden");
        } else {
            this.tipps.root.classList.remove("hidden");
        }

        if((this.game.status == GameStatus.RUNNING || this.game.status == GameStatus.PENDING) && this.game.stream != ""){
            this.stream.root.classList.add("active");
            this.stream.iframe.src = this.game.stream;
        } else {
            this.stream.root.classList.remove("active");
            this.stream.iframe.src = "";
        }

        if(this.game.phase == GamePhase.PENALTY){
            this.header.score._penalty.classList.add("active");
            this.header.score.penalty.innerText = this.game.team1.penalty + ":" + this.game.team2.penalty;
        } else {
            this.header.score._penalty.classList.remove("active");
        }

        this.mytipp.a.setAttribute("href","/game/"+this.game.id+"/tipp/");

        if(this.game.hasOwnTipp()){
            this.mytipp.meta.innerText = Lang.get("general/loading")
            this.game.getOwnTipp().then(async tipp => {
                var winner = await tipp.getWinner();
                this.mytipp.flag.setAttribute("data-t",winner.name.toLowerCase());
                if(tipp.topscorer > 0){
                    var player = await tipp.getPlayer()
                    this.mytipp.meta.innerText = `${tipp.bet1} : ${tipp.bet2} / ${player.name}`
                } else {
                    this.mytipp.meta.innerText = `${tipp.bet1} : ${tipp.bet2} / `;
                }
            })
        } else {
            this.mytipp.flag.setAttribute("data-t","");
            if(this.game.status == GameStatus.UPCOMING){
                this.mytipp.meta.innerText = Lang.get("section/game/tipp/notyet")
            } else {
                this.mytipp.a.removeAttribute("href","");
                this.mytipp.root.classList.add("hidden");
            }
        }

        this.header.meta.time.innerText = TippDate.toString(this.game.start);
        this.header.meta.location.innerText = this.game.location;
    }

    clear(){
        this.tipps.list.innerHTML = "";
    }

}