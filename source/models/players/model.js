import Manager from '../model'
import Player from './player'
import Debugger from "../../debugger";
import Request from '../request';

/** Users Model */
export default class Players extends Manager {

    constructor(){
        super(Player)
    }

    async getSuggested(game){
        var r = new Request("suggest_players",{ game: game })
        if(!(await r.run())){ return []; }
        return this.getAll(Array.from(r.data).map(i => parseInt(i)));
    }

    async create(name, team){
        team = parseInt(team);
        var r = new Request("createPlayer",{ name: name, team: team })
        if(!(await r.run())){ return r; }
        await App.model.teams.update([team]);
        return r;
    }

}