import Controller from './controller'
import GameView from '../views/game'

export default class Game extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GameView)
    }

    load(){
        App.models.games.get(this.params.id).then(data => {
            this.view.setGame(data);
        }).catch(() => {
            if(game == null) return App.router.forward("/");
        });
    }

    unload(){
        this.view.clear();
    }

}