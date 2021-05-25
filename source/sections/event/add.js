import Form from '../../helper/form'
import SearchSelect from '../../helper/searchselect'
import SearchInput from '../../helper/searchinput'
import DateInput from '../../helper/dateinput'
import Section from '../section'

export default class EventGameAddView extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.event = null;

        this.view.root.innerHTML = `
            <a class="event-tile">
                <span class="icon"><span class="material-icons">emoji_events</span></span>
                <span class="name"></span>
                <span class="meta">${Lang.get("section/event/addgame/name")}</span>
            </a>
            <form class="tipp-form" style="margin-bottom: 200px">
                <h4>${Lang.get("section/game/create/team1/name")}</h4>
                <div class="tipp-team1-select"></div>
                <h4>${Lang.get("section/game/create/team2/name")}</h4>
                <div class="tipp-team2-select"></div>
                <h4>${Lang.get("section/game/create/kickoff")}</h4>
                <div class="tipp-kickoff-select"></div>
                <h4>${Lang.get("section/game/create/location/name")}</h4>
                <div class="tipp-location-select"></div>
                <input type="submit" value="${Lang.get("section/game/create/submit")}" style="margin: 10px 0 0 15px;"/>
            </form>`

        this.form = new Form(this.view.root.querySelector("form"));
        this.team1 = new SearchSelect("team1",Lang.get("section/game/create/team1/placeholder"));
        this.team2 = new SearchSelect("team2",Lang.get("section/game/create/team2/placeholder"));
        this.location = new SearchInput("location",Lang.get("section/game/create/location/placeholder"), "/img/graphics/location.png");
        this.kickoff = new DateInput();

        this.view.header = this.view.root.querySelector(".event-tile")

        this.teams = [];
        this.locations = [];

        this.team1.getSuggestions = async (input) => {
            return this.teams.filter(t => {
                return this.team2.getSelected().value != t.id && (t.name.toLowerCase().includes(input.toLowerCase()) || t.short.toLowerCase().includes(input.toLowerCase()))
            }).map(t => {
                return {
                    text: t.name,
                    value: t.id,
                    img: `/img/flag/${t.short.toLowerCase()}.png`
                }
            })
        }

        this.team2.getSuggestions = async (input) => {
            return this.teams.filter(t => {
                return this.team1.getSelected().value != t.id && (t.name.toLowerCase().includes(input.toLowerCase()) || t.short.toLowerCase().includes(input.toLowerCase()))
            }).map(t => {
                return {
                    text: t.name,
                    value: t.id,
                    img: `/img/flag/${t.short.toLowerCase()}.png`
                }
            })
        }

        this.location.getSuggestions = async (input) => {
            return this.locations.filter(l => {
                return l.normalized.indexOf(input.toLowerCase()) > -1
            }).sort((a,b) => {
                return -a.normalized.localeCompare(input.toLowerCase())
            }).map(l => l.name);
        }

        this.view.root.querySelector(".tipp-team1-select").appendChild(this.team1.getHtml());
        this.view.root.querySelector(".tipp-team2-select").appendChild(this.team2.getHtml());
        this.view.root.querySelector(".tipp-kickoff-select").appendChild(this.kickoff.getHtml())
        this.view.root.querySelector(".tipp-location-select").appendChild(this.location.getHtml());

        this.form.onSubmit = async (data) => {
            if(parseInt(data.team1) < 1 || parseInt(data.team2) < 1) { this.form.error(Lang.get("section/game/create/errors/missingteam")); return; }
            if(!this.kickoff.isValid()){ this.form.error(Lang.get("section/game/create/errors/invaliddate")); return; }
            if(data.location.replace(/ /ig,"") == ""){ this.form.error(Lang.get("section/game/create/errors/missinglocation")); return; }
            data["date"] = this.kickoff.getDate();

            var r = await this.event.addGame(data.team1, data.team2, data.date.getTime()/1000, data.location)
            if(!r.success){
                this.form.error(r.message);
            } else {
                var game = await App.model.games.get(r.data);
                App.router.forward(game.url);
            }
        }
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        if(!App.client.permission.gameAnnounce){  return App.router.forward(`/`); }

        this.event = await App.model.events.get(this._params.id);
        if(this.event === null){ return App.router.showError(); }

        this.view.header.setAttribute("href",this.event.url);
        this.view.header.querySelector(".name").innerText = this.event.name;
        this.teams = await Promise.all(this.event.getTeams());

        this.locations = (await App.model.games.getSuggestedLocations()).map(l => { return {
            name: l, 
            normalized: Lang.normalize(l)
        }});
    }

    async unload(){
        this.team1.reset()
        this.team2.reset()
        this.location.reset()
    }

}