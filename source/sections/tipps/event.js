import Debugger from '../../debugger';
import Section from '../section';

export default class EventTippDetail extends Section {

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
            <span class="icon">0</span>
            <span class="title">${Lang.get("section/tipps/event/total/name")}</span>
        </div>
        <div class="tipp-box">
            <span class="icon">4</span>
            <span class="title">${Lang.get("section/tipps/event/team/name")}</span>
            <span class="meta">${Lang.get("section/tipps/event/team/desc")}</span>
        </div>
        <div class="tipp-box">
            <span class="icon">4</span>
            <span class="title">${Lang.get("section/tipps/event/topscorer/name")}</span>
            <span class="meta">${Lang.get("section/tipps/event/topscorer/desc")}</span>
        </div>`

        this.view.header = {}
        this.view.header.root = this.view.root.querySelector(".tipp-tile");
        this.view.header.flag = this.view.header.root.querySelector(".tflag");
        this.view.header.name = this.view.header.root.querySelector(".name");
        this.view.header.meta = this.view.header.root.querySelector(".meta");

        var tb = this.view.root.querySelectorAll(".tipp-box");

        this.view.total  = {}
        this.view.total.root = tb[0];
        this.view.total.icon = this.view.total.root.querySelector(".icon")

        this.view.team = tb[1];
        this.view.topscorer = tb[2];

        window.addEventListener("datachange",e => {
            if(this._active && this.tipp != null && e.detail.type == "eventtipp" && e.detail.id == this.tipp.id){
                Debugger.log(this,"Section was updated remotely")()
                this.update();
            }
        });

    }

    async load(){
        if(!App.promptConnection()){ return false; }

        this.tipp = await App.model.eventTipps.get(this._params.id);
        if(this.tipp === null){ return App.router.showError(); }

        await this.update();
    }

    async update(){

        var user = (await this.tipp.getUser()) ?? { name: "" }
        var winner = (await this.tipp.getWinner()) ?? { name: "", short: ""}
        var player = await this.tipp.getTopscorer()

        this.view.header.name.innerText = user.name;
        this.view.header.meta.innerText = player != null ? `${winner.name} & ${player.name}` : `${winner.name}`;
        this.view.header.flag.setAttribute("data-t",winner.short.toLowerCase());

        this.view.total.icon.innerText = this.tipp.reward.sum;

        this.view.team.style.opacity = this.tipp.reward.winner ? 1 : 0.25;
        this.view.topscorer.style.opacity = this.tipp.reward.topscorer ? 1 : 0.25;
        
    }

}