import Controller from './controller';
import SignInView from '../views/signin'

export default class SignIn extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(SignInView);
        this.view.on("submit",(data) => {
            console.log(data);
            this.view.error("Anmeldung zurzeit nicht möglich");
            return false;
        })
    }

}