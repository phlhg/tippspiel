import Manager from '../model'
import Player from './player'

/** Users Model */
export default class Players extends Manager {

    constructor(){
        super(Player)
    }

    async getSuggested(game){
        var r = await App.socket.exec("suggest_players", { game: game })
        if(r.state != ResponseState.SUCCESS){
            if(r.error != 0){
                Debugger.warn(this,Lang.getError(r.error,r.data))()
            } else if(r.data.hasOwnProperty("info")) {
                Debugger.warn(this,r.data.info)()
            } else {
                Debugger.warn(this,`Unbekannter Fehler beim Laden von ${this.type.name}[${ids.join(",")}] :`, r)()
            }
            return [];
        } else {
            return this.getAll(Array.from(r.data).map(i => parseInt(i)));
        }
    }

}