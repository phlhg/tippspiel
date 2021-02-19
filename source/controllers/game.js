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
        App.model.games.get(this.params.id).then(data => {
            this.view.setGame(data);
        }, e => {
            return App.router.forward("/");
        });
    }

    unload(){
        this.view.clear();
    }

}