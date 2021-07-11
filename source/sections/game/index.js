import Section from '../section'
import { GamePhase, GameStatus } from '../../models/games/enums'
import TippDate from '../../helper/date'
import TippTile from '../../components/tiles/tipptile'
import TippPrompt from '../../helper/prompt'
import Debugger from '../../debugger'
import TippList from '../../components/tipplist'

export default class GameIndex extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.innerHTML = `
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
        <a class="tipp-box reportGoal" href="/game/1/goal/" style="background-color: rgb(255,102,0); border-color: rgb(230,70,0); color: #fff;">
            <span class="icon"><span class="material-icons">add</span></span>
            <span class="title">${Lang.get("section/game/goal/tile/title")}</span>
            <span class="meta">${Lang.get("section/game/goal/tile/text")}</span>
        </a>
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
            <div class="tipp-list-wrapper"></div>
        </div>`

        this.view.stream = {}
        this.view.stream.root = this.view.root.querySelector(".game-stream")
        this.view.stream.iframe = this.view.stream.root.querySelector("iframe")

        this.view.header = {}
        this.view.header.root = this.view.root.querySelector(".game-header")
        this.view.header.live = this.view.header.root.querySelector(".live");

        this.view.header.score = {}
        this.view.header.score.normal = this.view.header.root.querySelector(".score .normal")
        this.view.header.score._penalty = this.view.header.root.querySelector(".score .penalty")
        this.view.header.score.penalty = this.view.header.score._penalty.querySelector("span")

        this.view.header.team1 = {}
        this.view.header.team1.name = this.view.header.root.querySelector(".team1 .name")
        this.view.header.team1.flag = this.view.header.root.querySelector(".team1 .tflag")
        this.view.header.team1.bg = this.view.header.root.querySelector(".flag1")
        
        this.view.header.team2 = {}
        this.view.header.team2.name = this.view.header.root.querySelector(".team2 .name")
        this.view.header.team2.flag = this.view.header.root.querySelector(".team2 .tflag")
        this.view.header.team2.bg = this.view.header.root.querySelector(".flag2")

        this.view.header.meta = {}
        this.view.header.meta.time = this.view.header.root.querySelector(".meta .time")
        this.view.header.meta.location = this.view.header.root.querySelector(".meta .location")

        this.view.timeline = {}
        this.view.timeline.root = this.view.root.querySelector(".game-timeline");

        this.view.prompt = {}
        this.view.prompt.wrapper = this.view.root.querySelector(".game-prompt-wrapper")
        this.view.prompt.ended = this.view.prompt.wrapper.querySelector(".ended")
        this.view.prompt.extension = this.view.prompt.wrapper.querySelector(".extension")
        this.view.prompt.penalty = this.view.prompt.wrapper.querySelector(".penalty")

        this.view.tipps = {}

        this.view.tipps.stats = {}
        this.view.tipps.stats.flag1 = this.view.root.querySelector(".game-tipp-stats .flag1 > .tflag")
        this.view.tipps.stats.flag2 = this.view.root.querySelector(".game-tipp-stats .flag2 > .tflag")
        this.view.tipps.stats.bar1 = this.view.root.querySelector(".game-tipp-stats .bar1")
        this.view.tipps.stats.bar2 = this.view.root.querySelector(".game-tipp-stats .bar2")
        this.view.tipps.stats.avg = this.view.root.querySelector(".game-tipp-stats .avg")

        this.view.tipps.root = this.view.root.querySelector(".game-tipps")
        this.view.tipps.list = new TippList()
        this.view.tipps.root.querySelector(".tipp-list-wrapper").appendChild(this.view.tipps.list.getHTML())

        this.view.mytipp = {}
        this.view.mytipp.root = this.view.root.querySelector(".game-mytipp")
        this.view.mytipp.tile = this.view.mytipp.root.querySelector(".tipp-tile")
        this.view.mytipp.a = this.view.mytipp.root.querySelector("a")
        this.view.mytipp.title = this.view.mytipp.root.querySelector(".name")
        this.view.mytipp.meta = this.view.mytipp.root.querySelector(".meta")
        this.view.mytipp.flag = this.view.mytipp.root.querySelector(".tflag")
        this.view.mytipp.reward = this.view.mytipp.root.querySelector(".reward")

        this.view.reportGoal = this.view.root.querySelector(".reportGoal");

        this.game = null;

        window.addEventListener("datachange",e => {
            if(this._active && this.game != null && e.detail.type == "game" && e.detail.id == this.game.id){
                Debugger.log(this,"Section was updated remotely")()
                this.update();
            }
        });

        window.addEventListener("metronom",() => {
            if(this._active && this.game != null){
                this.view.header.meta.time.innerText = this.game.status == GameStatus.RUNNING ? Lang.get("date/past_min", {m: this.game.getPlayedTime()}) : TippDate.toString(this.game.start);
            }
        })

    }

    async load(){
        if(!App.promptConnection()){ return false; }

        var g = await App.model.games.get(this._params.id);
        if(g === null){ return App.router.showError(); }

        this.game = g;
        await this.update();
    }

    async unload(){
        this.view.stream.iframe.src = "";
    }

    async update(){

        if(this.game == null){ return; }

        // Stream
        if((this.game.status == GameStatus.RUNNING || this.game.status == GameStatus.PENDING) && this.game.stream != ""){
            this.view.stream.root.classList.add("active");
            if(this.view.stream.iframe.src != this.game.stream){
                this.view.stream.iframe.src = this.game.stream;
            }
        } else {
            this.view.stream.root.classList.remove("active");
            this.view.stream.iframe.src = "";
        }

        // Header
        this.view.header.team1.name.innerText = this.game.team1.name;
        this.view.header.team2.name.innerText = this.game.team2.name;

        this.view.header.team1.flag.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.view.header.team2.flag.setAttribute("data-t",this.game.team2.short.toLowerCase())

        this.view.header.team1.bg.src = '/img/flag/' + this.game.team1.short.toLowerCase() + '.png';
        this.view.header.team2.bg.src = '/img/flag/' + this.game.team2.short.toLowerCase() + '.png';

        if(this.game.status == GameStatus.UPCOMING){
            this.view.header.score.normal.innerText = "- : -";
        } else {
            this.view.header.score.normal.innerText = this.game.team1.score + ":" + this.game.team2.score;
        }
        
        this.view.header.meta.time.innerText = this.game.status == GameStatus.RUNNING ? Lang.get("date/past_min", {m: this.game.getPlayedTime()}) : TippDate.toString(this.game.start);
        this.view.header.meta.location.innerText = this.game.location;

        if(this.game.phase == GamePhase.PENALTY){
            this.view.header.score._penalty.classList.add("active");
            this.view.header.score.penalty.innerText = this.game.team1.penalty + ":" + this.game.team2.penalty;
        } else {
            this.view.header.score._penalty.classList.remove("active");
        }

        if(this.game.status == GameStatus.RUNNING || this.game.status == GameStatus.PENDING){
            this.view.header.live.style.display = "inline-block";
        } else {
            this.view.header.live.style.display = "none";
        }

        // Timeline 
        
        this.view.timeline.root.innerHTML = "";

        if(this.game.status != GameStatus.UPCOMING && this.game.scorers.length > 0){
            Promise.all(this.game.getScorers()).then(data => {
                data.forEach(s => {
                    var e = document.createElement("span");
                    var t1 = (s.team == this.game.team1.id)
                    e.classList.add(t1 ? "left" : "right");
                    e.innerHTML = `<span class="tflag" data-t="${(t1 ? this.game.team1.short : this.game.team2.short).toLowerCase()}" ></span><span class="text"></span>`;
                    e.querySelector(".text").innerText = s.name;
                    this.view.timeline.root.appendChild(e);
                })
            })
        }

        // Goal Report
        this.view.reportGoal.setAttribute("href",`/game/${this.game.id}/goal/`)
        this.view.reportGoal.style.display = (App.client.permission.liveReport && (this.game.status == GameStatus.RUNNING || this.game.status == GameStatus.PENDING)) ? "block" : "none"

        // Game End Prompt
        if(this.game.status == GameStatus.PENDING && App.client.permission.liveReport){
            if(this.game.phase == GamePhase.NORMAL){
                this.view.prompt.penalty.style.display = "none";
                this.view.prompt.extension.style.display = "block";
            } else if(this.game.phase == GamePhase.OVERTIME){
                this.view.prompt.penalty.style.display = "block";
                this.view.prompt.extension.style.display = "none";
            } else {
                this.view.prompt.penalty.style.display = "none";
                this.view.prompt.extension.style.display = "none";
            }
            this.view.prompt.wrapper.classList.remove("hidden");
            this.view.prompt.ended.setAttribute("href","/game/"+this.game.id+"/report/");
            this.view.prompt.extension.onclick = async () => {
                if(await TippPrompt.confirm(Lang.get("section/game/prompt/extension/text"),Lang.get("section/game/prompt/extension/confirm"),Lang.get("section/game/prompt/extension/deny"))){
                    await this.game.nextPhase()
                    this.update();
                }
            }
            this.view.prompt.penalty.onclick = this.view.prompt.extension.onclick;
        } else {
            this.view.prompt.wrapper.classList.add("hidden");
        }

        // My Tipp
        if(this.game.status == GameStatus.UPCOMING){
            this.view.mytipp.a.setAttribute("href","/game/"+this.game.id+"/tipp/");
        } else {
            this.view.mytipp.a.removeAttribute("href");
        }

        this.view.mytipp.root.style.display = App.client.active || this.game.status == GameStatus.UPCOMING ? "block" : "none";

        this.view.mytipp.tile.classList.remove("nobet");

        if(this.game.hasOwnTipp()){

            var tipp = await this.game.getOwnTipp()

            if(this.game.status != GameStatus.UPCOMING){
                this.view.mytipp.a.setAttribute("href","/tipp/g/"+tipp.id+"/");
            }

            var winner = await tipp.getWinner()
            this.view.mytipp.flag.setAttribute("data-t",winner.short.toLowerCase());

            if(tipp.topscorer > 0){
                var player = await tipp.getPlayer()
                this.view.mytipp.meta.innerText = `${tipp.bet1} : ${tipp.bet2} / ${player.name}`
            } else {
                this.view.mytipp.meta.innerText = `${tipp.bet1} : ${tipp.bet2}`;
            }

            this.view.mytipp.reward.innerText = tipp.reward.sum > 0 ? '+'+tipp.reward.sum : '';

        } else {
            if(App.client.active && this.game.status == GameStatus.UPCOMING){ this.view.mytipp.tile.classList.add("nobet"); }
            this.view.mytipp.reward.innerText = '';
            this.view.mytipp.flag.setAttribute("data-t","");
            this.view.mytipp.meta.innerText = this.game.status == GameStatus.UPCOMING ? Lang.get("section/game/tipp/notyet") : Lang.get("section/game/tipp/none")
        }

        // Tipps
        this.view.tipps.root.classList.add("hidden");
        this.view.tipps.list.loading()

        this.view.tipps.stats.flag1.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.view.tipps.stats.flag2.setAttribute("data-t",this.game.team2.short.toLowerCase())

        if(this.game.status != GameStatus.UPCOMING){ 
            this.view.tipps.root.classList.remove("hidden");

            this.view.tipps.stats.bar1.style.width = "0%";
            this.view.tipps.stats.bar2.style.width = "0%";
            this.view.tipps.stats.avg.innerText = "";

            Promise.all(this.game.getTipps()).then(async tipps => {
                // Preload users and players for tipps
                await Promise.all(App.model.users.getAll(tipps.map(t => t.user)))
                await Promise.all(App.model.players.getAll(tipps.map(t => t.topscorer).filter(t => t > 0)))
                return tipps.sort((a,b) => b.reward.sum - a.reward.sum);
            }).then(tipps => {
                this.view.tipps.list.insert(tipps);

                if(tipps.length < 1) return;

                var countTeam1 = 0;
                var countTeam2 = 0;
                var sumTeam1 = 0;
                var sumTeam2 = 0;
                var count = 0;

                tipps.forEach(tipp => {
                    countTeam1 += tipp.bet1 > tipp.bet2 ? 1 : 0;
                    countTeam2 += tipp.bet1 < tipp.bet2 ? 1 : 0;
                    sumTeam1 += tipp.bet1;
                    sumTeam2 += tipp.bet2;
                    count++;
                })

                this.view.tipps.stats.bar1.style.width = "calc("+((countTeam1 / count)*100)+"% - 7px)";
                this.view.tipps.stats.bar2.style.width = "calc("+((countTeam2 / count)*100)+"% - 7px)";
                this.view.tipps.stats.avg.innerText = (Math.round((sumTeam1 / count)*10)/10) + " : " + (Math.round((sumTeam2 / count)*10)/10);

            })

        }
    }

}