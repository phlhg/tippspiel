import View from '../view'
import { GamePhase, GameStatus } from '../../models/games/enums'
import TippDate from '../../helper/date'
import TippTile from '../components/tipptile'
import Game from '../../models/games/game'
import TippPrompt from '../../helper/prompt'

export default class GameIndex extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = `
        <div class="game-stream">
            <iframe frameborder="0" allow="picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="game-header">
            <span class="live">live</span>
            <h2 class="top">
                <span class="team1"><span class="tflag" data-t="" ></span> <span class="name"></span></span>
                <span class="team2"><span class="name"></span> <span class="tflag" data-t="" ></span></span>
            </h2>
            <div class="score">
                <span class="normal">1:1</span>
                <span class="penalty">${Lang.get("section/game/penalty")}<span></span></span>
            </div>
            <div class="meta"><span class="time"></span> | <span class="location"></span></div>
            <img class="flag1" src="/img/flag/sui.png"/>
            <img class="flag2" src="/img/flag/esp.png"/>
        </div>
        <div class="game-timeline"></div>
        <div class="game-prompt-wrapper">
            <a class="tipp-box ended" href="" style="background-color: #d42700; ">
                <span class="icon"><span class="material-icons">stop</span></span>
                <span class="title">${Lang.get("section/game/prompt/ended/name")}</span>
                <span class="meta">${Lang.get("section/game/prompt/ended/desc")}</span>
            </a>
            <a class="tipp-box extension" style="background-color: #00b50c; display: none;">
                <span class="icon"><span class="material-icons">chevron_right</span></span>
                <span class="title">${Lang.get("section/game/prompt/continues/name")}</span>
                <span class="meta">${Lang.get("section/game/prompt/continues/extension")}</span>
            </a>
            <a class="tipp-box penalty" style="background-color: #00b50c; display: none;">
                <span class="icon"><span class="material-icons">last_page</span></span>
                <span class="title">${Lang.get("section/game/prompt/continues/name")}</span>
                <span class="meta">${Lang.get("section/game/prompt/continues/penalty")}</span>
            </a>
        </div>
        <div class="game-mytipp">
            <a class="tipp-tile fullwidth">
                <span class="tflag" data-t=""></span>
                <span class="name">${Lang.get("section/game/tipp/your")}</span>
                <span class="meta">${Lang.get("general/loading")}</span>
                <span class="reward"></span>
            </a>
        </div>
        <div class="game-tipps">
            <h3>${Lang.get("section/game/tipps/list")}</h3>
            <div class="game-tipp-stats">
                <span class="bar1"></span>
                <span class="bar2"></span>
                <span class="flag1"><span class="tflag" data-t="" ></span></span>
                <span class="avg">0:0</span>
                <span class="flag2"><span class="tflag" data-t="" ></span></span>
            </div>
            <div class="tipp-list"></div>
        </div>`

        this.stream = {}
        this.stream.root = this.root.querySelector(".game-stream")
        this.stream.iframe = this.stream.root.querySelector("iframe")

        this.header = {}
        this.header.root = this.root.querySelector(".game-header")
        this.header.live = this.header.root.querySelector(".live");

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

        this.timeline = {}
        this.timeline.root = this.root.querySelector(".game-timeline");

        this.prompt = {}
        this.prompt.wrapper = this.root.querySelector(".game-prompt-wrapper")
        this.prompt.ended = this.prompt.wrapper.querySelector(".ended")
        this.prompt.extension = this.prompt.wrapper.querySelector(".extension")
        this.prompt.penalty = this.prompt.wrapper.querySelector(".penalty")

        this.tipps = {}

        this.tipps.stats = {}
        this.tipps.stats.flag1 = this.root.querySelector(".game-tipp-stats .flag1 > .tflag")
        this.tipps.stats.flag2 = this.root.querySelector(".game-tipp-stats .flag2 > .tflag")
        this.tipps.stats.bar1 = this.root.querySelector(".game-tipp-stats .bar1")
        this.tipps.stats.bar2 = this.root.querySelector(".game-tipp-stats .bar2")
        this.tipps.stats.avg = this.root.querySelector(".game-tipp-stats .avg")

        this.tipps.root = this.root.querySelector(".game-tipps")
        this.tipps.list = this.tipps.root.querySelector(".tipp-list")

        this.mytipp = {}
        this.mytipp.root = this.root.querySelector(".game-mytipp")
        this.mytipp.a = this.mytipp.root.querySelector("a")
        this.mytipp.title = this.mytipp.root.querySelector(".name")
        this.mytipp.meta = this.mytipp.root.querySelector(".meta")
        this.mytipp.flag = this.mytipp.root.querySelector(".tflag")
        this.mytipp.reward = this.mytipp.root.querySelector(".reward")

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

    async update(){

        // Stream
        if((this.game.status == GameStatus.RUNNING || this.game.status == GameStatus.PENDING) && this.game.stream != ""){
            this.stream.root.classList.add("active");
            if(this.stream.iframe.src != this.game.stream){
                this.stream.iframe.src = this.game.stream;
            }
        } else {
            this.stream.root.classList.remove("active");
            this.stream.iframe.src = "";
        }

        // Header
        this.header.team1.name.innerText = this.game.team1.name;
        this.header.team2.name.innerText = this.game.team2.name;

        this.header.team1.flag.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.header.team2.flag.setAttribute("data-t",this.game.team2.short.toLowerCase())

        this.header.team1.bg.src = '/img/flag/' + this.game.team1.short.toLowerCase() + '.png';
        this.header.team2.bg.src = '/img/flag/' + this.game.team2.short.toLowerCase() + '.png';

        this.header.score.normal.innerText = this.game.team1.score + ":" + this.game.team2.score;

        this.header.meta.time.innerText = TippDate.toString(this.game.start);
        this.header.meta.location.innerText = this.game.location;

        if(this.game.phase == GamePhase.PENALTY){
            this.header.score._penalty.classList.add("active");
            this.header.score.penalty.innerText = this.game.team1.penalty + ":" + this.game.team2.penalty;
        } else {
            this.header.score._penalty.classList.remove("active");
        }

        if(this.game.status == GameStatus.RUNNING || this.game.status == GameStatus.PENDING){
            this.header.live.style.display = "inline-block";
        } else {
            this.header.live.style.display = "none";
        }

        // Timeline 
        
        this.timeline.root.innerHTML = "";

        if(this.game.status != GameStatus.UPCOMING && this.game.scorers.length > 0){
            Promise.all(this.game.getScorers()).then(data => {
                data.forEach(s => {
                    var e = document.createElement("span");
                    var t1 = (s.team == this.game.team1.id)
                    e.classList.add(t1 ? "left" : "right");
                    e.innerHTML = `<span class="tflag" data-t="${(t1 ? this.game.team1.short : this.game.team2.short).toLowerCase()}" ></span> ${s.name}`;
                    this.timeline.root.appendChild(e);
                })
            })
        }

        // Game End Prompt
        if(this.game.status == GameStatus.PENDING && App.client.permission.gameReport){
            if(this.game.phase == GamePhase.NORMAL){
                this.prompt.penalty.style.display = "none";
                this.prompt.extension.style.display = "block";
            } else if(this.game.phase == GamePhase.OVERTIME){
                this.prompt.penalty.style.display = "block";
                this.prompt.extension.style.display = "none";
            } else {
                this.prompt.penalty.style.display = "none";
                this.prompt.extension.style.display = "none";
            }
            this.prompt.wrapper.classList.remove("hidden");
            this.prompt.ended.setAttribute("href","/game/"+this.game.id+"/report/");
            this.prompt.extension.onclick = async () => {
                if(await TippPrompt.confirm(Lang.get("section/game/prompt/extension/text"),Lang.get("section/game/prompt/extension/confirm"),Lang.get("section/game/prompt/extension/deny"))){
                    await this.game.nextPhase()
                    this.update();
                }
            }
            this.prompt.penalty.onclick = this.prompt.extension.onclick;
        } else {
            this.prompt.wrapper.classList.add("hidden");
        }

        // My Tipp
        if(this.game.status == GameStatus.UPCOMING){
            this.mytipp.a.setAttribute("href","/game/"+this.game.id+"/tipp/");
        } else {
            this.mytipp.a.removeAttribute("href");
        }

        if(this.game.hasOwnTipp()){
            this.mytipp.meta.innerText = Lang.get("general/loading")
            this.game.getOwnTipp().then(async tipp => {
                var winner = await tipp.getWinner();
                this.mytipp.flag.setAttribute("data-t",winner.short.toLowerCase());
                if(tipp.topscorer > 0){
                    var player = await tipp.getPlayer()
                    this.mytipp.meta.innerText = `${tipp.bet1} : ${tipp.bet2} / ${player.name}`
                } else {
                    this.mytipp.meta.innerText = `${tipp.bet1} : ${tipp.bet2} / `;
                }
                this.mytipp.reward.innerText = tipp.reward > 0 ? '+'+tipp.reward : '';
            })
        } else {
            this.mytipp.reward.innerText = '';
            this.mytipp.flag.setAttribute("data-t","");
            this.mytipp.meta.innerText = this.game.status == GameStatus.UPCOMING ? Lang.get("section/game/tipp/notyet") : Lang.get("section/game/tipp/none")
        }

        // Tipps
        this.tipps.root.classList.add("hidden");
        this.tipps.list.innerHTML = "";

        this.tipps.stats.flag1.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.tipps.stats.flag2.setAttribute("data-t",this.game.team2.short.toLowerCase())

        if(this.game.status != GameStatus.UPCOMING){ 
            this.tipps.root.classList.remove("hidden");
            var tipps = await Promise.all(this.game.getTipps());

            var countTeam1 = 0;
            var countTeam2 = 0;
            var sumTeam1 = 0;
            var sumTeam2 = 0;
            var count = 0;

            tipps.forEach(tipp => {
                var t = new TippTile(new Promise(r => r(tipp)));
                this.tipps.list.appendChild(t.getHtml())

                countTeam1 += tipp.bet1 > tipp.bet2 ? 1 : 0;
                countTeam2 += tipp.bet1 < tipp.bet2 ? 1 : 0;
                sumTeam1 += tipp.bet1;
                sumTeam2 += tipp.bet2;
                count++;

            })

            if(count > 0){

                this.tipps.stats.bar1.style.width = ((countTeam1 / count)*100)+"%";
                this.tipps.stats.bar2.style.width = ((countTeam2 / count)*100)+"%";
                this.tipps.stats.avg.innerText = (Math.round((sumTeam1 / count)*10)/10) + " : " + (Math.round((sumTeam2 / count)*10)/10);

            } else {

                this.tipps.stats.bar1.style.width = "0%";
                this.tipps.stats.bar2.style.width = "0%";
                this.tipps.stats.avg.innerText = "0 : 0";

            }

        }
    }

    clear(){
        this.stream.iframe.src = "";
    }

}