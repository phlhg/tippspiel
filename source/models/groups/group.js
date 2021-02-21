import Element from '../element'

/** Class representing a group */
export default class Group extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} name - Name of the group */
        this.name = "Anon"

        /** @property {number[]} users - Users of the group */
        this.users = []

        this.set(data)
    }

    /**
     * Sets properties of the Group
     * @param {object} data - Properties to update
     */
    set(data){
        this.name = data.name ?? this.name
        this.users = Array.from(data.users ?? this.users).map(i => parseInt(i))
    }

}