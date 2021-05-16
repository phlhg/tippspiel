import Controller from './controller';
import SignInView from '../views/signin'
import Notification from '../helper/notification';

export default class SignIn extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(SignInView);
        
        this.view.on("submit",(data) => {
            this.signIn(data.token);
        })

    }

    async signIn(token){
        var r = await App.client.singIn(token)
        if(!r.success){
            this.view.form.error(r.message);
            return false;
        } else {
            (Notification.create("You're now logged in", 3000, "login")).show();
            App.router.load(window.location.pathname);
            return true;
        }
    }

    load(){
        if(this.params.hasOwnProperty("token")){
            this.view.token.value = this.params["token"];
            this.signIn(this.params["token"]);
        }
    }

}