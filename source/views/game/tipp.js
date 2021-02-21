import View from '../view'

export default class GameIndex extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = `<div class="game-header">
            <h2 class="top">
                <span class="team1"><span class="tflag" data-t="sui" ></span> <span class="name">Schweiz</span></span>
                <span class="team2"><span class="name">Spanien</span> <span class="tflag" data-t="esp" ></span></span>
            </h2>
            <img class="flag1" src="/img/flag/sui.png"/>
            <img class="flag2" src="/img/flag/esp.png"/>
        </div>
        <form class="tipp-form">
            <h4>Resultat</h4>
            <div class="tipp-score">
                <input class="t1" name="score1" placeholder="0" min="0" max="99" step="1" value="0" type="number" />
                <span class="seperator">:</span>
                <input class="t2" name="score2" placeholder="0" min="0" max="99" step="1" value="0" type="number" />
            </div>
            <h4>Gewinner <small> (bei möglichem Penaltyschiessen)</small></h4>
            <div class="tipp-winner">
                <div class="tipp-radio-select">
                    <input type="radio" id="tippscoreteam1" name="winner" required value=""/>
                    <label for="tippscoreteam1"></label>
                    <input type="radio" id="tippscoreteam2" name="winner" required value=""/>
                    <label for="tippscoreteam2"></label>
                </div>
            </div>
            <h4>Torschütze</h4>
            <div class="tipp-search tipp-player">
                <span class="tflag" data-t=""></span>
                <input type="search" placeholder="Suche nach einem Spieler" name="player"/>
                <div class="suggestions"></div>
            </div>
            <input type="submit" value="Tippen" style="margin: 10px 0 0 15px;"/>
        </form>
        `

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

        this.player = {}
        this.player.id = 0;
        this.player.input = this.root.querySelector(".tipp-player input");
        this.player.flag = this.root.querySelector(".tipp-player .tflag");
        this.player.suggestions = this.root.querySelector(".tipp-player .suggestions");

        [this.score.team1,this.score.team2].forEach(element => {
            element.onkeyup = () => {
                var t1 = parseInt(this.score.team1.value)
                var t2 = parseInt(this.score.team2.value)
                if(isNaN(t1) || isNaN(t2)) return;
                this.setResult(t1,t2)
            }
        })

        this.player_suggestions = [];

        this.player.input.onkeyup = e => {
            this.player.suggestions.innerHTML = "";
            if(this.player.input.value.replace(/ /ig,"") != ""){
                this.player_suggestions.filter(p => {
                    return p.normalized.indexOf(this.player.input.value.toLowerCase()) > -1
                }).sort((a,b) => {
                    return -a.normalized.localeCompare(this.player.input.value.toLowerCase())
                }).slice(0,4).forEach(async p => {
                    var t = await p.getTeam();
                    var s = document.createElement("span");
                    s.innerHTML = `<span class="tflag" data-t="${t.name.toLowerCase()}"></span>${p.name}`;
                    s.onclick = () => { this.setPlayer(p.id); }
                    this.player.suggestions.appendChild(s);
                })
            }
        }

        this.player.input.onfocus = e => {
            this.player.flag.setAttribute("data-t","")
            this.player.input.value = "";
            this.player.suggestions.innerHTML = "";
        }

        this.player.input.onblur = e => {
            this.setPlayer(this.player.id);
        }
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

        this.setPlayer(this.tipp.topscorer)
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

    async setPlayer(id){
        if(id <= 0){ return; }
        this.player.id = id;
        var p = await App.model.players.get(id);
        var t = await p.getTeam();
        this.player.id = p.id;
        this.player.input.value = p.name;
        this.player.flag.setAttribute("data-t",t.name.toLowerCase())
    }

    async update(){
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
        this.player.input.value = "";
        this.player_suggestions = [];
    }

}