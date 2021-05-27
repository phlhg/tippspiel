import Controller from '../controller';
import TippIndexView from "../../views/tipp";

export default class TippIndex extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(TippIndexView);
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        var t = await App.model.gameTipps.get(this.params.id);
        if(t === null){ return App.router.showError(); }
        this.view.setTipp(t);
    }

    unload(){
        this.view.clear();
    }

}