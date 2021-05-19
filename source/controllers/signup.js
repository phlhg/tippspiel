import Controller from './controller';
import SignUpView from '../views/signup'
import TippNotification from '../helper/notification';

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
                TippNotification.success(Lang.get("notifications/postSignUp"),8000);
                App.router.load(window.location.pathname);
                return true;
            }
        })
    }

    load(){
        if(!App.promptConnection()){ return false; }
    }

}