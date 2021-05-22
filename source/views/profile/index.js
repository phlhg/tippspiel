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
        <h4>${Lang.get("section/profile/tipps/heading")}</h4>
        <div class="tipp-game-list"></div>
        <a href="/" class="tipp-box nobets" style="display: none; border-color: #0061d4; background: #0066de; color: #fff;">
            <span class="icon"><span class="material-icons">info</span></span>
            <span class="title">${Lang.get("section/profile/nobets/title")}</span>
            <span class="meta">${Lang.get("section/profile/nobets/meta")}</span>
        </a>`;

        this.header = {};
        this.header.short = this.root.querySelector(".tipp-profile-header .short")
        this.header.name = this.root.querySelector(".tipp-profile-header .name")
        this.header.points = this.root.querySelector(".tipp-profile-header .points")

        this.gamelist = this.root.querySelector(".tipp-game-list");

        this.nobets = this.root.querySelector(".nobets");
    }

    setClient(client){
        this.header.name.innerText = client.name;
        this.header.short.innerText = this.shortName(client.name);
        this.header.points.innerText = `+${client.points}`
    }

    shortName(name){
        var s = name.split(/\s/ig);
        if(s >= 2){ return s.map(s => s.charAt(0)).join("") + "."; }
        return name.replace(/\s/ig,'').slice(0,2).toUpperCase()+".";
    }

    async setGames(list){
        var games = (await Promise.all(list)).filter(g => g !== null)
        games.sort((a,b) => a.start - b.start);
        games.forEach(data => {
            let g = new GameTile(new Promise(r => { r(data) }));
            this.gamelist.appendChild(g.getHtml())
        });
        this.nobets.style.display = list.length > 0 ? "none" : "block";
    }

    hide(){
        this.gamelist.innerHTML = "";
    }



}