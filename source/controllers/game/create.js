import Controller from '../controller'
import GameCreateView from '../../views/game/create'

export default class GameCreate extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GameCreateView)
    }

    async load(){
        if(!App.client.active){ return App.client.prompt() };

        if(!App.client.permission.gameAnnounce){ 
            return App.router.forward(`/`);
        }

        this.view.on("submit", async data => {
            var r = await App.model.games.create(data.team1, data.team2, data.date.getTime()/1000, data.location)
            if(!r.success){
                this.view.form.error(r.message);
            } else {
                var game = await App.model.games.get(r.data);
                App.router.forward(game.url);
            }
        })
    }

}