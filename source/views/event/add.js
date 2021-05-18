import View from '../view'
import Form from '../helpers/form'
import SearchSelect from '../helpers/searchselect'
import SearchInput from '../helpers/searchinput'
import DateInput from '../helpers/dateinput'
import EventTile from '../components/eventtile'

export default class EventGameAddView extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = `
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

        this.form = new Form(this.root.querySelector("form"));
        this.team1 = new SearchSelect("team1",Lang.get("section/game/create/team1/placeholder"));
        this.team2 = new SearchSelect("team2",Lang.get("section/game/create/team2/placeholder"));
        this.location = new SearchInput("location",Lang.get("section/game/create/location/placeholder"), "/img/graphics/location.png");
        this.kickoff = new DateInput();

        this.header = this.root.querySelector(".event-tile")

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

        this.root.querySelector(".tipp-team1-select").appendChild(this.team1.getHtml());
        this.root.querySelector(".tipp-team2-select").appendChild(this.team2.getHtml());
        this.root.querySelector(".tipp-kickoff-select").appendChild(this.kickoff.getHtml())
        this.root.querySelector(".tipp-location-select").appendChild(this.location.getHtml());

        this.form.onSubmit = (data) => {
            if(parseInt(data.team1) < 1 || parseInt(data.team2) < 1) { this.form.error(Lang.get("section/game/create/errors/missingteam")); return; }
            if(!this.kickoff.isValid()){ this.form.error(Lang.get("section/game/create/errors/invaliddate")); return; }
            if(data.location.replace(/ /ig,"") == ""){ this.form.error(Lang.get("section/game/create/errors/missinglocation")); return; }
            data["date"] = this.kickoff.getDate();
            this.event("submit",data);
        }
    
    }

    async show(){
        this.locations = (await App.model.games.getSuggestedLocations()).map(l => { return {
            name: l, 
            normalized: Lang.normalize(l)
        }});
    }

    async setEvent(e){
        this.header.setAttribute("href",e.url);
        this.header.querySelector(".name").innerText = e.name;
        this.teams = await Promise.all(e.getTeams());
    }

    clear(){
        this.team1.reset()
        this.team2.reset()
        this.location.reset()
    }

}