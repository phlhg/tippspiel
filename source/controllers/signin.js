import Controller from './controller';
import SignInView from '../views/signin'

export default class SignIn extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(SignInView);
    }

}