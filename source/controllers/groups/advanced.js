import GroupAdvancedView from '../../views/groups/advanced';
import Controller from '../controller'

export default class GroupAdvanced extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GroupAdvancedView);
    }

    async load(){
        if(!App.client.active){ return App.client.prompt() };
        if(!App.client.groups.includes(parseInt(this.params.id))){ App.router.forward("/groups/"); return false; }

        var g = await App.model.groups.get(this.params.id);
        this.view.setGroup(g);

        this.view.on("resettoken", async () => {
            var r = await g.resetToken(); 
            if(!r.success){ Notification.error(r.message); }
            App.router.forward(g.url);
        })


        this.view.on("rename", async data => {
            var r = await g.rename(data.name);
            if(!r.success){ Notification.error(r.message); }
        })

        this.view.on("leave", async () => {
            var r = await g.leave();
            if(!r.success){ 
                Notification.error(r.message); 
            } else {
                Notification.info(Lang.get("section/group/messages/left")); 
                App.router.forward("/groups/");
            }
        })
    }

    unload(){
        this.view.clear();
    }

}