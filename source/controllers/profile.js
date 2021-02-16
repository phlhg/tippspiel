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
        if(!this.app.client.active){ return this.app.client.prompt() };
        this.view.setClient(this.app.client);
    }

}