import Tile from './tile';

export default class EventTile extends Tile {
    
    constructor(promise){
        super("event","a", promise);
        this.init();
    }

    init(){
        this.view.root.classList.add("event-tile")
        this.view.root.classList.add("loading")

        this.view.root.innerHTML = 
        `<span class="icon"><span class="material-icons">emoji_events</span></span>
        <span class="name"></span>
        <span class="meta">${Lang.get("section/event/tile/desc")}</span>`;

        this.view.name = this.view.root.querySelector(".name")
        this.view.meta = this.view.root.querySelector(".meta")
    }

    update(){

        this.view.root.setAttribute("href",this.obj.url);

        this.view.name.innerText = this.obj.name;


        if(
            this.obj.deadline.getTime() == 0 || // Event doesn't allow betting
            this.obj.deadline.getTime() < Date.now() || // Event has passed
            !App.client.active || // Not signed in
            this.obj.hasOwnTipp() // There's already a bet
        ){
            this.view.root.classList.remove("nobet")
        } else {
            this.view.root.classList.add("nobet")
        }

        
        this.view.root.classList.remove("loading")

    }

}