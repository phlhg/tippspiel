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

    load(){
        App.model.games.get(this.params.id).then(g => {
            this.view.setGame(g);
            if(g.hasOwnTipp()){
                g.getOwnTipp().then(t => { this.view.setTipp(t); })
            }
        }, e => {
            return App.router.forward("/");
        });
    }

    unload(){
        this.view.clear();
    }

}