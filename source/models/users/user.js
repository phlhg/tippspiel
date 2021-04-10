import Element from '../element'

/** Class representing a user */
export default class User extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} name - Name of the user */
        this.name = "Anon"

        this.short = "A"

        /** @property {number} points - Points of the user */
        this.points = 0

        this.set(data)
    }

    /**
     * Sets properties of the User
     * @param {object} data - Properties of to update
     */
    set(data){
        this.name = data.name ?? this.name
        this.short = data.hasOwnProperty("name") ? data.name.split(/\s/ig).slice(0,2).map(s => s.charAt(0)).join("").toUpperCase() : this.short;
        this.points = parseInt(data.points ?? this.points)
    }

}