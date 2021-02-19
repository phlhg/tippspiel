import Manager from '../model'
import Group from './group'

/** Users Model */
export default class Groups extends Manager {

    constructor(){
        super(Group)
    }

}