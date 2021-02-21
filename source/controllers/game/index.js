import Controller from '../controller'
import GameView from '../../views/game/index'
import { GameStatus } from '../../models/games/enums';

export default class GameIndex extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GameView)
    }

    load(){
        App.model.games.get(this.params.id).then(g => {
            this.view.setGame(g);
            if(g.status != GameStatus.UPCOMING){ this.view.addTipps(g.getTipps()) }
        }, e => {
            return App.router.forward("/");
        });
    }

    unload(){
        this.view.clear();
    }

}