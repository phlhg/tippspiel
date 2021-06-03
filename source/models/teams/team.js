import Element from '../element'

/** Class representing a team */
export default class Team extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} short - Short name of the team */
        this.short = ""

        /** @property {string} name - Name of the team */
        this.name = "Anon"

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
        this.short = data.short ?? this.short
        this.name = this._getName(data);
        this.games = Array.from(data.games ?? this.games).map(i => parseInt(i))
        this.players = Array.from(data.players ?? this.players).map(i => parseInt(i))
    }

    _getName(data){
        var teams = Lang.getRaw("teams")
        if(data.hasOwnProperty("short") && teams.hasOwnProperty(data.short.toLowerCase())){ return teams[data.short.toLowerCase()]; }
        return data.name ?? "unknown";
    }

    getPlayers(){
        return App.model.players.getAll(this.players);
    }

}