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

        this.view.on("submit", async data => {
            var id = await App.model.games.create(
                data.team1, data.team2, data.date.getTime()/1000, data.location
            )

            if(id > 0){
                App.router.forward("/");
            } else {
                this.view.form.error("Spiel konnte nicht erstellt werden");
            }
        })
    }

}