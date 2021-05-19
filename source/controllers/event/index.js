import Controller from '../controller'
import EventIndexView from '../../views/event/index'

export default class EventIndex extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(EventIndexView);
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        var e = await App.model.events.get(this.params.id);
        if(e === null){ return App.router.showError(); }
        this.view.setEvent(e);
    }

    unload(){
        this.view.clear();
    }

}