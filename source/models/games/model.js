import { GamePhase, GameStatus } from './enums';
import Model from '../model'
import Game from './game'
import Debugger from '../../debugger';
import Request from '../request';

/** Games model */
export default class Games extends Model {

    /** Creates a game model */
    constructor(){
        super(Game)
        this.list[19] = null;
    }

    async getHot(){
        var r = new Request("hotGames", {});
        if(!(await r.run())){ return { upcoming: [], over: [] }; }

        var upcoming = Array.from(r.data.upcoming).map(i => parseInt(i));
        var over = Array.from(r.data.over).map(i => parseInt(i));
        
        // To get all games together
        this.getAll([].concat(upcoming).concat(over));

        return { upcoming: this.getAll(upcoming), over: this.getAll(over) }
    }

    async getSuggestedLocations(){
        var r = new Request("suggest_locations", {})
        if(!(await r.run())){ return []; }
        return Array.from(r.data).map(e => e.toString());
    }

    async report(id, data){
        var r = new Request("reportGame", {
            game: id,
            phase: data.phase,
            score1: data.score1,
            score2: data.score2,
            scorePenalty1: data.penalty1,
            scorePenalty2: data.penalty2,
            scorers: data.scorer
        });
        if(!(await r.run())){ return r; }
        return r;
    }

    async nextPhase(id){
        var r = new Request("nextPhase", { game: id })
        if(!(await r.run())){ return r; }
        return r;
    }

}