import Section from '../section'
import RankTile from '../../components/tiles/ranktile'

export default class Stats extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        this.group_counter = 0;

        this.view.root.innerHTML = `
            <div class="tipp-radio-select">
                <input type="radio" id="statsview_all" name="statsviewtype" required checked="" />
                <label for="statsview_all">${Lang.get("section/stats/tabs/all")}</label>
                <input type="radio" id="statsview_groups" name="statsviewtype" />
                <label for="statsview_groups">${Lang.get("section/stats/tabs/groups")}</label>
            </div>
            <div class="rank-list rank rank_all"></div>
            <div class="rank-list rank rank_group" style="display: none" ></div>`

        this.view.radio = {}
        this.view.radio.all = this.view.root.querySelector("#statsview_all")
        this.view.radio.group = this.view.root.querySelector("#statsview_groups")

        this.view.list_all = this.view.root.querySelector(".rank_all");
        this.view.list_group = this.view.root.querySelector(".rank_group");

        [this.view.radio.all, this.view.radio.group].forEach(i => {
            i.onchange = e => {
                if(this.view.radio.all.checked){
                    this.view.list_all.style.display = "block";
                    this.view.list_group.style.display = "none";
                } else {
                    this.view.list_all.style.display = "none";
                    this.view.list_group.style.display = "block";
                }
            }
        })

        App.socket.listen("RankUpdate", () => { 
            if(this._active){
                Debugger.log(this,"Section was updated remotely")()
                this.update() 
            }
        })

    }

    async load(){

        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        await this.update()

    }

    async update(){
        
        var r = await App.model.events.getRanking(1);
        if(!r.success){ return App.router.showError(); }

        this.view.list_all.innerHTML = ``
        this.view.list_group.innerHTML = ``
        this.group_counter = 0;

        var counter_group = 1;
        var prev_group = -1;

        var my1 = new RankTile(App.model.users.get(App.client.id))
        this.view.list_all.appendChild(my1.getHtml());
        this.view.list_all.appendChild(document.createElement("br"))

        var my2 = new RankTile(App.model.users.get(App.client.id))
        this.view.list_group.appendChild(my2.getHtml());
        this.view.list_group.appendChild(document.createElement("br"))

        var myentry = r.data.find(e => e.user == App.client.id)

        if(myentry == undefined){
            my1.setRank("-");
            my1.setPoints(0)
            my2.setRank("-");
            my2.setPoints(0)
        } else {
            my1.setRank(myentry.rank);
            my1.setPoints(myentry.points)
            my2.setRank("-");
            my2.setPoints(myentry.points)
        }

        (await Promise.all(App.model.users.getAll(r.data.map(u => u.user))))

        r.data.forEach(async entry => {

            var user = await App.model.users.get(entry.user);

            // Global
            var v1 = new RankTile(new Promise(r => { r(user) }))
            this.view.list_all.appendChild(v1.getHtml());
            v1.setRank(entry.rank);
            v1.setPoints(entry.points)

            // Group
            if(user.isInGroup()){
                var v2 = new RankTile(new Promise(r => { r(user) }))
                this.view.list_group.appendChild(v2.getHtml());
                if(prev_group == -1){ prev_group = entry.points }
                if(prev_group > entry.points){ 
                    prev_group = entry.points
                    counter_group++;
                }
                if(user.id == App.client.id && myentry !== undefined){ my2.setRank(counter_group) }
                v2.setRank(counter_group);
                v2.setPoints(entry.points)
                this.group_counter++;
            }
        })

    }

    unload(){
        this.view.radio.all.checked = true;
        this.view.list_all.style.display = "block";
        this.view.list_group.style.display = "none";
        this.view.list_all.innerHTML = ``
        this.view.list_group.innerHTML = ``
    }

}