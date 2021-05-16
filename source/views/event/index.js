import GameTile from '../components/gametile'
import View from '../view'

export default class EventIndexView extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = 
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
        <h3>${Lang.get("section/event/games/heading")}</h3>
        <a class="tipp-box createGame" href="/game/create/" target="_blank" style="display: none">
            <span class="icon"><span class="material-icons">add_circle_outline</span></span>
            <span class="title">${Lang.get("section/event/addgame/name")}</span>
            <span class="meta">${Lang.get("section/event/addgame/desc")}</span>
        </a>
        <div class="game-list"></div>`

        this.header = {}
        this.header.name = this.root.querySelector(".event-header .title");
        this.header.meta = this.root.querySelector(".event-header .meta");

        this.myTip = {}
        this.myTip.flag = this.root.querySelector(".myTipp .tflag");
        this.myTip.meta = this.root.querySelector(".myTipp .meta");
        this.myTip.reward = this.root.querySelector(".myTipp .reward");

        this.createGame = this.root.querySelector(".createGame");

        this.gameList = this.root.querySelector(".game-list");

    }

    setEvent(event){
        this.event = event;
        this.update();
    }

    show(){
        this.createGame.style.display = App.client.permission.gameAnnounce ? "block" : "none";
    }

    async update(){

        this.header.name.innerText = this.event.name;
        this.header.meta.innerText = this.event.tipps.length == 1 ? Lang.get("section/event/tipp/single") : Lang.get("section/event/tipp/multi",{n: this.event.tipps.length})

        var deadline = Lang.get("date/general",{
            day: ("0"+this.event.deadline.getDate()).slice(-2),
            month: ("0"+(this.event.deadline.getMonth() + 1)).slice(-2),
            year: this.event.deadline.getFullYear(),
            h: ("0"+this.event.deadline.getHours()).slice(-2),
            m: ("0"+this.event.deadline.getMinutes()).slice(-2)
        });
        this.myTip.meta.innerText = Lang.get("section/event/tipp/deadline",{d: deadline})

        this.gameList.innerHTML = "";
        var games = await Promise.all(this.event.getGames());
        games.sort((a,b) => a.start - b.start);
        games.forEach(p => {
            var g = new GameTile(new Promise((resolve) => { resolve(p) }))
            this.gameList.appendChild(g.getHtml())
        })

    }

    clear(){
        
    }

}