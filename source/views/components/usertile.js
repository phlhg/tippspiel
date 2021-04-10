import Component from './component'

export default class USerTile extends Component {
    
    constructor(promise){
        super("User","div");
        this.init();
        promise.then(tipp => {
            this.set(tipp)
        },e => {
            this.remove();
        })
    }

    init(){
        this.view.root.classList.add("user-tile")
        this.view.root.innerHTML = `<span class="icon"></span>
        <span class="name"></span>
        <span class="meta"></span>
        <span class="rank"></span>`;
        
        this.view.icon = this.view.root.querySelector(".icon")
        this.view.name = this.view.root.querySelector(".name")
        this.view.meta = this.view.root.querySelector(".meta")
        this.view.rank = this.view.root.querySelector(".rank")
    }

    async update(){

        this.view.name.innerText = this.obj.name;
        this.view.icon.innerText = this.obj.short;
        this.view.meta.innerText = this.obj.points == 1 ? `+1 Punkt` : `+${this.obj.points} Punkte`;

    }

    setRank(r){
        this.view.rank.innerText = `${r}.`
    }

}