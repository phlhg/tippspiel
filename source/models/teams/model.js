import Manager from '../model'
import Team from './team'
import Debugger from "../../debugger";

/** Teams Model */
export default class Teams extends Manager {

    constructor(){
        super(Team)
    }

}