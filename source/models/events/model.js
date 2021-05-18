import Manager from '../model'
import Request from '../request';
import Event from './event'

/** Users Model */
export default class Events extends Manager {

    constructor(){
        super(Event)
    }

    async getRanking(id){
        var r = new Request("ranking", { event: id });
        if(!(await r.run())){ return r; }

        return r.return(Array.from(r.data).map(u => {
            return {
                user: parseInt(u.user),
                rank: parseInt(u.points+1)
            }
        }))
    }

    async addGame(event, team1, team2, time, location){
        var r = new Request("createGame", {
            location: location,
            time: time,
            name: "",
            stream: "",
            event: event,
            team1: team1,
            team2: team2,
        })
        if(!(await r.run())){ return r; }
        var id = parseInt(r.data.id);
        var e = await App.model.events.get(1);
        if(!e.games.includes(id)){ e.games.push(id) }
        return r.return(id)
    }

}