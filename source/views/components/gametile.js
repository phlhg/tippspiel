import TippDate from '../../helper/date';
import Component from './component'

export default class GameTile extends Component {
    
    constructor(id,promise){
        super("game",id,"a");
        this.data = {}
        this.init();
        promise.then(data => {
            this.data = data
            this.update();
        },e => {
            this.remove();
        })
    }

    init(){
        this.view.root.classList.add("game-tile")
        this.view.root.classList.add("loading")
        this.view.root.innerHTML = `<span class="live-indicator">live</span><span class="title"><span class="tflag"></span> <span class="t"></span> <span class="tflag"></span></span><span class="meta"></span><div class="live-view"><iframe allowfullscreen></iframe></div>`;
        this.view.title = this.view.root.querySelector(".title > .t")
        this.view.flag1 = this.view.root.querySelectorAll(".title .tflag")[0]
        this.view.flag2 = this.view.root.querySelectorAll(".title .tflag")[1]
        this.view.meta = this.view.root.querySelector(".meta");
        this.view.iframe = this.view.root.querySelector("iframe");

        this.view.title.innerText = `AAA 0:0 AAA`;
        this.view.meta.innerText = `00.00 00:00 | 0 Tipps`;
    }

    update(){
        this.view.root.setAttribute("href",`/game/${this.data.id}/${this.data.team1.short.toLowerCase()}-${this.data.team2.short.toLowerCase()}/`)
        this.view.title.innerText = `${this.data.team1.name}  ${this.data.team1.score}:${this.data.team2.score}  ${this.data.team2.name}`;
        this.view.flag1.setAttribute("data-t",this.data.team1.short.toLowerCase());
        this.view.flag2.setAttribute("data-t",this.data.team2.short.toLowerCase());
        this.view.meta.innerText = `${TippDate.toString(this.data.start)} | ${this.data.tipps.length} Tipps`;
        this.view.root.onclick = e => { e.preventDefault(); App.router.load(this.view.root.getAttribute("href")); }
        this.view.root.classList.remove("loading")
    }

}