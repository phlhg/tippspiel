import Element from '../element'

/** Class representing a team */
export default class Team extends Element {

    /**
     * Create a team
     * @param {object} data - Properties of the team
     */
    constructor(data){
        super(data.id)

        /** @property {string} name - Name of the team */
        this.name = ""

        /** @property {string} points - Short-name of the team */
        this.short = ""

        /** @property {int[]} games - List of ids of games, the team takes part */
        this.games = []

        /** @property {int[]} players - List of ids of players, assigned to the team */
        this.players = []

        this.set(data)
    }

    /**
     * Sets properties of the user
     * @param {object} data - Properties of the user to update
     */
    set(data){
        this.name = data.name ?? this.name
        this.short = data.short ?? this.short
        this.games = data.games ?? this.games
        this.players = data.players ?? this.players
    }

}