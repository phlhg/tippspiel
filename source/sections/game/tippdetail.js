import Debugger from '../../debugger';
import Section from '../section';

export default class TippDetail extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.tipp = null;

        this.view.root.innerHTML = `<div class="tipp-tile fullwidth">
            <span class="tflag" data-t=""></span>
            <span class="name"></span>
            <span class="meta"></span>
        </div>
        <div class="tipp-box">
            <span class="icon">1</span>
            <span class="title">${Lang.get("section/tipp/team/name")}</span>
            <span class="meta">${Lang.get("section/tipp/team/desc")}</span>
        </div>
        <div class="tipp-box">
            <span class="icon">1</span>
            <span class="title">${Lang.get("section/tipp/delta/name")}</span>
            <span class="meta">${Lang.get("section/tipp/delta/desc")}</span>
        </div>
        <div class="tipp-box">
            <span class="icon">2</span>
            <span class="title">${Lang.get("section/tipp/exact/name")}</span>
            <span class="meta">${Lang.get("section/tipp/exact/desc")}</span>
        </div>
        <div class="tipp-box">
            <span class="icon">1</span>
            <span class="title">${Lang.get("section/tipp/scorer/name")}</span>
            <span class="meta"></span>
        </div>
        <div class="tipp-box">
            <span class="icon">1</span>
            <span class="title">${Lang.get("section/tipp/penalty/name")}</span>
            <span class="meta">${Lang.get("section/tipp/penalty/desc")}</span>
        </div>
        <div class="tipp-box">
            <span class="icon">5</span>
            <span class="title">${Lang.get("section/tipp/total/name")}</span>
        </div>`

        this.view.header = {}
        this.view.header.root = this.view.root.querySelector(".tipp-tile");
        this.view.header.flag = this.view.header.root.querySelector(".tflag");
        this.view.header.name = this.view.header.root.querySelector(".name");
        this.view.header.meta = this.view.header.root.querySelector(".meta");

        var tb = this.view.root.querySelectorAll(".tipp-box");

        this.view.team  = {}
        this.view.team.root = tb[0];
        this.view.team.icon = this.view.team.root.querySelector(".icon")

        this.view.goals  = {}
        this.view.goals.root = tb[1];
        this.view.goals.icon = this.view.goals.root.querySelector(".icon")

        this.view.result  = {}
        this.view.result.root = tb[2];
        this.view.result.icon = this.view.result.root.querySelector(".icon")

        this.view.scorer  = {}
        this.view.scorer.root = tb[3];
        this.view.scorer.icon = this.view.scorer.root.querySelector(".icon")
        this.view.scorer.meta = this.view.scorer.root.querySelector(".meta")

        this.view.penalty  = {}
        this.view.penalty.root = tb[4];
        this.view.penalty.icon = this.view.penalty.root.querySelector(".icon")

        this.view.total  = {}
        this.view.total.root = tb[5];
        this.view.total.icon = this.view.total.root.querySelector(".icon")

        window.addEventListener("datachange",e => {
            if(this._active && this.tipp != null && e.detail.type == "gametipp" && e.detail.id == this.tipp.id){
                Debugger.log(this,"Section was updated remotely")()
                this.update();
            }
        });

    }

    async load(){
        if(!App.promptConnection()){ return false; }

        this.tipp = await App.model.gameTipps.get(this._params.id);
        if(this.tipp === null){ return App.router.showError(); }

        await this.update();
    }

    async update(){
        var user = await this.tipp.getUser();
        var winner = await this.tipp.getWinner();
        var player = await (this.tipp.topscorer > 0 ? this.tipp.getPlayer() : { name: "" })

        this.view.header.name.innerText = user.name;
        this.view.header.meta.innerText = `${this.tipp.bet1} : ${this.tipp.bet2} /  ${player.name}`;
        this.view.header.flag.setAttribute("data-t",winner.short.toLowerCase());

        this.view.team.icon.innerText = this.tipp.tippkat > 0 ? 1 : 0;
        this.view.goals.icon.innerText = this.tipp.tippkat > 1 ? 1 : 0;
        this.view.result.icon.innerText = this.tipp.tippkat > 2 ? 2 : 0;
        this.view.scorer.icon.innerText = this.tipp.goals;
        this.view.scorer.meta.innerText = Lang.get("section/tipp/scorer/desc",{n: this.tipp.goals})
        this.view.penalty.icon.innerText = this.tipp.bonus == true ? 1 : 0;

        this.view.total.icon.innerText = this.tipp.reward;
    }

}