import TippNotification from '../../helper/notification';
import TippPrompt from '../../helper/prompt';
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
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        if(!App.client.groups.includes(parseInt(this.params.id))){ App.router.forward("/groups/"); return false; }

        var g = await App.model.groups.get(this.params.id);
        if(g === null){ return App.router.showError(); }
        this.view.setGroup(g);

        this.view.on("resettoken", async () => {
            if(await TippPrompt.make(Lang.get("section/groups/prompt/newlink/text"), Lang.get("section/groups/prompt/newlink/confirm"), Lang.get("section/groups/prompt/newlink/deny"))){
                var r = await g.resetToken(); 
                if(!r.success){ TippNotification.error(r.message); }
                App.router.forward(g.url);
            }
        })


        this.view.on("rename", async data => {
            var r = await g.rename(data.name);
            if(!r.success){ TippNotification.error(r.message); }
        })

        this.view.on("leave", async () => {
            if(await TippPrompt.danger(Lang.get("section/groups/prompt/leave/text"), Lang.get("section/groups/prompt/leave/confirm"), Lang.get("section/groups/prompt/leave/deny"))){
                var r = await g.leave();
                if(!r.success){ 
                    TippNotification.error(r.message); 
                } else {
                    TippNotification.create(Lang.get("section/groups/messages/left"), 3000, "logout", "error").show(); 
                    App.router.forward("/groups/");
                }
            }
        })
    }

    unload(){
        this.view.clear();
    }

}