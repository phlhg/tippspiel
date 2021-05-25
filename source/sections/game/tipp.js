import Form from '../../helper/form'
import SearchSelect from '../../helper/searchselect'
import { GameStatus } from '../../models/games/enums';
import Section from '../section'

export default class GameTipp extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.game = null;
        this.tipp = null;

        this.view.root.innerHTML = `<a class="game-header">
            <h2 class="top">
                <span class="team1"><span class="tflag" data-t="sui" ></span> <span class="name">Schweiz</span></span>
                <span class="team2"><span class="name">Spanien</span> <span class="tflag" data-t="esp" ></span></span>
            </h2>
            <img class="flag1" src="/img/flag/sui.png"/>
            <img class="flag2" src="/img/flag/esp.png"/>
        </a>
        <form class="tipp-form" style="margin-bottom: 200px">
            <h4>${Lang.get("section/game/tipp/form/result")}</h4>
            <div class="tipp-score">
                <input required class="t1" name="score1" placeholder="0" min="0" max="99" step="1" value="0" inputmode="numeric" type="number" />
                <span class="seperator">:</span>
                <input required class="t2" name="score2" placeholder="0" min="0" max="99" step="1" value="0" inputmode="numeric" type="number" />
            </div>
            <h4>${Lang.get("section/game/tipp/form/winner")} <small> ${Lang.get("section/game/tipp/form/winner_notice")}</small></h4>
            <div class="tipp-winner">
                <div class="tipp-radio-select">
                    <input type="radio" id="tippscoreteam1" name="winner" required value=""/>
                    <label for="tippscoreteam1"></label>
                    <input type="radio" id="tippscoreteam2" name="winner" value=""/>
                    <label for="tippscoreteam2"></label>
                </div>
            </div>
            <h4>${Lang.get("section/game/tipp/form/topscorer")}</h4>
            <div class="tipp-player"></div>
            <input type="submit" value="${Lang.get("section/game/tipp/form/submit")}" style="margin: 10px 0 0 15px;"/>
        </form>
        `

        this.form = new Form(this.view.root.querySelector("form"));

        this.view.header = {}
        this.view.header.root = this.view.root.querySelector(".game-header")

        this.view.header.team1 = {}
        this.view.header.team1.name = this.view.header.root.querySelector(".team1 .name")
        this.view.header.team1.flag = this.view.header.root.querySelector(".team1 .tflag")
        this.view.header.team1.bg = this.view.header.root.querySelector(".flag1")
        
        this.view.header.team2 = {}
        this.view.header.team2.name = this.view.header.root.querySelector(".team2 .name")
        this.view.header.team2.flag = this.view.header.root.querySelector(".team2 .tflag")
        this.view.header.team2.bg = this.view.header.root.querySelector(".flag2")

        this.view.score = {}
        this.view.score.team1 = this.view.root.querySelector("form .tipp-score .t1")
        this.view.score.team2 = this.view.root.querySelector("form .tipp-score .t2")

        this.view.winner = {}
        this.view.winner.team1 = this.view.root.querySelector("form .tipp-winner #tippscoreteam1")
        this.view.winner.label1 = this.view.root.querySelector("form .tipp-winner label[for='tippscoreteam1']")
        this.view.winner.team2 = this.view.root.querySelector("form .tipp-winner #tippscoreteam2")
        this.view.winner.label2 = this.view.root.querySelector("form .tipp-winner label[for='tippscoreteam2']")

        this.view.player = this.view.root.querySelector(".tipp-player");
        this.player_suggestions = [];

        // Score

        [this.view.score.team1,this.view.score.team2].forEach(element => {
            element.onkeyup = () => {
                var t1 = parseInt(this.view.score.team1.value)
                var t2 = parseInt(this.view.score.team2.value)
                if(isNaN(t1) || isNaN(t2)) return;
                this.setResult(t1,t2)
            }
        })

        // Player Select

        this.searchselect = new SearchSelect("player",Lang.get("section/game/tipp/form/search"));
        this.searchselect.getSuggestions = async (input) => {
            return await Promise.all(this.player_suggestions.filter(p => {
                return p.normalized.indexOf(input.toLowerCase()) > -1
            }).sort((a,b) => {
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
            var b1 = this.view.score.team1;
            var b2 = this.view.score.team2;

            var b1 = parseInt(this.view.score.team1.value)
            var b2 = parseInt(this.view.score.team2.value)

            if(isNaN(b1) || isNaN(b2)){
                this.form.error("Bitte gib ein gültiges Resultat ein")
                return;
            }

            var w = 0;

            if(b1 > b2){
                var w = this.game.team1.id;
            } else if(b1 < b2){
                var w = this.game.team2.id
            } else {
                var w = this.view.winner.team1.checked ? this.game.team1.id : (this.view.winner.team2.checked ? this.game.team2.id : 0);
            }

            if(w < 1){
                this.form.error("Bitte gib einen Gewinner für das Penaltyschiessen an")
                return;
            }

            var r = await this.game.makeTipp({
                bet1: b1,
                bet2: b2,
                winner: w,
                topscorer: p
            })

            if(!r.success){
                this.view.form.error(r.message);
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

        if(this.game.status != GameStatus.UPCOMING){  return App.router.forward(`/`); }

        this.tipp = this.game.hasOwnTipp() ? await this.game.getOwnTipp() : null;

        this.view.header.root.setAttribute("href",`/game/${this.game.id}/${this.game.team1.short.toLowerCase()}-${this.game.team2.short.toLowerCase()}/`)

        this.view.header.team1.name.innerText = this.game.team1.name;
        this.view.header.team2.name.innerText = this.game.team2.name;

        this.view.header.team1.flag.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.view.header.team2.flag.setAttribute("data-t",this.game.team2.short.toLowerCase())

        this.view.header.team1.bg.src = '/img/flag/' + this.game.team1.short.toLowerCase() + '.png';
        this.view.header.team2.bg.src = '/img/flag/' + this.game.team2.short.toLowerCase() + '.png';

        this.view.winner.team1.value = this.game.team1.id;
        this.view.winner.label1.innerHTML = `${this.game.team1.name} <span class="tflag" data-t="${this.game.team1.short.toLowerCase()}">`
        this.view.winner.team2.value = this.game.team2.id;
        this.view.winner.label2.innerHTML = `${this.game.team2.name} <span class="tflag" data-t="${this.game.team2.short.toLowerCase()}">`

        this.player_suggestions = await Promise.all(await this.game.getSuggestedPlayers())
        this.player_suggestions.sort((a,b) => a.name.localeCompare(b.name))

        if(this.tipp != null){

            this.setResult(this.tipp.bet1,this.tipp.bet2)

            if(this.game.team1.id == this.tipp.winner){
                this.view.winner.team1.checked = true;
                this.view.winner.team2.checked = false;
            } else if(this.game.team2.id == this.tipp.winner){
                this.view.winner.team1.checked = false;
                this.view.winner.team2.checked = true;
            }

            if(this.tipp.topscorer > 0){
                var p = await this.tipp.getPlayer();
                var t = await p.getTeam();
                this.searchselect._select({
                    value: p.id,
                    img: `/img/flag/${t.short.toLowerCase()}.png`,
                    text: p.name
                })
            } else {
                this.searchselect.reset();
            }
        
        }

    }

    setResult(t1,t2){
        this.view.score.team1.value = t1;
        this.view.score.team2.value = t2;

        if(t1 == t2){
            this.view.winner.team1.disabled = false;
            this.view.winner.team2.disabled = false;
        } else {
            this.view.winner.team1.disabled = true;
            this.view.winner.team2.disabled = true;
            if(t1 > t2){
                this.view.winner.team1.checked = true;
                this.view.winner.team2.checked = false;
            } else {
                this.view.winner.team1.checked = false;
                this.view.winner.team2.checked = true;
            }
        }
    }

    clear(){
        this.view.score.team1.value = 0 
        this.view.score.team2.value = 0
        this.view.winner.team1.disabled = false;
        this.view.winner.team2.disabled = false;
        this.view.winner.team1.checked = false;
        this.view.winner.team1.checked = false;
        this.view.searchselect.reset();
        this.view.player_suggestions = [];
    }

}