import Controller from '../controller'
import EventGameAddView from '../../views/event/add'

export default class EventGameAdd extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(EventGameAddView)
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        if(!App.client.permission.gameAnnounce){  return App.router.forward(`/`); }

        try{
            var event = await App.model.events.get(this.params.id);
        } catch {
            return App.router.forward(`/`);
        }

        // TODO: Check if event exists

        this.view.setEvent(event);

        this.view.on("submit", async data => {
            var r = await event.addGame(data.team1, data.team2, data.date.getTime()/1000, data.location)
            if(!r.success){
                this.view.form.error(r.message);
            } else {
                var game = await App.model.games.get(r.data);
                App.router.forward(game.url);
            }
        })
    }

    unload(){
        this.view.clear();
    }
}