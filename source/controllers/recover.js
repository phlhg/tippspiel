import Controller from './controller';
import RecoverView from '../views/recover';

export default class Recover extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(RecoverView);
        
        this.view.on("submit",async data => {
            var r = await App.client.recoverToken(data.email);
            if(!r.success){
                this.view.form.error(r.message);
                return false;
            } else {
                App.router.load("/signin/");
                return true;
            }
        })
        
    }

    load(){
        if(!App.promptConnection()){ return false; }
    }

}