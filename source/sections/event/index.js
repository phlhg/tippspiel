import GameList from '../../components/gamelist'
import Debugger from '../../debugger';
import { EventStatus } from '../../models/events/enum';
import Section from '../section'

export default class EventIndex extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.event = null;

        this.view.root.innerHTML = 
        `<div class="tipp-box event-header">
            <span class="icon"><span class="material-icons">emoji_events</span></span>
            <span class="title">Event-Name</span>
            <span class="meta">0 Tipps</span>
        </div>
        <a class="tipp-tile fullwidth myTipp">
            <span class="tflag" data-t=""></span>
            <span class="name">${Lang.get("section/event/tipp/your")}</span>
            <span class="meta">${Lang.get("general/loading")}</span>
            <span class="reward"></span>
        </a>
        <a class="tipp-box allTipps" href="/">
            <span class="icon"><span class="material-icons">subject</span></span>
            <span class="title">${Lang.get("section/event/tipps/name")}</span>
            <span class="meta">${Lang.get("section/event/tipps/desc")}</span>
        </a>
        <h3>${Lang.get("section/event/games/heading")}</h3>
        <a class="tipp-box createGame" href="" style="display: none">
            <span class="icon"><span class="material-icons">add_circle_outline</span></span>
            <span class="title">${Lang.get("section/event/addgame/name")}</span>
            <span class="meta">${Lang.get("section/event/addgame/desc")}</span>
        </a>`

        this.view.header = {}
        this.view.header.name = this.view.root.querySelector(".event-header .title");
        this.view.header.meta = this.view.root.querySelector(".event-header .meta");

        this.view.myTip = {}
        this.view.myTip.root = this.view.root.querySelector(".myTipp")
        this.view.myTip.flag = this.view.myTip.root.querySelector(".tflag");
        this.view.myTip.meta = this.view.myTip.root.querySelector(".meta");
        this.view.myTip.reward = this.view.myTip.root.querySelector(".reward");

        this.view.allTipps = this.view.root.querySelector(".allTipps")

        this.view.createGame = this.view.root.querySelector(".createGame");

        this.gameList = new GameList();
        this.view.root.appendChild(this.gameList.getHTML());

        window.addEventListener("datachange",e => {
            if(this._active && this.event != null && e.detail.type == "event" && e.detail.id == this.event.id){
                Debugger.log(this,"Section was updated remotely")()
                this.update();
            }
        });

    }

    async load(){

        if(!App.promptConnection()){ return false; }

        this.event = await App.model.events.get(this._params.id);
        if(this.event === null){ return App.router.showError(); }

        await this.update()

    }

    async update(){

        // Header
        this.view.header.name.innerText = this.event.name;
        this.view.header.meta.innerText = this.event.deadline.getTime() != 0 ? (this.event.tipps.length == 1 ? Lang.get("section/event/tipp/single") : Lang.get("section/event/tipp/multi",{n: this.event.tipps.length})) : Lang.get("section/event/tile/desc");

        // Add Game
        this.view.createGame.style.display = App.client.permission.gameAnnounce ? "block" : "none";
        this.view.createGame.setAttribute("href","/event/"+this.event.id+"/add/");

        // My Tipp
        var deadline = Lang.get("date/general",{
            day: ("0"+this.event.deadline.getDate()).slice(-2),
            month: ("0"+(this.event.deadline.getMonth() + 1)).slice(-2),
            year: this.event.deadline.getFullYear(),
            h: ("0"+this.event.deadline.getHours()).slice(-2),
            m: ("0"+this.event.deadline.getMinutes()).slice(-2)
        });

        if(this.event.deadline.getTime() != 0){
            // Tipps are enabled
            this.view.myTip.root.style.display = "block"
            this.view.myTip.flag.setAttribute("data-t","");

            if(this.event.hasOwnTipp()){
                this.view.myTip.meta.innerText = Lang.get("general/loading") + " " + Lang.get("section/event/tipp/deadline",{d: deadline})
                this.event.getOwnTipp().then(async tipp => {
                    var winner = await tipp.getWinner();
                    var player = await tipp.getTopscorer();
                    this.view.myTip.flag.setAttribute("data-t",winner.short.toLowerCase());
                    this.view.myTip.reward.innerText = tipp.reward.sum > 0 ? "+"+tipp.reward.sum : ""

                    if(this.event.deadline.getTime() >= Date.now()){
                        this.view.myTip.meta.innerText = winner.name + " & " + player.name + " " + Lang.get("section/event/tipp/deadline",{d: deadline});
                    } else {
                        this.view.myTip.meta.innerText = winner.name + " & " + player.name
                    }
                })
            } else {
                if(this.event.deadline.getTime() >= Date.now()){
                    this.view.myTip.meta.innerText = Lang.get("section/event/tipp/mytip/notyet") + " " + Lang.get("section/event/tipp/deadline",{d: deadline})
                } else {
                    this.view.myTip.meta.innerText = Lang.get("section/event/tipp/mytip/nobet")
                }
            }

            if(this.event.deadline.getTime() >= Date.now()){
                this.view.allTipps.style.display = "none"
                this.view.myTip.root.setAttribute("href",`/event/${this.event.id}/tipp/`)
            } else {
                this.view.allTipps.style.display = "block"
                this.view.myTip.root.setAttribute("href",`/tipp/e/${this.event.id}/`)
            }

            this.view.allTipps.setAttribute("href",`/event/${this.event.id}/tipps/`)

        } else {
            // Tipps are disabled
            this.view.myTip.root.style.display = "none"
            this.view.allTipps.style.display = "none"
        }

        // GameList
        var games = (await Promise.all(this.event.getGames())).filter(g => g !== null);
        games.sort((a,b) => a.start - b.start);
        this.gameList.insert(games);
    }

}