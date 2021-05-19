import Controller from '../controller'
import GameTippView from '../../views/game/tipp'
import { GameStatus } from '../../models/games/enums';

export default class GameTipp extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GameTippView)
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        if(!App.client.promptLogin()){ return false; }

        this.game = await App.model.games.get(this.params.id);

        if(this.game.status != GameStatus.UPCOMING){ 
            return App.router.forward(`/`);
        }

        this.view.setGame(this.game);

        if(this.game.hasOwnTipp()){
            this.game.getOwnTipp().then(t => { this.view.setTipp(t); })
        }

        this.view.on("submit", async data => {
            var r = await this.game.makeTipp({
                bet1: data.b1,
                bet2: data.b2,
                winner: data.winner,
                topscorer: data.topscorer
            })

            if(!r.success){
                this.view.form.error(r.message);
            } else {
                App.router.forward(this.game.url)
            }
        })
    }

    unload(){
        this.view.clear();
    }

}