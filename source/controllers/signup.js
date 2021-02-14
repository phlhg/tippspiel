import Controller from './controller';
import SignUpView from '../views/signup'

export default class SignUp extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(SignUpView);
    }

}