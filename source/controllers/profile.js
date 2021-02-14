import Controller from './controller';

export default class Profile extends Controller {

    constructor(...args){
        super(...args);
    }

    load(){
        this.router.forward("/signup/");
    }

}