import Debugger from '../../debugger';
import GameList from '../../components/gamelist';
import Section from '../section';

export default class Profile extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.innerHTML = `<div class="tipp-profile-header">
            <span class="short"></span>
            <span class="name"></span>
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

        this.gamelist = new GameList(); 
        this.view.root.querySelector(".tipp-game-list").appendChild(this.gamelist.getHTML());

        this.view.nobets = this.view.root.querySelector(".nobets");

        window.addEventListener("datachange",e => {
            if(this._active && e.detail.type == "user" && e.detail.id == App.client.id){
                Debugger.log(this,"Section was updated remotely")()
                this.update();
            }
        });
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        
        await this.update();
    }

    async update(){
        // Header
        this.view.header.name.innerText = App.client.name;
        this.view.header.short.innerText = this.shortName(App.client.name);
        
        // Tipps
        this.gamelist.loading();
        this.view.nobets.style.display = App.client.gameTipps.length > 0 ? "none" : "block";
        Promise.all(App.model.gameTipps.getAll(App.client.gameTipps)).then(tipps => {
            return tipps.filter(t => t !== null).map(t => t.game)
        }).then(games => {
            return Promise.all(App.model.games.getAll(games)).then(games => {
                return games.filter(t => t !== null)
            })
        }).then(games => {
            return games.sort((a,b) => b.start - a.start)
        }).then(games => {
            this.gamelist.insert(games);
        })
    }

    shortName(name){
        var s = name.split(/\s/ig);
        if(s.length >= 2 && s.length <= 10){ return s.map(s => s.charAt(0)).join("") + "."; }
        return name.replace(/\s/ig,'').slice(0,2).toUpperCase()+".";
    }

}