import Tile from './tile';

export default class RankTile extends Tile {
    
    constructor(promise){
        super("user","div", promise);
        this.init();
    }

    init(){
        this.view.root.classList.add("rank-tile")
        this.view.root.innerHTML = `<span class="rank"></span>
        <span class="name"></span>
        <span class="points"></span>`;
        
        this.view.name = this.view.root.querySelector(".name")
        this.view.rank = this.view.root.querySelector(".rank")
        this.view.points = this.view.root.querySelector(".points")
    }

    async update(){
        if(this.obj.id == App.client.id){ this.view.root.classList.add("self") }
        if(this.obj.banned){ this.view.root.classList.add("banned") } else { this.view.root.classList.remove("banned") }
        this.view.name.innerText = this.obj.name;
    }

    setPoints(p){
        this.view.points.innerText = `+${p}`
    }

    setRank(r){
        this.view.root.setAttribute("data-rank",r);
        this.view.rank.innerText = `${r}`
    }

}