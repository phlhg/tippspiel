import Form from '../../components/form'
import SearchSelect from '../../components/searchselect'
import TippPrompt from '../../helper/prompt';
import { GamePhase, GameStatus } from '../../models/games/enums';
import Section from '../section'

export default class GameTipp extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.game = null;

        this.view.root.innerHTML = `
        <form class="tipp-form">
            <h4>${Lang.get("section/game/goal/current")}</h4>
            <div class="game-timeline" style="display: block"></div>
            <h4>${Lang.get("section/game/goal/team")}</h4>
            <div class="tipp-winner">
                <div class="tipp-radio-select">
                    <input type="radio" id="tippgoalteam1" name="winner" required value=""/>
                    <label for="tippgoalteam1"></label>
                    <input type="radio" id="tippgoalteam2" name="winner" value=""/>
                    <label for="tippgoalteam2"></label>
                </div>
            </div>
            <h4>${Lang.get("section/game/goal/player")}</h4>
            <div class="tipp-player"></div>
            <input type="submit" value="${Lang.get("section/game/goal/action")}"/>
        </form>
        <span class="meta" style="margin: 15px 15px 200px 15px;" >
            ${Lang.get("section/game/goal/ownGoalNotice")}<br/>
            <br/>
            <a href="/player/create/">${Lang.get("section/createPlayer/missingInfo")}</a>
        </span>`

        this.form = new Form(this.view.root.querySelector("form"));

        this.view.timeline = {}
        this.view.timeline.root = this.view.root.querySelector(".game-timeline");

        this.view.winner = {}
        this.view.winner.team1 = this.view.root.querySelector("form .tipp-winner #tippgoalteam1")
        this.view.winner.label1 = this.view.root.querySelector("form .tipp-winner label[for='tippgoalteam1']")
        this.view.winner.team2 = this.view.root.querySelector("form .tipp-winner #tippgoalteam2")
        this.view.winner.label2 = this.view.root.querySelector("form .tipp-winner label[for='tippgoalteam2']")

        this.view.player = this.view.root.querySelector(".tipp-player");
        this.player_suggestions = [];

        // Player Select

        this.searchselect = new SearchSelect("player",Lang.get("section/game/tipp/form/search"));
        this.searchselect.getSuggestions = async (input) => {
            return await Promise.all(this.player_suggestions.filter(p => p.matchText(input)).sort((a,b) => {
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

        this.view.player.appendChild(this.searchselect.getHtml())

        // Form

        this.form.onSubmit = async (data) => {

            var p = Math.max(parseInt(this.searchselect.getSelected().value),0);
            var t = this.view.winner.team1.checked ? this.game.team1.id : (this.view.winner.team2.checked ? this.game.team2.id : 0);

            var penalty = this.game.phase == GamePhase.PENALTY;

            if(p < 1){
                this.form.error(Lang.get("section/game/goal/noPlayer"))
                return;
            }

            if(t == 0){
                this.form.error(Lang.get("section/game/goal/noTeam"))
                return;
            }

            if(!(await TippPrompt.make(
                Lang.get("section/game/goal/prompt/text"),
                Lang.get("section/game/goal/prompt/confirm"),
                Lang.get("section/game/goal/prompt/deny")
            ))){ return; }

            var r = await this.game.reportGoal({
                player: p,
                team: t,
                penalty: penalty
            })

            if(!r.success){
                this.form.error(r.message);
            } else {
                App.router.forward(this.game.url)
            }

        }
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        this.game = await App.model.games.get(this._params.id);
        if(this.game === null){ return App.router.showError(); }
        if(!App.client.permission.liveReport){ return App.router.forward(this.game.url); }
        if(this.game.status != GameStatus.RUNNING && this.game.status != GameStatus.PENDING){ return App.router.forward(this.game.url); }

        await this.update()
    }

    async update(){

        this.view.winner.team1.disabled = false;
        this.view.winner.team2.disabled = false;
        this.view.winner.team1.checked = true;
        this.view.winner.team2.checked = false;

        this.view.winner.team1.value = this.game.team1.id;
        this.view.winner.label1.innerHTML = `${this.game.team1.name} <span class="tflag" data-t="${this.game.team1.short.toLowerCase()}">`
        this.view.winner.team2.value = this.game.team2.id;
        this.view.winner.label2.innerHTML = `${this.game.team2.name} <span class="tflag" data-t="${this.game.team2.short.toLowerCase()}">`

        this.player_suggestions = []; 
        Promise.all(await this.game.getSuggestedPlayers()).then(players => {
            return players.sort((a,b) => a.name.localeCompare(b.name))
        }).then(players => {
            this.player_suggestions = players;
        })

        this.view.timeline.root.innerHTML = "";

        Promise.all(this.game.getScorers()).then(data => {
            data.forEach(s => {
                var e = document.createElement("span");
                var t1 = (s.team == this.game.team1.id)
                e.classList.add(t1 ? "left" : "right");
                e.innerHTML = `<span class="tflag" data-t="${(t1 ? this.game.team1.short : this.game.team2.short).toLowerCase()}" ></span><span class="text"></span>`;
                e.querySelector(".text").innerText = s.name;
                this.view.timeline.root.appendChild(e);
            })
        })

    }

    async unload(){
        this.view.winner.team1.disabled = false;
        this.view.winner.team2.disabled = false;
        this.view.winner.team1.checked = true;
        this.view.winner.team2.checked = false;
        this.searchselect.reset();
        this.player_suggestions = [];
    }

}