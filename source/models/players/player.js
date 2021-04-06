import Element from '../element'

/** Class representing a Player */
export default class Player extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} name - Name of the Player */
        this.name = "Anon"

        /** @property {string} normalized Normalized (without accents etc. of the player) name of the player - Usful for searching */
        this.normalized = "anon"

        /** @property {number} team - Team of the Player */
        this.team = 0

        this.set(data)
    }

    /**
     * Sets properties of the Player
     * @param {object} data - Properties to update
     */
    set(data){
        this.name = data.name ?? this.name
        // See: https://stackoverflow.com/a/51874002
        this.normalized = data.hasOwnProperty("name") ? Lang.normalize(data.name) : this.normalized
        this.team = parseInt(data.team ?? this.team)
    }

    getTeam(){
        return App.model.teams.get(this.team);
    }

}