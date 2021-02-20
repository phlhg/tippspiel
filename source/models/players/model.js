import Manager from '../model'
import Player from './player'

/** Users Model */
export default class Players extends Manager {

    constructor(){
        super(Player)
    }

}