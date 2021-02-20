import Element from '../element'

/** Class representing a GameTipp */
export default class EventTipp extends Element {

    constructor(data){
        super(data.id)

        /** @property {number} game Event, to which the tipp belongs */
        this.event = -1

        /** @property {number} user User, which made the tipp */
        this.user = -1

        /** @property {number} winner Tipped winning team */
        this.winner = -1;

        /** @property {number} topscorer Tipped top scoring player */
        this.topscorer = -1;

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
        this.winner = parseInt(data.winner ?? this.winner);
        this.topscorer = parseInt(data.betPlayer ?? this.topscorer);
        this.reward = parseInt(data.reward ?? this.reward);
    }

}