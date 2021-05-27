import Tile from './tile';

export default class GroupTile extends Tile {
    
    constructor(promise){
        super("group","div", promise);
        this.init();
    }

    init(){
        this.view.root.classList.add("group-tile")
        this.view.root.classList.add("loading")

        this.view.root.innerHTML = `<a href=""></a>
        <span class="icon"><span class="material-icons">groups</span></span>
        <span class="name"></span>
        <span class="meta"></span>
        <label>
            <input type="checkbox" />
            <span class="indicator">
                <span class="material-icons">visibility</span>
                <span class="material-icons">visibility_off</span>
            </span>
        </label>`;

        this.view.name = this.view.root.querySelector(".name")
        this.view.meta = this.view.root.querySelector(".meta")
        this.view.link = this.view.root.querySelector("a")
        this.view.checkbox = this.view.root.querySelector("input");

        this.view.checkbox.onchange = () => {
            if(this.view.checkbox.checked){
                this.obj.activate()
            } else {
                this.obj.disable()
            }
        }
    }

    update(){

        this.view.link.setAttribute("href",this.obj.url);

        this.view.name.innerText = this.obj.name;
        this.view.meta.innerText = (this.obj.users.length == 1 ? Lang.get("section/groups/header/members_single") : Lang.get("section/groups/header/members_multi", {n: this.obj.users.length}))

        this.view.checkbox.checked = App.client.isGroupActive(this.obj.id);

        this.view.root.classList.remove("loading")

    }

}