import TippNotification from "../../helper/notification";
import UserTile from "../../components/tiles/usertile";
import Section from "../section";
import Debugger from "../../debugger";

export default class GroupDetail extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.group = null;

        this.view.root.innerHTML = 
        `<div class="tipp-box event-header">
            <span class="icon">
                <span class="material-icons">group</span>
                <span class="image"></span>
            </span>
            <span class="title nowrap"></span>
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

        this.view.header.icon = this.view.root.querySelector(".event-header .icon")
        this.view.header.image = this.view.header.icon.querySelector(".image")

        this.view.invite = this.view.root.querySelector(".invite");
        this.view.inviteMeta = this.view.invite.querySelector(".meta");

        this.view.more = this.view.root.querySelector(".more");

        this.view.invite.onclick = () => {
            App.device.share({
                title: Lang.get("section/groups/share/title"),
                text: Lang.get("section/groups/share/text", { name: this.group.name }),
                url: `${window.location.protocol}//${window.location.hostname}/groups/join/${this.group.token}/`
            })
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

        if(this.group.image == ""){
            this.view.header.icon.classList.remove("img");
            this.view.header.image.style.backgroundImage = ``
        } else {
            this.view.header.icon.classList.add("img");
            this.view.header.image.style.backgroundImage = `url(${this.group.image})`
        }

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

    async unload(){
        this.view.memberList.innerHTML = "";
    }

}