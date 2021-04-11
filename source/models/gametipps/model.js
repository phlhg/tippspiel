import Manager from '../model'
import GameTipp from './gametipp'
import Debugger from '../../debugger';
import Request from '../request';

/** Users Model */
export default class GameTipps extends Manager {

    constructor(){
        super(GameTipp)
    }

    async makeTipp(data){
        var r = new Request("makeTipp",{ 
            game: data.id,
            bet1: data.bet1,
            bet2: data.bet2,
            winner: data.winner,
            topscorer: data.topscorer
        })
        if(!(await r.run())){ return r; }

        var id = parseInt(r.data.id);
        if(!App.client.gameTipps.includes(id)){ 
            var g = await App.model.games.get(data.id);
            App.client.gameTipps.push(id);
            g.tipps.push(id);
        }
        await this.update([id]);

        return r;
    }

}