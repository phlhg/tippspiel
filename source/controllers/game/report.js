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
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        this.game = await App.model.games.get(this.params.id);
        if(this.game === null){ return App.router.showError(); }

        if(this.game.status != GameStatus.PENDING || !App.client.permission.gameReport){ 
            return App.router.forward(`/`);
        }

        this.view.setGame(this.game);

        this.view.on("submit",async data => {
            var r = await this.game.report(data);
            if(!r.success){
                this.view.form.error(r.message);
            } else {
                App.router.forward(this.game.url); 
            }
        })
    }

    unload(){
        this.view.clear();
    }

}