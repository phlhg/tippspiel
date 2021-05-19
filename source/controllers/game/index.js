import Controller from '../controller'
import GameView from '../../views/game/index'
import { GameStatus } from '../../models/games/enums';

export default class GameIndex extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GameView);
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        var g = await App.model.games.get(this.params.id);
        if(g === null){ return App.router.showError(); }
        this.view.setGame(g);
    }

    unload(){
        this.view.clear();
    }

}