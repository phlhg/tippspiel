import RankTile from '../components/ranktile'
import View from '../view'

export default class TippIndexView extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `
            <div class="tipp-radio-select">
                    <input type="radio" id="statsview_all" name="statsviewtype" required checked="" />
                    <label for="statsview_all">${Lang.get("section/stats/tabs/all")}</label>
                    <input type="radio" id="statsview_groups" name="statsviewtype" />
                    <label for="statsview_groups">${Lang.get("section/stats/tabs/groups")}</label>
                </div>
            <div class="rank-list rank rank_all"></div>
            <div class="rank-list rank rank_group" style="display: none" ></div>`


        this.radio = {}
        this.radio.all = this.root.querySelector("#statsview_all")
        this.radio.group = this.root.querySelector("#statsview_groups")

        this.list_all = this.root.querySelector(".rank_all");
        this.list_group = this.root.querySelector(".rank_group");

        [this.radio.all, this.radio.group].forEach(i => {
            i.onchange = e => {
                if(this.radio.all.checked){
                    this.list_all.style.display = "block";
                    this.list_group.style.display = "none";
                } else {
                    this.list_all.style.display = "none";
                    this.list_group.style.display = "block";
                }
            }
        })

    }

    addUserAll(u){
        var u = new RankTile(u);
        this.list_all.appendChild(u.getHtml());
        return u;
    }

    addUserGroup(u){
        var u = new RankTile(u);
        this.list_group.appendChild(u.getHtml());
        return u;
    }

    clear(){
        this.radio.all.checked = true;
        this.list_group.style.display = "none";
        this.list_all.innerHTML = ``
        this.list_group.innerHTML = ``
    }

}