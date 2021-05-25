import TippNotification from "../../helper/notification";
import UserTile from "../../components/tiles/usertile";
import Section from "../section";

export default class GroupDetail extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.group = null;

        this.view.root.innerHTML = 
        `<div class="tipp-box event-header">
            <span class="icon"><span class="material-icons">group</span></span>
            <span class="title"></span>
            <span class="meta"></span>
        </div>
        <a class="tipp-box invite" style="display: none;">
            <span class="icon"><span class="material-icons">content_copy</span></span>
            <span class="title">${Lang.get("section/groups/invitation/link")}</span>
            <span class="meta" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" >https://tipp.phlhg.ch/groups/join/token/</span>
        </a>
        <a class="tipp-box more" href="">
            <span class="icon"><span class="material-icons">more_vert</span></span>
            <span class="title">${Lang.get("section/groups/more/title")}</span>
            <span class="meta">${Lang.get("section/groups/more/meta")}</span>
        </a>
        <h3>${Lang.get("section/groups/members")}</h3>
        <div class="member-list"></div>`

        this.view.header = {}
        this.view.header.name = this.view.root.querySelector(".event-header .title");
        this.view.header.meta = this.view.root.querySelector(".event-header .meta");

        this.view.invite = this.view.root.querySelector(".invite");
        this.view.inviteMeta = this.view.invite.querySelector(".meta");

        this.view.more = this.view.root.querySelector(".more");

        this.view.invite.onclick = () => {
            var input = document.createElement("input");
            input.value = `https://tipp.phlhg.ch/groups/join/${this.group.token}/`;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            input.remove();
            TippNotification.success(Lang.get("section/groups/messages/invitation_copied"));
        }

        this.view.memberList = this.view.root.querySelector(".member-list");

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

        // Admin
        var admin = await App.model.users.get(this.group.admin);
        this.view.invite.style.display = App.client.id == this.group.admin ? "block" : "none";

        // Heaer
        this.view.header.name.innerText = this.group.name;
        this.view.header.meta.innerText = Lang.get("section/groups/header/by",{name: admin.name})+" / "+ (this.group.users.length == 1 ? Lang.get("section/groups/header/members_single") : Lang.get("section/groups/header/members_multi", {n: this.group.users.length}))

        // Invitation
        this.view.inviteMeta.innerText = `https://tipp.phlhg.ch/groups/join/${this.group.token}/`;

        // More
        this.view.more.setAttribute("href",this.group.url2);

        // Members
        this.view.memberList.innerHTML = "";
        this.group.getUsers().forEach(p => {
            this.view.memberList.appendChild(new UserTile(p).getHtml())
        })

    }

}