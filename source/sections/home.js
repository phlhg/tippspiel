import GameTile from '../components/tiles/gametile'
import EventTile from '../components/tiles/eventtile';
import Section from './section';
import Debugger from '../debugger';

export default class Home extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.innerHTML = `
        <a class="tipp-box eventTipp" style="display: none; border-color: #0061d4; background: #0066de; color: #fff;" href="/event/1/tipp/">
            <span class="icon"><span class="material-icons">lightbulb</span></span>
            <span class="title">${Lang.id == "de" || Lang.id == "de-ch" ? "Gewinner und Torschützenkönig" : "Champion and Topscorer"}</span>
            <span class="meta">${Lang.id == "de" || Lang.id == "de-ch" ? "Gib noch bis Sonntag 13.06. 23:59 deinen Tipp für den Gewinner und Torschützenkönig der EURO ab." : "Make your bet on the Champion and Topscorer of the EURO until Sunday 13.06. 23:59"}</span>
        </a>
        <div class="tipp_home_event" style="margin-bottom: 20px;"></div>
        <div class="tipp_home_upcoming"></div>
        <h3 class="over_heading" style="display: none;">${Lang.get("section/home/pastgames")}</h3>
        <div class="tipp_home_over"></div>`

        this.view.eventList = this.view.root.querySelector(".tipp_home_event");
        this.view.upcomingList = this.view.root.querySelector(".tipp_home_upcoming");
        this.view.finishedList = this.view.root.querySelector(".tipp_home_over");
        this.view.finishedHeading = this.view.root.querySelector(".over_heading");

        this.view.eventTipp = this.view.root.querySelector(".eventTipp")

        App.socket.listen("HotGames", async ()=>{ 
            if(this._active){
                Debugger.log(this,"Section was updated remotely")()
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

        this.view.eventTipp.style.display = "none";
        App.model.events.get(1).then(event => {
            if(App.client.active && !event.hasOwnTipp() && event.deadline.getTime() > Date.now()){
                this.view.eventTipp.style.display = "block";
            }
        })


        // Games
        await this.loadHotGames()
    }

    async loadHotGames(){

        var hotGames = await App.model.games.getHot();

        this.view.upcomingList.innerHTML = '';
        this.view.finishedList.innerHTML = '';

        hotGames.upcoming.forEach(game => { 
            this.view.upcomingList.appendChild(new GameTile(game).getHtml())
        })

        this.view.finishedHeading.style.display = hotGames.over.length > 0 ? "block" : "none";

        hotGames.over.reverse();
        hotGames.over.forEach(game => { 
            this.view.finishedList.appendChild(new GameTile(game).getHtml())
        })

    }

}