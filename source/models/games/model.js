import { GamePhase, GameStatus } from './enums';
import Model from '../model'
import Game from './game'
import Debugger from '../../debugger';

/** Games model */
export default class Games extends Model {

    /** Creates a game model */
    constructor(){
        super(Game)
    }

    async getHot(){
        var r = await App.socket.exec("hotGames", {})
        if(r.state != ResponseState.SUCCESS){
            if(r.error != 0){
                Debugger.warn(this,Lang.getError(r.error,r.data))()
            } else if(r.data.hasOwnProperty("info")) {
                Debugger.warn(this,r.data.info)()
            } else {
                Debugger.warn(this,`Unbekannter Fehler beim Laden von "getHot":`, r)()
            }
            return {
                upcoming: [],
                over: []
            };
        } else {
            // To get all games together
            this.getAll(Array.from(r.data.upcoming).concat(Array.from(r.data.over)).map(i => parseInt(i)));
            return {
                upcoming: this.getAll(Array.from(r.data.upcoming).map(i => parseInt(i))),
                over: this.getAll(Array.from(r.data.over).map(i => parseInt(i)))
            }
        }
    }

}