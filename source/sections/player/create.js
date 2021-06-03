import Form from '../../components/form'
import SearchSelect from '../../components/searchselect'
import SearchInput from '../../components/searchinput'
import Section from '../section'
import TippNotification from '../../helper/notification'
import TippPrompt from '../../helper/prompt'

export default class PlayerCreate extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.event = null;
        
        this.view.root.innerHTML = `
            <form class="tipp-form" style="margin-bottom: 200px">
                <h3>${Lang.get("section/createPlayer/title")}</h3>
                <p>${Lang.get("section/createPlayer/desc")}</p>
                <h4>${Lang.get("section/createPlayer/team/name")}</h4>
                <div class="tipp-team-select"></div>
                <h4>${Lang.get("section/createPlayer/name/name")}</h4>
                <div class="tipp-name-input"></div>
                <input type="submit" value="${Lang.get("section/createPlayer/action")}"/>
            </form>`

        this.form = new Form(this.view.root.querySelector("form"));
        this.team = new SearchSelect("team",Lang.get("section/createPlayer/team/placeholder"));
        this.name = new SearchInput("name",Lang.get("section/createPlayer/name/placeholder"), "");

        this.teams = [];
        this.players = [];

        this.team.getSuggestions = async (input) => {
            return this.teams.filter(t => {
                return (t.name.toLowerCase().includes(input.toLowerCase()) || t.short.toLowerCase().includes(input.toLowerCase()))
            }).map(t => {
                return {
                    text: t.name,
                    value: t.id,
                    img: `/img/flag/${t.short.toLowerCase()}.png`
                }
            })
        }

        this.team.onchange = async () => {

            var id = parseInt(this.team.getSelected()?.value)
            var team = await App.model.teams.get(id);
            if(team == null){ return; }

            this.name.img = `/img/flag/${team.short.toLowerCase()}.png`
            this.name.reset();

            Promise.all(team.getPlayers()).then(players => {
                return players.filter(p => p != null)
            }).then(players => {
                this.players = players;
            })

        }

        this.name.getSuggestions = async (input) => {
            return this.players.filter(p => p.matchText(input)).sort((a,b) => {
                return -a.normalized.localeCompare(input.toLowerCase())
            }).map(p => p.name);
        }

        this.view.root.querySelector(".tipp-team-select").appendChild(this.team.getHtml());
        this.view.root.querySelector(".tipp-name-input").appendChild(this.name.getHtml());

        this.form.onSubmit = async (data) => {

            if(parseInt(data.team) < 1) { this.form.error(Lang.get("section/createPlayer/messages/noTeam")); return; }
            if(data.name.replace(/ /ig,"") == ""){ this.form.error(Lang.get("section/createPlayer/messages/noName")); return; }

            if(this.players.filter(p => p.matchText(data.name)).length > 0){ this.form.error(Lang.get("section/createPlayer/messages/existing")); return; }

            if(!(await TippPrompt.danger(Lang.get("section/createPlayer/prompt/text"),Lang.get("section/createPlayer/prompt/confirm"),Lang.get("section/createPlayer/prompt/deny")))){
                return;
            }

            var r = await App.model.players.create(data.name, data.team);

            if(!r.success){
                this.form.error(r.message);
            } else {
                TippNotification.success(Lang.get("section/createPlayer/messages/success"));
                this.team.onchange();
                this.name.reset();
            }
        }
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        Promise.all(App.model.events.getAll([1,2])).then(events => {
            return events.filter(e => e != null);
        }).then(events => {
            var ids = [...new Set(events.map(e => e.teams).reduce((a,b) => a.concat(b), []))]
            return Promise.all(App.model.teams.getAll(ids)).then(teams => {
                this.teams = teams;
            })
        })
    }

    async unload(){
        this.team.reset()
        this.name.img = '';
        this.name.reset()
    }

}