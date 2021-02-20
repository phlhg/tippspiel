import Manager from '../model'
import Team from './team'

/** Teams Model */
export default class Teams extends Manager {

    constructor(){
        super(Team)
    }

}