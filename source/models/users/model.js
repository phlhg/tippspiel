import Manager from '../model'
import User from './user.js'

/** Users Model */
export default class Users extends Manager {

    constructor(){
        super(User)

        /** @todo Added example user for development - Remove in production */
        this.list[1] = new User({
            id: 1,
            name: "Max Mustermann"
        })

    }

}