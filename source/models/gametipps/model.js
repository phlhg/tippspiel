import Manager from '../model'
import GameTipp from './gametipp'
import Debugger from '../../debugger';

/** Users Model */
export default class GameTipps extends Manager {

    constructor(){
        super(GameTipp)
    }

    async makeTipp(data){

        var r = await App.socket.exec("makeTipp", { 
            game: data.id,
            bet1: data.bet1,
            bet2: data.bet2,
            winner: data.winner,
            topscorer: data.topscorer
        })

        if(r.state != ResponseState.SUCCESS){
            if(r.error != 0){
                Debugger.warn(this,Lang.getError(r.error,r.data))()
            } else if(r.data.hasOwnProperty("info")) {
                Debugger.warn(this,r.data.info)()
            } else {
                Debugger.warn(this,`Unbekannter Fehler beim Laden von ${this.type.name}[${ids.join(",")}] :`, r)()
            }
            return false;
        } else {
            await this.update([r.data.id]);
            return true;
        }
    }

}