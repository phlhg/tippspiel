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
    
    /**
     * Loads missing elements from server
     * @param {number[]} ids - List of ids
     */
    async load(ids){
        ids = this.missing(ids);
        if(ids.length > 0 && App.socket.state == SocketState.OPEN){
            var r = await App.socket.exec("get_data", { table: "games", ids: ids })
            if(r.state != ResponseState.SUCCESS){
                if(r.error != 0){
                    Debugger.warn(this,Lang.getError(r.error,r.data))()
                } else {
                    Debugger.warn(this,r.data.info)()
                }
            } else {
                if(r.data != ""){
                    r.data.forEach(game => {
                        if(game != ""){
                            this.list[game.id] = new Game(game)
                        }
                    })
                }
            }
        }
    }

}