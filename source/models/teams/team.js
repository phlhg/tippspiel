import Element from '../element'

/** Class representing a team */
export default class Team extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} name - Name of the team */
        this.name = ""

        /** @property {int[]} games - List of ids of games, the team takes part */
        this.games = []

        /** @property {int[]} players - List of ids of players, assigned to the team */
        this.players = []

        this.set(data)
    }

    /**
     * Sets properties of the Team
     * @param {object} data - Properties of to update
     */
    set(data){
        this.name = data.short ?? this.short
        this.games = Array.from(data.games ?? this.games).map(i => parseInt(i))
        this.players = Array.from(data.players ?? this.players).map(i => parseInt(i))
    }

}