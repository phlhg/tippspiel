import Controller from './controller';
import SignUpView from '../views/signup'
import State from '../comm/state';

export default class SignUp extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(SignUpView);
        this.view.on("submit",async (data) => {
            var r = await this.app.client.singUp(data.name, data.email)
            console.log(r);
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