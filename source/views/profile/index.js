import View from '../view'
import GameTile from '../components/gametile'

export default class Profile extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `<div class="tipp-profile-header">
            <span class="short"></span>
            <span class="name"></span>
            <span class="points"></span>
        </div>
        <a class="tipp-box createGame" href="/game/create/" target="_blank" style="display: none" >
            <span class="icon"><span class="material-icons">add_circle_outline</span></span>
            <span class="title">${Lang.get("section/profile/newgame/name")}</span>
            <span class="meta">${Lang.get("section/profile/newgame/desc")}</span>
        </a>
        <h4>${Lang.get("section/profile/tipps/heading")}</h4>
        <div class="tipp-game-list"></div>`;

        this.header = {};
        this.header.short = this.root.querySelector(".tipp-profile-header .short")
        this.header.name = this.root.querySelector(".tipp-profile-header .name")
        this.header.points = this.root.querySelector(".tipp-profile-header .points")

        this.createGame = this.root.querySelector(".createGame");

        this.gamelist = this.root.querySelector(".tipp-game-list");
    }

    setClient(client){
        this.header.name.innerText = client.name;
        this.header.short.innerText = client.name.split(/\s/ig).slice(0,2).map(s => s.charAt(0)).join("") + ".";
        this.header.points.innerText = `${client.points}+`
        this.createGame.style.display = client.permission.gameAnnounce ? "block" : "none";
    }

    setGames(list){
        list.forEach(data => {
            let g = new GameTile(data);
            this.gamelist.appendChild(g.getHtml())
        });
    }

    hide(){
        this.gamelist.innerHTML = "";
    }



}