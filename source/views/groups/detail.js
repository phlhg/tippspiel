import Notification from "../../helper/notification";
import UserTile from "../components/usertile";
import View from "../view";

export default class GroupDetailView extends View {

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

        this.header = {}
        this.header.name = this.root.querySelector(".event-header .title");
        this.header.meta = this.root.querySelector(".event-header .meta");

        this.invite = this.root.querySelector(".invite");
        this.inviteMeta = this.invite.querySelector(".meta");

        this.more = this.root.querySelector(".more");

        this.invite.onclick = () => {
            var input = document.createElement("input");
            input.value = `https://tipp.phlhg.ch/groups/join/${this.group.token}/`;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            input.remove();
            Notification.success(Lang.get("section/groups/messages/invitation_copied"));
        }

        this.memberList = this.root.querySelector(".member-list");

    }

    setGroup(group){
        this.group = group;
        this.update();
    }

    async update(){

        var admin = await App.model.users.get(this.group.admin);

        this.invite.style.display = App.client.id == this.group.admin ? "block" : "none";

        this.header.name.innerText = this.group.name;
        this.header.meta.innerText = Lang.get("section/groups/header/by",{name: admin.name})+" / "+ (this.group.users.length == 1 ? Lang.get("section/groups/header/members_single") : Lang.get("section/groups/header/members_multi", {n: this.group.users.length}))

        this.inviteMeta.innerText = `https://tipp.phlhg.ch/groups/join/${this.group.token}/`;

        this.memberList.innerHTML = "";

        this.more.setAttribute("href",this.group.url2);

        this.group.getUsers().forEach(p => {
            var g = new UserTile(p)
            this.memberList.appendChild(g.getHtml())
        })

    }

    clear(){
        
    }

}