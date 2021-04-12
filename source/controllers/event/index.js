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
        var e = await App.model.events.get(this.params.id);
        this.view.setEvent(e);
    }

    unload(){
        this.view.clear();
    }

}