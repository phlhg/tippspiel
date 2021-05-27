import Tile from './tile';

export default class TippTile extends Tile {
    
    constructor(promise){
        super("GameTipp","a", promise);
        this.init();
    }

    init(){
        this.view.root.classList.add("tipp-tile")
        this.view.root.setAttribute("href","");
        this.view.root.innerHTML = `<span class="tflag" data-t=""></span>
        <span class="name"></span>
        <span class="meta"></span>
        <span class="reward"></span>`;
        
        this.view.flag = this.view.root.querySelector(".tflag")
        this.view.name = this.view.root.querySelector(".name")
        this.view.meta = this.view.root.querySelector(".meta")
        this.view.reward = this.view.root.querySelector(".reward")
    }

    async update(){

        this.view.root.setAttribute("href",`/tipp/${this.obj.id}/`);

        var user = await this.obj.getUser()
        var winner = await this.obj.getWinner()
        var player = await (this.obj.topscorer > 0 ? this.obj.getPlayer() : { name: "" })

        this.view.name.innerText = user.name;
        this.view.flag.setAttribute("data-t",winner.short.toLowerCase());
        this.view.meta.innerText = `${this.obj.bet1} : ${this.obj.bet2} /  ${player.name}`;
        this.view.reward.innerText = this.obj.reward > 0 ? '+'+this.obj.reward : '';
    }

}