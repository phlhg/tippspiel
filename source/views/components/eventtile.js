import Component from './component'

export default class EventTile extends Component {
    
    constructor(promise){
        super("event","a");
        this.init();
        promise.then(event => {
            this.set(event)
        },e => {
            this.remove();
        })
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
        this.view.root.classList.remove("loading")

    }

}