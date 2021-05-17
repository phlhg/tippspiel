import Notification from '../../helper/notification';
import GroupCreateView from '../../views/groups/create';
import Controller from '../controller'

export default class GroupCreate extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GroupCreateView);

        this.view.on("submit",async data => {
            var r = await App.model.groups.create(data.name);
            if(!r.success){
                this.view.form.error(r.message);
            } else {
                Notification.success(Lang.get("section/groups/messages/created"));
                var g = await App.model.groups.get(parseInt(r.data.id));
                App.router.forward(g.url);
            }
        })
    }

    async load(){
        if(!App.client.active){ return App.client.prompt() };
    }

    unload(){
        this.view.clear();
    }

}