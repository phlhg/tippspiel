import GroupsIndexView from '../../views/groups';
import Controller from '../controller';

export default class GroupsIndex extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GroupsIndexView);
    }

}