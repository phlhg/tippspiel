import Controller from './controller';
import SignUpView from '../views/signup'

export default class SignUp extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(SignUpView);
        this.view.on("submit",async (data) => {
            var r = await App.client.singUp(data.name, data.email)
            if(!r.success){
                this.view.form.error(r.message);
                return false;
            } else {
                App.router.load(window.location.pathname);
                return true;
            }
        })
    }

}