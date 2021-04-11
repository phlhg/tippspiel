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
                points: parseInt(u.points)
            }
        }))
    }

}