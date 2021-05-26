import Form from '../../components/form'
import SearchSelect from '../../components/searchselect'
import { GameStatus } from '../../models/games/enums';
import Section from '../section'

export default class GameReport extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.game = null;

        this.view.root.innerHTML = `<a class="game-header">
            <h2 class="top">
                <span class="team1"><span class="tflag" data-t="" ></span> <span class="name"></span></span>
                <span class="team2"><span class="name"></span> <span class="tflag" data-t="" ></span></span>
            </h2>
            <img class="flag1" src="/img/flag/sui.png"/>
            <img class="flag2" src="/img/flag/esp.png"/>
        </a>
        <form class="tipp-form" style="margin-bottom: 200px" >
            <h4>${Lang.get("section/game/report/phase/name")}</h4>
            <select name="phase">
                <option value="0" checked>${Lang.get("section/game/report/phase/0")}</option>
                <option value="1">${Lang.get("section/game/report/phase/1")}</option>
                <option value="2">${Lang.get("section/game/report/phase/2")}</option>
            </select>
            <h4>${Lang.get("section/game/report/result/normal")}</h4>
            <div class="tipp-score">
                <input required class="t1" name="score1" placeholder="0" min="0" max="99" step="1" value="0" inputmode="numeric" type="number" />
                <span class="seperator">:</span>
                <input required class="t2" name="score2" placeholder="0" min="0" max="99" step="1" value="0" inputmode="numeric" type="number" />
            </div>
            <h4>${Lang.get("section/game/report/scorers/name")} <small>${Lang.get("section/game/report/scorers/hint")}</small></h4>
            <div class="tipp-player" style="position: relative; display: block; margin-bottom: 10px;" ></div>
            <span class="penalty-section" style="display: none" >
                <h4>${Lang.get("section/game/report/result/penalty")}</h4>
                <div class="tipp-score">
                    <input required class="t1" name="penalty1" placeholder="0" min="0" max="99" step="1" value="0" inputmode="numeric" type="number" />
                    <span class="seperator">:</span>
                    <input required class="t2" name="penalty2" placeholder="0" min="0" max="99" step="1" value="0" inputmode="numeric" type="number" />
                </div>
            </span>
            <input type="submit" value="${Lang.get("section/game/report/submit")}" style="margin: 10px 0 0 15px;"/>
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

        this.view.result = {}
        this.view.result.phase = this.view.root.querySelector("select[name='phase']")
        this.view.result.score1 = this.view.root.querySelector("input[name='score1']")
        this.view.result.score2 = this.view.root.querySelector("input[name='score2']")
        this.view.result.penalty1 = this.view.root.querySelector("input[name='penalty1']")
        this.view.result.penalty2 = this.view.root.querySelector("input[name='penalty2']")

        this.view.penaltyWrapper = this.view.root.querySelector(".penalty-section")
        this.view.playerWrapper = this.view.root.querySelector(".tipp-player")

        this.playerAll = [];
        this.playerSelects = [];

        this.playerSuggestion = async (input) => {
            return await Promise.all(this.playerAll.filter(p => {
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

        this.view.result.phase.onchange = e => {
            this.view.penaltyWrapper.style.display = this.view.result.phase.value == 2 ? "block" : "none";
        }

        [this.view.result.score1, this.view.result.score2].forEach(i => {
            i.onchange = e => {
                var l = this.playerSelects.length;
                var n = parseInt(this.view.result.score1.value) + parseInt(this.view.result.score2.value);
                var d = n - l;
                if(d > 0){
                    for(var i = l; i < n; i++){
                        this.playerSelects[i] = new SearchSelect("",Lang.get("section/game/report/scorers/select"));
                        this.playerSelects[i].getSuggestions = this.playerSuggestion;
                        this.view.playerWrapper.appendChild(this.playerSelects[i].getHtml());
                    }
                } else if(d < 0){
                    for(var i = l - 1; i >= n; i--){
                        this.playerSelects[i].root.remove();
                    }
                    this.playerSelects.length = n;
                }
            }
        })

        this.form.onSubmit = async (data) => {

            var d = {}
            d.phase = parseInt(data.phase);
            d.score1 = parseInt(data.score1);
            d.score2 = parseInt(data.score2);
            d.penalty1 = d.phase == 2 ? parseInt(data.penalty1) : 0;
            d.penalty2 = d.phase == 2 ? parseInt(data.penalty2) : 0;
            d.scorer = this.playerSelects.map(s => parseInt(s.getSelected().value));
            
            if(d.scorer.filter(s => s < 1).length > 0){
                this.form.error("Bitte gib für jedes Tor einen Torschützen ein");
                return;
            }

            var r = await this.game.report(d);
            if(!r.success){
                this.form.error(r.message);
            } else {
                App.router.forward(this.game.url); 
            }

        }
    
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        this.game = await App.model.games.get(this._params.id);
        if(this.game === null){ return App.router.showError(); }

        if(this.game.status != GameStatus.PENDING || !App.client.permission.gameReport){ 
            return App.router.forward(`/`);
        }

        await this.update();
    }

    async update(){
        
        this.view.header.root.setAttribute("href",`/game/${this.game.id}/${this.game.team1.short.toLowerCase()}-${this.game.team2.short.toLowerCase()}/`)

        this.view.header.team1.name.innerText = this.game.team1.name;
        this.view.header.team2.name.innerText = this.game.team2.name;

        this.view.header.team1.flag.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.view.header.team2.flag.setAttribute("data-t",this.game.team2.short.toLowerCase())

        this.view.header.team1.bg.src = '/img/flag/' + this.game.team1.short.toLowerCase() + '.png';
        this.view.header.team2.bg.src = '/img/flag/' + this.game.team2.short.toLowerCase() + '.png';

        this.playerAll = await Promise.all(await this.game.getSuggestedPlayers())
        this.playerAll.sort((a,b) => a.name.localeCompare(b.name))

        this.view.result.phase.value = this.game.phase;
        this.view.penaltyWrapper.style.display = this.view.result.phase.value == 2 ? "block" : "none";

    }

    async unload(){
        this.playerAll = [];
        this.playerSelects = [];
        this.view.playerWrapper.innerHTML = "";
        this.form.reset();
    }

}