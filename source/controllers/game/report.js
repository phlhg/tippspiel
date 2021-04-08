import Controller from '../controller'
import GameReportView from '../../views/game/report'
import { GameStatus } from '../../models/games/enums';

export default class GameReport extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GameReportView)
    }

    async load(){
        if(!App.client.active){ return App.client.prompt() };

        this.game = await App.model.games.get(this.params.id);

        if(this.game.status != GameStatus.PENDING || !App.client.permission.gameReport){ 
            return App.router.forward(`/`);
        }

        this.view.setGame(this.game);

        this.view.on("submit",async data => {
            var r = await this.game.report(data);
            if(r){
                App.router.forward("/"); 
            } else {
                this.view.form.error("Spiel konnte nicht beendet werden");
            }
        })
    }

    unload(){
        this.view.clear();
    }

}