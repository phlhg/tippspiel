import Element from '../element'

/** Class representing a GameTipp */
export default class EventTipp extends Element {

    constructor(data){
        super(data.id)

        /** @property {number} game Event, to which the tipp belongs */
        this.event = 0

        /** @property {number} user User, which made the tipp */
        this.user = 0

        /** @property {number} winner Tipped winning team */
        this.winner = 0;

        /** @property {number} topscorer Tipped top scoring player */
        this.topscorer = 0;

        /** @property {number} reward Received points for this tipp */
        this.reward = {
            sum: 0,
            winner: false,
            topscorer: false
        };

        this.processed = false;

        this.set(data);
    }

    /**
     * Sets properties of the GameTipp
     * @param {object} data - Properties of to update
     */
    set(data){

        console.log(data);

        this.event = parseInt(data.event ?? this.event);
        this.user = parseInt(data.user ?? this.user);
        this.winner = parseInt(data.winner ?? this.winner);
        this.topscorer = parseInt(data.topscorer ?? this.topscorer);

        this.reward.sum = parseInt(data.reward?.sum ?? this.reward.sum)
        this.reward.winner = data.reward?.winner ? data.reward?.winner == "true" : this.reward.winner
        this.reward.topscorer = data.reward?.topscorer ? data.reward.topscorer == "true" : this.reward.topscorer

        this.processed = data.processed ? data.processed == "true" : this.processed
    }

    async getTopscorer(){
        if(this.topscorer == 0) return null;
        return App.model.players.get(this.topscorer);
    }

    async getWinner(){
        if(this.winner == 0) return null;
        return App.model.teams.get(this.winner);
    }

    getUser(){
        return App.model.users.get(this.user);
    }

}