import Form from '../helpers/form'
import SearchSelect from '../helpers/searchselect'
import View from '../view'

export default class GameIndex extends View {

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
            <h4>${Lang.get("section/game/tipp/form/result")}</h4>
            <div class="tipp-score">
                <input required class="t1" name="score1" placeholder="0" min="0" max="99" step="1" value="0" type="number" />
                <span class="seperator">:</span>
                <input required class="t2" name="score2" placeholder="0" min="0" max="99" step="1" value="0" type="number" />
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

        this.score = {}
        this.score.team1 = this.root.querySelector("form .tipp-score .t1")
        this.score.team2 = this.root.querySelector("form .tipp-score .t2")

        this.winner = {}
        this.winner.team1 = this.root.querySelector("form .tipp-winner #tippscoreteam1")
        this.winner.label1 = this.root.querySelector("form .tipp-winner label[for='tippscoreteam1']")
        this.winner.team2 = this.root.querySelector("form .tipp-winner #tippscoreteam2")
        this.winner.label2 = this.root.querySelector("form .tipp-winner label[for='tippscoreteam2']")

        this.player = this.root.querySelector(".tipp-player");
        this.player_suggestions = [];

        [this.score.team1,this.score.team2].forEach(element => {
            element.onkeyup = () => {
                var t1 = parseInt(this.score.team1.value)
                var t2 = parseInt(this.score.team2.value)
                if(isNaN(t1) || isNaN(t2)) return;
                this.setResult(t1,t2)
            }
        })

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

        this.player.appendChild(this.searchselect.getHtml())

        this.form.root.addEventListener("submit",e => {
            e.preventDefault();

            var p = Math.max(parseInt(this.searchselect.getSelected().value),0);
            var b1 = this.score.team1;
            var b2 = this.score.team2;

            var b1 = parseInt(this.score.team1.value)
            var b2 = parseInt(this.score.team2.value)

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
                var w = this.winner.team1.checked ? this.game.team1.id : (this.winner.team2.checked ? this.game.team2.id : 0);
            }

            if(w < 1){
                this.form.error("Bitte gib einen Gewinner für das Penaltyschiessen an")
                return;
            }
            
            this.event("submit",{
                b1: b1,
                b2: b2,
                winner: w,
                topscorer: p
            });
        })
    }

    setGame(game){
        this.game = game;
        window.removeEventListener("datachange",this._func)
        this._func = function(e){
            if(e.detail.type == "game" && e.detail.id == this.game.id){ this.update() }
        }.bind(this)
        window.addEventListener("datachange",this._func);
        this.update();
    }

    async setTipp(tipp){
        this.tipp = tipp;

        this.setResult(this.tipp.bet1,this.tipp.bet2)

        if(this.game.team1.id == this.tipp.winner){
            this.winner.team1.checked = true;
            this.winner.team2.checked = false;
        } else if(this.game.team2.id == this.tipp.winner){
            this.winner.team1.checked = false;
            this.winner.team2.checked = true;
        }

        var p = await this.tipp.getPlayer();
        var t = await p.getTeam();
        this.searchselect._select({
            value: p.id,
            img: `/img/flag/${t.short.toLowerCase()}.png`,
            text: p.name
        })
    }

    setResult(t1,t2){
        this.score.team1.value = t1;
        this.score.team2.value = t2;

        if(t1 == t2){
            this.winner.team1.disabled = false;
            this.winner.team2.disabled = false;
        } else {
            this.winner.team1.disabled = true;
            this.winner.team2.disabled = true;
            if(t1 > t2){
                this.winner.team1.checked = true;
                this.winner.team2.checked = false;
            } else {
                this.winner.team1.checked = false;
                this.winner.team2.checked = true;
            }
        }
    }

    async update(){
        
        this.header.root.setAttribute("href",`/game/${this.game.id}/${this.game.team1.short.toLowerCase()}-${this.game.team2.short.toLowerCase()}/`)

        this.header.team1.name.innerText = this.game.team1.name;
        this.header.team2.name.innerText = this.game.team2.name;

        this.header.team1.flag.setAttribute("data-t",this.game.team1.short.toLowerCase())
        this.header.team2.flag.setAttribute("data-t",this.game.team2.short.toLowerCase())

        this.header.team1.bg.src = '/img/flag/' + this.game.team1.short.toLowerCase() + '.png';
        this.header.team2.bg.src = '/img/flag/' + this.game.team2.short.toLowerCase() + '.png';

        this.winner.team1.value = this.game.team1.id;
        this.winner.label1.innerHTML = `${this.game.team1.name} <span class="tflag" data-t="${this.game.team1.short.toLowerCase()}">`
        this.winner.team2.value = this.game.team2.id;
        this.winner.label2.innerHTML = `${this.game.team2.name} <span class="tflag" data-t="${this.game.team2.short.toLowerCase()}">`

        this.player_suggestions = await Promise.all(await this.game.getSuggestedPlayers())
        this.player_suggestions.sort((a,b) => a.name.localeCompare(b.name))
    }

    clear(){
        this.score.team1.value = 0 
        this.score.team2.value = 0
        this.winner.team1.disabled = false;
        this.winner.team2.disabled = false;
        this.winner.team1.checked = false;
        this.winner.team1.checked = false;
        this.searchselect.reset();
        this.player_suggestions = [];
    }

}