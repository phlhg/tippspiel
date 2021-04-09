import Form from '../helpers/form'
import SearchSelect from '../helpers/searchselect'
import View from '../view'

export default class GameReportView extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = `<a class="game-header">
            <h2 class="top">
                <span class="team1"><span class="tflag" data-t="sui" ></span> <span class="name">Schweiz</span></span>
                <span class="team2"><span class="name">Spanien</span> <span class="tflag" data-t="esp" ></span></span>
            </h2>
            <img class="flag1" src="/img/flag/sui.png"/>
            <img class="flag2" src="/img/flag/esp.png"/>
        </a>
        <form class="tipp-form">
            <h4>Spiel-Ende</h4>
            <select name="phase">
                <option value="0" checked>Beendet nach 90 Minuten</option>
                <option value="1">Beendet nach Verlängerung</option>
                <option value="2">Beendet nach Penaltyschiessen</option>
            </select>
            <h4>${Lang.get("section/game/tipp/form/result")}</h4>
            <div class="tipp-score">
                <input required class="t1" name="score1" placeholder="0" min="0" max="99" step="1" value="0" type="number" />
                <span class="seperator">:</span>
                <input required class="t2" name="score2" placeholder="0" min="0" max="99" step="1" value="0" type="number" />
            </div>
            <h4>Torschützen <small>(Chronologisch)</small></h4>
            <div class="tipp-player" style="position: relative; display: block; margin-bottom: 10px;" ></div>
            <span class="penalty-section" style="display: none" >
                <h4>Resultat Penaltyschiessen</h4>
                <div class="tipp-score">
                    <input required class="t1" name="penalty1" placeholder="0" min="0" max="99" step="1" value="0" type="number" />
                    <span class="seperator">:</span>
                    <input required class="t2" name="penalty2" placeholder="0" min="0" max="99" step="1" value="0" type="number" />
                </div>
            </span>
            <input type="submit" value="Spiel beenden" style="margin: 10px 0 0 15px;"/>
        </form>
        `

        this.form = new Form(this.root.querySelector("form"));

        this.header = {}
        this.header.root = this.root.querySelector(".game-header")

        this.header.team1 = {}
        this.header.team1.name = this.header.root.querySelector(".team1 .name")
        this.header.team1.flag = this.header.root.querySelector(".team1 .tflag")
        this.header.team1.bg = this.header.root.querySelector(".flag1")
        
        this.header.team2 = {}
        this.header.team2.name = this.header.root.querySelector(".team2 .name")
        this.header.team2.flag = this.header.root.querySelector(".team2 .tflag")
        this.header.team2.bg = this.header.root.querySelector(".flag2")

        this.result = {}
        this.result.phase = this.root.querySelector("select[name='phase']")
        this.result.score1 = this.root.querySelector("input[name='score1']")
        this.result.score2 = this.root.querySelector("input[name='score2']")
        this.result.penalty1 = this.root.querySelector("input[name='penalty1']")
        this.result.penalty2 = this.root.querySelector("input[name='penalty2']")

        this.penaltyWrapper = this.root.querySelector(".penalty-section")
        this.playerWrapper = this.root.querySelector(".tipp-player")

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

        this.result.phase.onchange = e => {
            if(this.result.phase.value == 2){
                this.penaltyWrapper.style.display = "block";
            } else {
                this.penaltyWrapper.style.display = "none";
            }
        }

        [this.result.score1, this.result.score2].forEach(i => {
            i.onchange = e => {
                var l = this.playerSelects.length;
                var n = parseInt(this.result.score1.value) + parseInt(this.result.score2.value);
                var d = n - l;
                if(d > 0){
                    for(var i = l; i < n; i++){
                        this.playerSelects[i] = new SearchSelect("","Wähle einen Spieler");
                        this.playerSelects[i].getSuggestions = this.playerSuggestion;
                        this.playerWrapper.appendChild(this.playerSelects[i].getHtml());
                    }
                } else if(d < 0){
                    for(var i = l - 1; i >= n; i--){
                        this.playerSelects[i].root.remove();
                    }
                    this.playerSelects.length = n;
                }
            }
        })

        this.form.onSubmit = data => {

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

            this.event("submit", d);
        }
    
    }

    setGame(game){
        this.game = game;
        this.update();
    }

    async update(){
        
        this.header.root.setAttribute("href",`/game/${this.game.id}/${this.game.team1.short.toLowerCase()}-${this.game.team2.short.toLowerCase()}/`)

        this.header.team1.name.innerText = this.game.team1.name;
        this.header.team2.name.innerText = this.game.team2.name;

        this.header.team1.flag.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.header.team2.flag.setAttribute("data-t",this.game.team2.short.toLowerCase())

        this.header.team1.bg.src = '/img/flag/' + this.game.team1.short.toLowerCase() + '.png';
        this.header.team2.bg.src = '/img/flag/' + this.game.team2.short.toLowerCase() + '.png';

        this.playerAll = await Promise.all(await this.game.getSuggestedPlayers())
        this.playerAll.sort((a,b) => a.name.localeCompare(b.name))

    }

    clear(){
        this.playerAll = [];
    }

}