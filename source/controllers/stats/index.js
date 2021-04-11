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
        var ranking = await App.model.events.getRanking(1);
        var users = ranking.map(u => u.user);
        var i = 1;
        App.model.users.getAll(users).forEach(promise => {
            var v = this.view.addUser(promise);
            v.setRank(i);
            i++;
        });
    }

    unload(){
        this.view.clear();
    }

}