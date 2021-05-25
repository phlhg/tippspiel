import TippNotification from "../../helper/notification";
import Section from "../section";

export default class GroupAdvanced extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.group = null;

        this.view.root.innerHTML = 
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

        this.view.header = {}
        this.view.header.name = this.view.root.querySelector(".event-header .title input");
        this.view.header.meta = this.view.root.querySelector(".event-header .meta");

        this.view.inviation = this.view.root.querySelector(".invite");

        this.view.leave = this.view.root.querySelector(".leave");

        this.view.memberList = this.view.root.querySelector(".member-list");

        this.view.header.name.onchange = async e => {
            var r = await this.group.rename(this.view.header.name.value);
            if(!r.success){ TippNotification.error(r.message); }
        }

        this.view.inviation.onclick = async () => {
            if(await TippPrompt.make(Lang.get("section/groups/prompt/newlink/text"), Lang.get("section/groups/prompt/newlink/confirm"), Lang.get("section/groups/prompt/newlink/deny"))){
                var r = await this.group.resetToken(); 
                if(!r.success){ TippNotification.error(r.message); }
                App.router.forward(this.group.url);
            } 
        }

        this.view.leave.onclick = async () => {
            if(await TippPrompt.danger(Lang.get("section/groups/prompt/leave/text"), Lang.get("section/groups/prompt/leave/confirm"), Lang.get("section/groups/prompt/leave/deny"))){
                var r = await this.group.leave();
                if(!r.success){ 
                    TippNotification.error(r.message); 
                } else {
                    TippNotification.create(Lang.get("section/groups/messages/left"), 3000, "logout", "error").show(); 
                    App.router.forward("/groups/");
                }
            }
        }

    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        if(!App.client.groups.includes(parseInt(this._params.id))){ App.router.forward("/groups/"); return false; }

        this.group = await App.model.groups.get(this._params.id);
        if(this.group === null){ return App.router.showError(); }
        await this.update();
    }

    async update(){

        var admin = await App.model.users.get(this.group.admin);

        this.view.inviation.style.display = App.client.id == this.group.admin ? "block" : "none";
        this.view.header.name.readOnly = (App.client.id != this.group.admin)

        this.view.header.name.value = this.group.name;
        this.view.header.meta.innerText = Lang.get("section/groups/header/by",{name: admin.name})+" / "+ (this.group.users.length == 1 ? Lang.get("section/groups/header/members_single") : Lang.get("section/groups/header/members_multi", {n: this.group.users.length}))

    }
    
}