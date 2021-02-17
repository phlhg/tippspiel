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
        let game = App.models.games.get(this.params.id);
        if(game == null) return App.router.forward("/");
        this.view.setGame(game);
    }

    unload(){
        this.view.clear();
    }

}