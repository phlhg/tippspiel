import Controller from './controller';
import SignInView from '../views/signin'
import State from '../../www/js/enum';

export default class SignIn extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(SignInView);
        this.view.on("submit",async (data) => {
            var r = await App.client.singIn(data.token)
            if(r.state != ResponseState.SUCCESS){
                this.view.error(Lang.getError(r.error,r.data));
                return false;
            } else {
                App.router.load("/");
                return true;
            }
        })
    }

}