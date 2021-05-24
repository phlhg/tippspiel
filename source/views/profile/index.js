import View from '../view'
import GameTile from '../components/gametile'
import GameList from '../../helper/gamelist';

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
        <h3>${Lang.get("section/profile/tipps/heading")}</h3>
        <span class="tipp-game-list"></span>
        <a href="/" class="tipp-box nobets" style="display: none; border-color: #0061d4; background: #0066de; color: #fff;">
            <span class="icon"><span class="material-icons">info</span></span>
            <span class="title">${Lang.get("section/profile/nobets/title")}</span>
            <span class="meta">${Lang.get("section/profile/nobets/meta")}</span>
        </a>`;

        this.header = {};
        this.header.short = this.root.querySelector(".tipp-profile-header .short")
        this.header.name = this.root.querySelector(".tipp-profile-header .name")
        this.header.points = this.root.querySelector(".tipp-profile-header .points")

        this.gamelist = new GameList(); 
        this.root.querySelector(".tipp-game-list").appendChild(this.gamelist.getHTML());

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
        games.sort((a,b) => b.start - a.start);
        this.gamelist.insert(games);
        this.nobets.style.display = games.length > 0 ? "none" : "block";
    }

    hide(){
        this.gamelist.clear()
    }



}