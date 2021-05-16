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
        if(!App.client.active){ return App.client.prompt() };
        var r = await App.model.events.getRanking(1);
        if(!r.success) return
        App.model.users.getAll(r.data.map(u => u.user)) //preload all users
        
        r.data.forEach(r => {
            var v = this.view.addUser(App.model.users.get(r.user));
            v.setRank(r.rank);
        });
    }

    unload(){
        this.view.clear();
    }

}