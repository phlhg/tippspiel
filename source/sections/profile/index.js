import GameList from '../../helper/gamelist';
import Section from '../section';

export default class Profile extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.innerHTML = `<div class="tipp-profile-header">
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

        this.view.header = {};
        this.view.header.short = this.view.root.querySelector(".tipp-profile-header .short")
        this.view.header.name = this.view.root.querySelector(".tipp-profile-header .name")
        this.view.header.points = this.view.root.querySelector(".tipp-profile-header .points")

        this.gamelist = new GameList(); 
        this.view.root.querySelector(".tipp-game-list").appendChild(this.gamelist.getHTML());

        this.view.nobets = this.view.root.querySelector(".nobets");
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        
        // Header
        this.view.header.name.innerText = App.client.name;
        this.view.header.short.innerText = this.shortName(App.client.name);
        this.view.header.points.innerText = `+${App.client.points}`
        
        // Tipps
        var tipps = (await Promise.all(App.model.gameTipps.getAll(App.client.gameTipps))).filter(t => t !== null);
        var games = (await Promise.all(App.model.games.getAll(tipps.map(t => t.game)))).filter(t => t !== null);
        games.sort((a,b) => b.start - a.start);
        this.gamelist.insert(games);
        this.view.nobets.style.display = games.length > 0 ? "none" : "block";
    }

    shortName(name){
        var s = name.split(/\s/ig);
        if(s >= 2){ return s.map(s => s.charAt(0)).join("") + "."; }
        return name.replace(/\s/ig,'').slice(0,2).toUpperCase()+".";
    }

}