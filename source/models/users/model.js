import Manager from '../model'
import User from './user.js'

/** Users Model */
export default class Users extends Manager {

    constructor(){
        super(User)
    }

    async load(ids){
        ids = this.missing(ids);
        if(ids.length > 0 && App.socket.state == SocketState.OPEN){
            var r = await App.socket.exec("get_data", { table: "User", ids: ids })
            if(r.state != ResponseState.SUCCESS){
                if(r.error != 0){
                    Debugger.warn(this,Lang.getError(r.error,r.data))()
                } else {
                    Debugger.warn(this,r.data.info)()
                }
            } else {
                if(r.data != ""){
                    r.data.forEach(user => {
                        if(user != ""){
                            this.list[user.id] = new User(user)
                        }
                    })
                }
            }
        }
    }

}