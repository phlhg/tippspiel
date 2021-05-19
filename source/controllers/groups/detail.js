import GroupDetailView from '../../views/groups/detail';
import Controller from '../controller'

export default class GroupDetail extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GroupDetailView);
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        if(!App.client.groups.includes(parseInt(this.params.id))){ App.router.forward("/groups/"); return false; }
        
        var e = await App.model.groups.get(this.params.id);
        this.view.setGroup(e);
    }

    unload(){
        this.view.clear();
    }

}