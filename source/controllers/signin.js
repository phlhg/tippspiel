import Controller from './controller';
import SignInView from '../views/signin'
import State from '../comm/state';

export default class SignIn extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(SignInView);
        this.view.on("submit",async (data) => {
            var r = await this.app.client.singIn(data.token)
            if(r.state != State.SUCCESS){
                this.view.error(Lang.getError(r.error,r.data));
                return false;
            } else {
                this.router.load("/");
                return true;
            }
        })
    }

}