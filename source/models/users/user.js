import Element from '../element'

/** Class representing a user */
export default class User extends Element {

    /**
     * Create a user
     * @param {object} data - Properties of the user
     */
    constructor(data){
        super("user",data.id)

        /** @property {string} name - Name of the user */
        this.name = ""

        /** @property {string} points - Points of the user */
        this.points = 0

        this.set(data)
    }

    /**
     * Sets properties of the user
     * @param {object} data - Properties of the user to update
     */
    set(data){
        this.name = data.name ?? this.name
        this.points = data.points ?? this.points
    }

}