import Element from '../element'

/** Class representing a Player */
export default class Player extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} name - Name of the Player */
        this.name = ""

        /** @property {number} team - Team of the Player */
        this.team = -1

        this.set(data)
    }

    /**
     * Sets properties of the Player
     * @param {object} data - Properties to update
     */
    set(data){
        this.name = data.name ?? this.name
        this.team = parseInt(data.team ?? this.team)
    }

}