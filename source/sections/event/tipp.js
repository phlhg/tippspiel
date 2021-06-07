import Form from '../../components/form'
import SearchSelect from '../../components/searchselect'
import Section from '../section'

export default class EventTipp extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.loading = true;
        this.event = null;
        this.tipp = null;

        this.view.root.innerHTML = `
        <form class="tipp-form">
            <h4>${Lang.get("section/event/tipp/form/winner")}</h4>
            <div class="tipp-team"></div>
            <h4>${Lang.get("section/event/tipp/form/topscorer")}</h4>
            <div class="tipp-scorer-team"></div>
            <div class="tipp-scorer-player"></div>
            <input type="submit" value="${Lang.get("section/event/tipp/form/action")}"/>
        </form>
        <span class="meta" style="margin: 15px 15px 200px 15px;" ><a href="/player/create/">${Lang.get("section/createPlayer/missingInfo")}</a></span>
        `

        this.form = new Form(this.view.root.querySelector("form"))

        this.winnerTeam = new SearchSelect("winnerTeam",Lang.get("section/event/tipp/form/phWinner"));
        this.scorerTeam = new SearchSelect("scorerTeam",Lang.get("section/event/tipp/form/phTopscorer1"));
        this.scorerPlayer = new SearchSelect("scorerPlayer",Lang.get("section/event/tipp/form/phTopscorer2"));

        this.view.winnerTeam = this.view.root.querySelector(".tipp-team");
        this.view.scorerTeam = this.view.root.querySelector(".tipp-scorer-team");
        this.view.scorerPlayer = this.view.root.querySelector(".tipp-scorer-player");

        this.suggestions_team = [];
        this.suggestions_player = [];

        this.winnerTeam.getSuggestions = async (input) => {
            return this.suggestions_team.filter(t => {
                return (t.name.toLowerCase().includes(input.toLowerCase()) || t.short.toLowerCase().includes(input.toLowerCase()))
            }).map(t => {
                return {
                    text: t.name,
                    value: t.id,
                    img: `/img/flag/${t.short.toLowerCase()}.png`
                }
            })
        }

        this.scorerTeam.getSuggestions = this.winnerTeam.getSuggestions
        this.scorerTeam.onchange = async () => {
            this.scorerPlayer.reset();
            var id = parseInt(this.scorerTeam.getSelected()?.value)
            var team = await App.model.teams.get(id);
            if(team == null){ return; }
            this.suggestions_player = (await Promise.all(team.getPlayers())).filter(p => p != null)
        }

        this.scorerPlayer.getSuggestions = async (input) => {
            return await Promise.all(this.suggestions_player.filter(p => p.matchText(input)).sort((a,b) => {
                return -a.normalized.localeCompare(input.toLowerCase())
            }).map(async p => { 
                var t = await p.getTeam();
                return {
                    value: p.id,
                    text: p.name,
                    img: `/img/flag/${t.short.toLowerCase()}.png`
                }
            }));
        }


        this.view.winnerTeam.appendChild(this.winnerTeam.getHtml())
        this.view.scorerTeam.appendChild(this.scorerTeam.getHtml())
        this.view.scorerPlayer.appendChild(this.scorerPlayer.getHtml())

        // Form

        this.form.onSubmit = async (data) => {
            
            var winnerTeam = parseInt(data.winnerTeam)
            var scorerPlayer = Math.max(parseInt(data.scorerPlayer),0);

            if(winnerTeam < 0){ this.form.error(Lang.get("section/event/tipp/message/noWinner")); return }

            var r = await this.event.makeTipp({
                winner: winnerTeam,
                topscorer: scorerPlayer
            })

            if(!r.success){
                this.form.error(r.message);
            } else {
                App.router.forward(this.event.url)
            }

        }
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        this.event = await App.model.events.get(this._params.id);
        if(this.event === null){ return App.router.showError(); }
        if(this.event.deadline < Date.now()){  return App.router.forward(this.event.url); }

        this.tipp = this.event.hasOwnTipp() ? await this.event.getOwnTipp() : null;

        Promise.all(this.event.getTeams()).then(teams => { this.suggestions_team = teams; })

        await this.update()
    }

    async update(){

        if(this.tipp != null){

            this.tipp.getWinner().then(winner => {
                this.winnerTeam.reset()
                if(winner == null) return;
                this.winnerTeam._select({
                    value: winner.id,
                    img: `/img/flag/${winner.short.toLowerCase()}.png`,
                    text: winner.name
                })
            })

            this.tipp.getTopscorer().then(async topscorer => {
                this.scorerTeam.reset()
                this.scorerPlayer.reset()

                if(topscorer == null) return;

                var team = await topscorer.getTeam();
                if(team == null) return; 

                this.scorerTeam._select({
                    value: team.id,
                    img: `/img/flag/${team.short.toLowerCase()}.png`,
                    text: team.name
                })

                this.scorerPlayer._select({
                    value: topscorer.id,
                    img: `/img/flag/${team.short.toLowerCase()}.png`,
                    text: topscorer.name
                })
            })
        
        } else {

            this.winnerTeam.reset()
            this.scorerTeam.reset()
            this.scorerPlayer.reset()

        }

    }

    async unload(){
        this.winnerTeam.reset()
        this.scorerTeam.reset()
        this.scorerPlayer.reset()
        this.suggestions_team = [];
        this.suggestions_player = [];
    }

}