import Notification from '../../helper/notification';
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
        if(!App.client.active){ return App.client.prompt() };
        
        var token = this.params.id + "-" + this.params.token;
        var g = await App.model.groups.get(this.params.id);

        if(App.client.groups.includes(parseInt(this.params.id))){ 
            Notification.info(Lang.get("section/groups/messages/alreadymember"));
            App.router.forward(g.url); 
            return false; 
        }

        this.view.on("join", async () => {
            var r = await App.model.groups.join(token);
            if(!r.success){
                Notification.error(r.message);
            } else {
                Notification.success(Lang.get("section/groups/messages/joined"));
                App.router.forward(g.url);
            }
        })

        this.view.setGroup(g);
    }

    unload(){
        this.view.clear();
    }

}