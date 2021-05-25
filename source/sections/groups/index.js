import GroupTile from '../../components/tiles/grouptile';
import Section from '../section'

export default class Groups extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.innerHTML = 
        `<a class="tipp-box createGroup" href="/groups/create/" style="display: none" >
            <span class="icon"><span class="material-icons">group_add</span></span>
            <span class="title">${Lang.get("section/groups/new/title")}</span>
            <span class="meta">${Lang.get("section/groups/new/meta")}</span>
        </a>
        <div class="tipp-box nogroups" style="display: none; border-color: #0061d4; background: #0066de; color: #fff;">
            <span class="icon"><span class="material-icons">info</span></span>
            <span class="title">${Lang.get("section/groups/none/title")}</span>
            <span class="meta">${Lang.get("section/groups/none/meta")}</span>
        </div>
        <div class="groupList"></div>`;
        
        this.view.createGroup = this.view.root.querySelector(".createGroup");
        this.view.noGroups = this.view.root.querySelector(".nogroups")
        this.view.groupList = this.view.root.querySelector(".groupList")
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        var groups = await App.model.groups.getClientGroups();
        groups.forEach(group => { 
            this.view.groupList.appendChild(new GroupTile(group).getHtml())
        })

        this.view.noGroups.style.display = groups.length < 1 ? "block" : "none";
        this.view.createGroup.style.display = App.client.permission.groupCreate ? "block" : "none";

    }

    async unload(){
        this.view.groupList.innerHTML = "";
    }

}
