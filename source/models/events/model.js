import Manager from '../model'
import Event from './event'

/** Users Model */
export default class Events extends Manager {

    constructor(){
        super(Event)
    }

    async getRanking(id){
        var r = await App.socket.exec("ranking",{ event: id });

        if(r.state != ResponseState.SUCCESS){
            if(r.error != 0){
                Debugger.warn(this,Lang.getError(r.error,r.data))()
            } else if(r.data.hasOwnProperty("info")) {
                Debugger.warn(this,r.data.info)()
            } else {
                Debugger.warn(this,`Unbekannter Fehler beim Laden des Rankings:`, r)()
            }
            return [];
        } else {
            return r.data.map(u => {
                return {
                    user: parseInt(u.user),
                    points: parseInt(u.points)
                }
            });
        }
    }

}