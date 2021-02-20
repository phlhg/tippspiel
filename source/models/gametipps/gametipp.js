import Element from '../element'

/** Class representing a GameTipp */
export default class GameTipp extends Element {

    constructor(data){
        super(data.id)

        /** @property {number} game Game, to which the tipp belongs */
        this.game = -1

        /** @property {number} user User, which made the tipp */
        this.user = -1

        /** @property {number} bet1 Tipped Score for team 1 */
        this.bet1 = 0

        /** @property {number} bet2 Tipped Score for team 2 */
        this.bet2 = 0

        /** @property {number} betWinner Tipped winning team */
        this.betWinner = -1;

        /** @property {number} betPlayer Tipped scoring player */
        this.betPlayer = -1;

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
        this.betWinner = parseInt(data.betWinner ?? this.betWinner);
        this.betPlayer = parseInt(data.betPlayer ?? this.betPlayer);
        this.reward = parseInt(data.reward ?? this.reward);
    }

}