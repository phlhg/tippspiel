import EventTippList from '../../components/eventtipplist';
import EventTippTile from '../../components/tiles/eventtipptile';
import Debugger from '../../debugger';
import Section from '../section'

export default class EventTipps extends Section {

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
        <h3>Tipps</h3>`

        this.view.header = {}
        this.view.header.name = this.view.root.querySelector(".event-header .title");
        this.view.header.meta = this.view.root.querySelector(".event-header .meta");

        this.tippList = new EventTippList();
        this.view.root.appendChild(this.tippList.getHTML())

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
        if(this.event.deadline >= Date.now()){  return App.router.forward(this.event.url); }

        await this.update()
    }

    async update(){

        // Header
        this.view.header.name.innerText = this.event.name;
        this.view.header.meta.innerText = (this.event.tipps.length == 1 ? Lang.get("section/event/tipp/single") : Lang.get("section/event/tipp/multi",{n: this.event.tipps.length}));

        this.tippList.loading()

        Promise.all(this.event.getTipps()).then(tipps => {
            return tipps.filter(t => t !== null);
        }).then(async tipps => {
            await Promise.all(App.model.users.getAll(tipps.map(t => t.user)))
            await Promise.all(App.model.players.getAll(tipps.map(t => t.topscorer).filter(t => t > 0)))
            await Promise.all(App.model.teams.getAll(tipps.map(t => t.winner).filter(t => t > 0)))
            return tipps;
        }).then(tipps => {
            return tipps.sort((a,b) => a.reward.sum - a.reward.sum);
        }).then(tipps => {
            this.tippList.insert(tipps);
        })

    }

    async unload(){
        this.tippList.clear();
    }

}
