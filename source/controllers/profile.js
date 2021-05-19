import Controller from './controller';
import ProfileView from '../views/profile/index'

export default class Profile extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(ProfileView)
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }
        
        this.view.setClient(App.client);
        
        var tipps = (await Promise.all(App.model.gameTipps.getAll(App.client.gameTipps))).filter(t => t !== null);
        this.view.setGames(App.model.games.getAll(tipps.map(t => t.game)))
    }

}