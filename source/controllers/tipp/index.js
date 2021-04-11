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
        var t = await App.model.gameTipps.get(this.params.id);
        this.view.setTipp(t);
    }

    unload(){
        this.view.clear();
    }

}