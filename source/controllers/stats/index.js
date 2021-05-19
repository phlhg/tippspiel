import Controller from '../controller';
import StatsIndexView from "../../views/stats/index";

export default class StatsIndex extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(StatsIndexView);
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        
        var r = await App.model.events.getRanking(1);
        if(!r.success) return

        var counter_all = 1;
        var prev_all = -1;
        var counter_group = 1;
        var prev_group = -1;

        var users = await Promise.all(App.model.users.getAll(r.data.map(u => u.user)));

        users.forEach(u => {

            var v1 = this.view.addUserAll(new Promise(resolve => { resolve(u) }))
            v1.setRank(counter_all);
            if(prev_all == -1){ prev_all = u.points }
            if(prev_all > u.points){ 
                prev_all = u.points
                counter_all++;
            }

            if(u.isInGroup()){
                var v2 = this.view.addUserGroup(new Promise(resolve => { resolve(u) }))
                v2.setRank(counter_group);
                if(prev_group == -1){ prev_group = u.points }
                if(prev_group > u.points){ 
                    prev_group = u.points
                    counter_group++;
                }
            }
        })

    }

    unload(){
        this.view.clear();
    }

}