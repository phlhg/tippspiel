import TippNotification from '../../helper/notification';
import GroupJoinView from '../../views/groups/join';
import Controller from '../controller'

export default class GroupJoin extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GroupJoinView);
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        
        var token = this.params.id + "-" + this.params.token;
        var g = await App.model.groups.get(this.params.id);
        if(g === null){ return App.router.showError(); }

        if(App.client.groups.includes(parseInt(this.params.id))){ 
            TippNotification.info(Lang.get("section/groups/messages/alreadymember"));
            App.router.forward(g.url); 
            return false; 
        }

        this.view.on("join", async () => {
            var r = await App.model.groups.join(token);
            if(!r.success){
                TippNotification.error(r.message);
            } else {
                TippNotification.success(Lang.get("section/groups/messages/joined"));
                App.router.forward(g.url);
            }
        })

        this.view.setGroup(g);
    }

    unload(){
        this.view.clear();
    }

}