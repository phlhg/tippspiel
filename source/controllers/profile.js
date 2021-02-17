import Controller from './controller';
import ProfileView from '../views/profile'

export default class Profile extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(ProfileView)
    }

    load(){
        if(!App.client.active){ return App.client.prompt() };
        this.view.setClient(App.client);
    }

}