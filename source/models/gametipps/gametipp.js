import Element from '../element'

/** Class representing a GameTipp */
export default class GameTipp extends Element {

    constructor(data){
        super(data.id)

        /** @property {number} game Game, to which the tipp belongs */
        this.game = 0

        /** @property {number} user User, which made the tipp */
        this.user = 0

        /** @property {number} bet1 Tipped Score for team 1 */
        this.bet1 = 0

        /** @property {number} bet2 Tipped Score for team 2 */
        this.bet2 = 0

        /** @property {number} winner Tipped winning team */
        this.winner = 0;

        /** @property {number} topscorer Tipped scoring player */
        this.topscorer = 0;

        /** @property {number} reward Received points for this tipp */
        this.reward = 0;

        this.set(data);
    }

    /**
     * Sets properties of the GameTipp
     * @param {object} data - Properties of to update
     */
    set(data){
        this.game = parseInt(data.game ?? this.game);
        this.user = parseInt(data.user ?? this.user);
        this.bet1 = parseInt(data.bet1 ?? this.bet1);
        this.bet2 = parseInt(data.bet2 ?? this.bet2);
        this.winner = parseInt(data.winner ?? this.winner);
        this.topscorer = parseInt(data.topscorer ?? this.topscorer);
        this.reward = parseInt(data.reward ?? this.reward);
    }

    getGame(){
        return App.model.games.get(this.game);
    }

    getUser(){
        return App.model.users.get(this.user);
    }

    getWinner(){
        return App.model.teams.get(this.winner);
    }

    getPlayer(){
        return App.model.players.get(this.topscorer);
    }

}