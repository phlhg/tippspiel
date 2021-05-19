import GroupsIndexView from '../../views/groups';
import Controller from '../controller';

export default class GroupsIndex extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GroupsIndexView);
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        var data = await App.model.groups.getClientGroups();
        data.forEach(group => { if(group !== null){ this.view.addGroup(group) }})
        if(data.length < 1){ this.view.noGroupsFound(); }

    }

    unload(){
        this.view.clear();
    }

}