import GroupTile from '../components/grouptile';
import View from '../view'

export default class GroupsIndexView extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = 
        `
        <div class="tipp-box nogroups" style="display: none; border-color: #0061d4; background: #0066de; color: #fff;">
            <span class="icon"><span class="material-icons">info</span></span>
            <span class="title">${Lang.get("section/groups/none/title")}</span>
            <span class="meta">${Lang.get("section/groups/none/meta")}</span>
        </div>
        <a class="tipp-box createGroup" href="/groups/create/" style="display: none" >
            <span class="icon"><span class="material-icons">group_add</span></span>
            <span class="title">${Lang.get("section/groups/new/title")}</span>
            <span class="meta">${Lang.get("section/groups/new/meta")}</span>
        </a>
        <div class="groupList"></div>`;
        
        this.createGroup = this.root.querySelector(".createGroup");
        this.noGroups = this.root.querySelector(".nogroups")
        this.groupList = this.root.querySelector(".groupList")
    }

    show(){
        this.createGroup.style.display = App.client.permission.groupCreate ? "block" : "none";
    }

    addGroup(group){
        this.noGroups.style.display = "none";
        var g = new GroupTile(group);
        this.groupList.appendChild(g.getHtml())
    }

    noGroupsFound(){
        this.noGroups.style.display = "block";
    }

    clear(){
        this.groupList.innerHTML = "";
    }

}
