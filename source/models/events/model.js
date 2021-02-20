import Manager from '../model'
import Event from './event'

/** Users Model */
export default class Events extends Manager {

    constructor(){
        super(Event)
    }

}