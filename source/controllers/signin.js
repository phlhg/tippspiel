import Controller from './controller';
import SignInView from '../views/signin'
import State from '../../www/js/enum';

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
        if(r.state != ResponseState.SUCCESS){
            this.view.error(Lang.getError(r.error,r.data));
            return false;
        } else {
            App.router.load("/");
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