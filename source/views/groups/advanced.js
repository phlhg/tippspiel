import View from "../view";

export default class GroupAdvancedView extends View {

    constructor(...args){
        super(...args)
        this._func = () => {}
    }

    init(){
        this.root.innerHTML = 
        `<div class="tipp-box event-header">
            <span class="icon"><span class="material-icons">group</span></span>
            <span class="title"><input class="inline" type="text"></input></span>
            <span class="meta"></span>
        </div>
        <a class="tipp-box invite">
            <span class="icon"><span class="material-icons">link</span></span>
            <span class="title">${Lang.get("section/groups/invitation/newlink")}</span>
            <span class="meta">${Lang.get("section/groups/invitation/newlinkmeta")}</span>
        </a>
        <a class="tipp-box leave" style="color: #fff; background: #f00; border-color: #e00;">
            <span class="icon"><span class="material-icons">logout</span></span>
            <span class="title">${Lang.get("section/groups/leave")}</span>
        </a>`

        this.header = {}
        this.header.name = this.root.querySelector(".event-header .title input");
        this.header.meta = this.root.querySelector(".event-header .meta");

        this.inviation = this.root.querySelector(".invite");

        this.leave = this.root.querySelector(".leave");

        this.memberList = this.root.querySelector(".member-list");

        this.header.name.onchange = async e => {
            await this.event("rename",{ name: this.header.name.value })
        }

        this.inviation.onclick = async () => { 
            await this.event("resettoken", {});
        }

        this.leave.onclick = async () => {
            await this.event("leave", {});
        }

    }

    setGroup(group){
        this.group = group;
        this.update();
    }

    async update(){

        var admin = await App.model.users.get(this.group.admin);

        this.inviation.style.display = App.client.id == this.group.admin ? "block" : "none";
        this.header.name.readOnly = (App.client.id != this.group.admin)

        this.header.name.value = this.group.name;
        this.header.meta.innerText = Lang.get("section/groups/header/by",{name: admin.name})+" / "+ (this.group.users.length == 1 ? Lang.get("section/groups/header/members_single") : Lang.get("section/groups/header/members_multi", {n: this.group.users.length}))


    }

    clear(){
        
    }

}