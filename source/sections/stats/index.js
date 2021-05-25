import Section from '../section'
import RankTile from '../../components/tiles/ranktile'

export default class Stats extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.innerHTML = `
            <div class="tipp-radio-select">
                <input type="radio" id="statsview_all" name="statsviewtype" required checked="" />
                <label for="statsview_all">${Lang.get("section/stats/tabs/all")}</label>
                <input type="radio" id="statsview_groups" name="statsviewtype" />
                <label for="statsview_groups">${Lang.get("section/stats/tabs/groups")}</label>
            </div>
            <div class="rank-list rank rank_all"></div>
            <div class="rank-list rank rank_group" style="display: none" ></div>
            <a href="/groups/" class="tipp-box nogroups" style="display: none; border-color: #0061d4; background: #0066de; color: #fff;">
                <span class="icon"><span class="material-icons">info</span></span>
                <span class="title">${Lang.get("section/stats/nogroups/title")}</span>
                <span class="meta">${Lang.get("section/stats/nogroups/meta")}</span>
            </a>`

        this.view.radio = {}
        this.view.radio.all = this.view.root.querySelector("#statsview_all")
        this.view.radio.group = this.view.root.querySelector("#statsview_groups")

        this.view.list_all = this.view.root.querySelector(".rank_all");
        this.view.list_group = this.view.root.querySelector(".rank_group");

        this.view.emptyListInfo = this.view.root.querySelector(".tipp-box");

        [this.view.radio.all, this.view.radio.group].forEach(i => {
            i.onchange = e => {
                if(this.view.radio.all.checked){
                    this.view.list_all.style.display = "block";
                    this.view.list_group.style.display = "none";
                    this.view.emptyListInfo.style.display = "none";
                } else {
                    this.view.list_all.style.display = "none";
                    this.view.list_group.style.display = "block";
                    this.view.emptyListInfo.style.display = this.view.list_group.innerHTML.trim() == "" ? "block" : "none";
                }
            }
        })

    }

    async load(){

        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        
        var r = await App.model.events.getRanking(2);
        if(!r.success){ return App.router.showError(); }

        var counter_all = 1;
        var prev_all = -1;
        var counter_group = 1;
        var prev_group = -1;

        var users = (await Promise.all(App.model.users.getAll(r.data.map(u => u.user)))).filter(u => u !== null)

        users.forEach(u => {

            // Global
            var v1 = new RankTile(new Promise(r => { r(u) }))
            this.view.list_all.appendChild(v1.getHtml());
            if(prev_all == -1){ prev_all = u.points }
            if(prev_all > u.points){ 
                prev_all = u.points
                counter_all++;
            }
            v1.setRank(counter_all);

            // Group
            if(u.isInGroup()){
                var v2 = new RankTile(new Promise(r => { r(u) }))
                this.view.list_group.appendChild(v2.getHtml());
                if(prev_group == -1){ prev_group = u.points }
                if(prev_group > u.points){ 
                    prev_group = u.points
                    counter_group++;
                }
                v2.setRank(counter_group);
            }
        })

    }

    unload(){
        this.view.radio.all.checked = true;
        this.view.list_all.style.display = "block";
        this.view.list_group.style.display = "none";
        this.view.emptyListInfo.style.display = "none";
        this.view.list_all.innerHTML = ``
        this.view.list_group.innerHTML = ``
    }

}