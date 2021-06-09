import Tile from './tile';

export default class UserTile extends Tile {
    
    constructor(promise){
        super("user","div", promise);
        this.init();
    }

    init(){
        this.view.root.classList.add("user-tile")
        this.view.root.innerHTML = `<span class="icon material-icons">person</span>
        <span class="name"></span>`;
        
        this.view.name = this.view.root.querySelector(".name")
        this.view.points = this.view.root.querySelector(".points")
    }

    async update(){
        if(this.obj.banned){ this.view.root.classList.add("banned") } else { this.view.root.classList.remove("banned") }
        this.view.name.innerText = this.obj.name;
    }

}