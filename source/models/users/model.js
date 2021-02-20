import Manager from '../model'
import User from './user.js'

/** Users Model */
export default class Users extends Manager {

    constructor(){
        super(User)
    }

}