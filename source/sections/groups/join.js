import UserTile from "../../components/tiles/usertile";
import Debugger from "../../debugger";
import Section from "../section";
export default class GroupJoinView extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.group = null;
        this.token = null;

        this.view.root.innerHTML = 
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

        this.view.header = {}
        this.view.header.name = this.view.root.querySelector(".event-header .title");
        this.view.header.meta = this.view.root.querySelector(".event-header .meta");

        this.view.join = this.view.root.querySelector(".join")
        this.view.join.onclick = async () => { 
            var r = await App.model.groups.join(this.token);
            if(!r.success){
                TippNotification.error(r.message);
            } else {
                TippNotification.success(Lang.get("section/groups/messages/joined"));
                App.router.forward(this.group.url);
            }
        }

        this.view.memberList = this.view.root.querySelector(".member-list");

        window.addEventListener("datachange",e => {
            if(this._active && this.group != null && e.detail.type == "group" && e.detail.id == this.group.id){
                Debugger.log(this,"Section was updated remotely")()
                this.update();
            }
        });

    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        
        this.token = this._params.id + "-" + this._params.token;
        this.group = await App.model.groups.get(this._params.id);
        if(this.group === null){ return App.router.showError(); }

        if(App.client.groups.includes(parseInt(this._params.id))){ 
            TippNotification.info(Lang.get("section/groups/messages/alreadymember"));
            App.router.forward(this.group.url); 
            return false; 
        }

        await this.update();
    }

    async update(){

        var admin = await App.model.users.get(this.group.admin);

        this.view.header.name.innerText = this.group.name;
        this.view.header.meta.innerText = Lang.get("section/groups/header/by",{name: admin.name})+" / "+ (this.group.users.length == 1 ? Lang.get("section/groups/header/members_single") : Lang.get("section/groups/header/members_multi", {n: this.group.users.length}))

        this.view.memberList.innerHTML = "";

        this.group.getUsers().forEach(p => {
            var g = new UserTile(p)
            this.view.memberList.appendChild(g.getHtml())
        })

    }

}