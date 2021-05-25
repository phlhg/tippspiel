import GameTile from '../components/gametile'
import EventTile from '../components/eventtile';
import Section from './section';

export default class Home extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.innerHTML = 
        `<div class="tipp_home_event" style="margin-bottom: 20px;"></div>
        <div class="tipp_home_upcoming"></div>
        <h3 class="over_heading" style="display: none;">${Lang.get("section/home/pastgames")}</h3>
        <div class="tipp_home_over"></div>`

        this.view.eventList = this.view.root.querySelector(".tipp_home_event");
        this.view.upcomingList = this.view.root.querySelector(".tipp_home_upcoming");
        this.view.finishedList = this.view.root.querySelector(".tipp_home_over");
        this.view.finishedHeading = this.view.root.querySelector(".over_heading");

        App.socket.listen("HotGames", async ()=>{ 
            if(this._active){
                await this.loadHotGames() 
            }
        })

    }

    async load(){
        if(!App.promptConnection()){ return false; }
        
        // Events
        this.view.eventList.innerHTML = '';
        App.model.events.getAll([1,2]).forEach(e => {
            this.view.eventList.appendChild(new EventTile(e).getHtml())
        })

        // Games
        await this.loadHotGames()
    }

    async loadHotGames(){

        this.view.upcomingList.innerHTML = '';
        this.view.finishedList.innerHTML = '';

        var hotGames = await App.model.games.getHot();

        this.view.upcomingList.innerHTML = '';
        this.view.finishedList.innerHTML = '';

        hotGames.upcoming.forEach(game => { 
            this.view.upcomingList.appendChild(new GameTile(game).getHtml())
        })

        this.view.finishedHeading.style.display = hotGames.over.length > 0 ? "block" : "none";

        hotGames.over.forEach(game => { 
            this.view.finishedList.appendChild(new GameTile(game).getHtml())
        })

    }

}