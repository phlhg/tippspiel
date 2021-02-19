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

}