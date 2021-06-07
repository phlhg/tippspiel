import Manager from '../model'
import Request from '../request';
import EventTipp from './eventtipps'

/** Users Model */
export default class EventTipps extends Manager {

    constructor(){
        super(EventTipp)
    }

    async makeTipp(data){
        
        var r = new Request("eventTipp",{ 
            event: data.event,
            winner: data.winner,
            topscorer: data.topscorer
        })
        if(!(await r.run())){ return r; }

        console.log(r);

        var id = parseInt(r.data.id);
        if(!App.client.eventTipps.includes(id)){ 
            var e = await App.model.events.get(data.event);
            e.tipps.push(id);
            App.client.eventTipps.push(id);
        }

        await this.update([id]);

        return r;
    }

}