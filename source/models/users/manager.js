import Manager from '../manager'
import User from './user.js'

/** Class managing local games */
export default class UserManager extends Manager {

    constructor(){
        super()

        /** @todo Added example user for development - Remove in production */
        this.list[1] = new User({
            id: 1,
            name: "Max Mustermann"
        })

    }

}