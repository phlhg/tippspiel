import Controller from './controller';
import ConsoleView from '../views/console'
import State from '../comm/state'

export default class Console extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(ConsoleView)

        this.view.on("submit",async (data) => {
            this.view.addCommand(data.value);
            if(this.app.socket.state != H2RFP_SocketState_OPEN){ 
                this.view.addError("Nicht mit dem Server verbunden"); 
                return true 
            }
            var r = await this.app.socket.exec("console",{ cmd: data.value })
            console.log(r);
            if(r.state != State.SUCCESS){
                this.view.addError(Lang.getError(r.error,r.data));
                return true;
            } else {
                this.view.addOutput(r.data.text);
                return true;
            }
        })
    }

    load(){
        if(!this.app.client.active){ return this.app.client.prompt() };
        if(!(this.app.client.permission.console == true)){ this.router.forward("/"); return false; }
    }

}