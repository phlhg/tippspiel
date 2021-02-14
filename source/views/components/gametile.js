import Component from './component'

export default class GameTile extends Component {
    
    constructor(data){
        super("game",data.id,"a");
        this.data = data;
        this.init();
    }

    init(){
        this.view.root.setAttribute("href",`/game/${this.data.id}/${this.data.team1.name.toLowerCase()}-${this.data.team2.name.toLowerCase()}/`)
        this.view.root.classList.add("game-tile");
        this.view.root.innerHTML = `<span class="live-indicator">live</span><span class="title"><span class="tflag"></span> <span class="t"></span> <span class="tflag"></span></span><span class="meta"></span><div class="live-view"><iframe allowfullscreen></iframe></div>`;
        this.view.title = this.view.root.querySelector(".title > .t")
        this.view.flag1 = this.view.root.querySelectorAll(".title .tflag")[0]
        this.view.flag2 = this.view.root.querySelectorAll(".title .tflag")[1]
        this.view.meta = this.view.root.querySelector(".meta");
        this.view.iframe = this.view.root.querySelector("iframe");
        this.update();
    }

    update(){
        this.view.title.innerText = `${this.data.team1.name} ${this.data.team1.points}:${this.data.team2.points} ${this.data.team2.name}`;
        this.view.flag1.setAttribute("data-t",this.data.team1.name.toLowerCase());
        this.view.flag2.setAttribute("data-t",this.data.team2.name.toLowerCase());
        this.view.meta.innerText = `${("0"+this.data.start.getDate()).slice(-2)}.${("0"+(this.data.start.getMonth()+1)).slice(-2)} ${("0"+this.data.start.getHours()).slice(-2)}:${("0"+this.data.start.getMinutes()).slice(-2)} | ${this.data.tippsCount} Tipps`;
    }

}