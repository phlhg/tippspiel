import Manager from '../model'
import Team from './team'

/** Teams Model */
export default class Teams extends Manager {

    constructor(){
        super(Team)
    }

    async load(ids){
        ids = this.missing(ids);
        if(ids.length > 0 && App.socket.state == SocketState.OPEN){
            var r = await App.socket.exec("get_data", { table: "Team", ids: ids })
            if(r.state != ResponseState.SUCCESS){
                if(r.error != 0){
                    Debugger.warn(this,Lang.getError(r.error,r.data))()
                } else {
                    Debugger.warn(this,r.data.info)()
                }
            } else {
                if(r.data != ""){
                    r.data.forEach(d => {
                        if(d != ""){
                            this.list[d.id] = new Team(d)
                        }
                    })
                }
            }
        }
    }

}