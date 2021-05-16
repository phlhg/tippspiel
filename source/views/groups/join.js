import Notification from "../../helper/notification";
import UserTile from "../components/usertile";
import View from "../view";

export default class GroupJoinView extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = 
        `<div class="tipp-box event-header">
            <span class="icon"><span class="material-icons">group</span></span>
            <span class="title"></span>
            <span class="meta"></span>
        </div>
        <div class="tipp-box join" style="cursor: pointer; background: #00b50c; border-color: #00b00c; color: #fff;">
            <span class="icon"><span class="material-icons">login</span></span>
            <span class="title">${Lang.get("section/groups/join")}</span>
        </div>
        <h3>Mitglieder</h3>
        <div class="member-list"></div>`

        this.header = {}
        this.header.name = this.root.querySelector(".event-header .title");
        this.header.meta = this.root.querySelector(".event-header .meta");

        this.join = this.root.querySelector(".join")
        this.join.onclick = async () => { await this.event("join",{}) }

        this.memberList = this.root.querySelector(".member-list");

    }

    setGroup(group){
        this.group = group;
        this.update();
    }

    async update(){

        var admin = await App.model.users.get(this.group.admin);

        this.header.name.innerText = this.group.name;
        this.header.meta.innerText = Lang.get("section/groups/header/by",{name: admin.name})+" / "+ (this.group.users.length == 1 ? Lang.get("section/groups/header/members_single") : Lang.get("section/groups/header/members_multi", {n: this.group.users.length}))

        this.memberList.innerHTML = "";

        this.group.getUsers().forEach(p => {
            var g = new UserTile(p)
            this.memberList.appendChild(g.getHtml())
        })

    }

    clear(){
        
    }

}