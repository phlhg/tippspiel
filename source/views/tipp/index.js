import View from '../view'

export default class TippIndexView extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `<div class="tipp-tile fullwidth">
            <span class="tflag" data-t=""></span>
            <span class="name"></span>
            <span class="meta"></span>
        </div>
        <div class="tipp-box">
            <span class="icon">1</span>
            <span class="title">Richtiges Team</span>
            <span class="meta">Das getippte Team hat gewonnen</span>
        </div>
        <div class="tipp-box">
            <span class="icon">1</span>
            <span class="title">Richtige Tordifferenz</span>
            <span class="meta">Der getippte Torunterschied stimmt mit dem tatsächlichen Resultat überein</span>
        </div>
        <div class="tipp-box">
            <span class="icon">2</span>
            <span class="title">Exaktes Resultat</span>
            <span class="meta">Es wurde exkat das richtige Resultat getippt</span>
        </div>
        <div class="tipp-box">
            <span class="icon">1</span>
            <span class="title">Torschütze</span>
            <span class="meta">Der getippte Torschütze hat 1 Goal(s) geschossen</span>
        </div>
        <div class="tipp-box">
            <span class="icon">1</span>
            <span class="title">Penaltyschiessen richtig getippt</span>
            <span class="meta">Es wurde auf ein Penaltyschiessen getippt und die getippte Manschaft hat gewonnen.</span>
        </div>
        <div class="tipp-box">
            <span class="icon">5</span>
            <span class="title">Total</span>
        </div>`

        this.header = {}
        this.header.root = this.root.querySelector(".tipp-tile");
        this.header.flag = this.header.root.querySelector(".tflag");
        this.header.name = this.header.root.querySelector(".name");
        this.header.meta = this.header.root.querySelector(".meta");

        var tb = this.root.querySelectorAll(".tipp-box");

        this.team  = {}
        this.team.root = tb[0];
        this.team.icon = this.team.root.querySelector(".icon")

        this.goals  = {}
        this.goals.root = tb[1];
        this.goals.icon = this.goals.root.querySelector(".icon")

        this.result  = {}
        this.result.root = tb[2];
        this.result.icon = this.result.root.querySelector(".icon")

        this.scorer  = {}
        this.scorer.root = tb[3];
        this.scorer.icon = this.scorer.root.querySelector(".icon")
        this.scorer.meta = this.scorer.root.querySelector(".meta")

        this.penalty  = {}
        this.penalty.root = tb[4];
        this.penalty.icon = this.penalty.root.querySelector(".icon")

        this.total  = {}
        this.total.root = tb[5];
        this.total.icon = this.total.root.querySelector(".icon")

    }

    setTipp(t){
        this.tipp = t;
        this.update();
    }

    async update(){

        var user = await this.tipp.getUser();
        var winner = await this.tipp.getWinner();
        var player = await (this.tipp.topscorer > 0 ? this.tipp.getPlayer() : { name: "" })

        this.header.name.innerText = user.name;
        this.header.meta.innerText = `${this.tipp.bet1} : ${this.tipp.bet2} /  ${player.name}`;
        this.header.flag.setAttribute("data-t",winner.short.toLowerCase());

        this.team.icon.innerText = this.tipp.tippkat > 0 ? 1 : 0;
        this.goals.icon.innerText = this.tipp.tippkat > 1 ? 1 : 0;
        this.result.icon.innerText = this.tipp.tippkat > 2 ? 2 : 0;
        this.scorer.icon.innerText = this.tipp.goals;
        this.scorer.meta.innerText = `Der getippte Torschütze hat ${this.tipp.goals} Tor(e) geschossen`;
        this.penalty.icon.innerText = this.tipp.bonus == true ? 1 : 0;

        this.total.icon.innerText = this.tipp.reward;
    }

}