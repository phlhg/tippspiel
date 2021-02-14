import Controller from './controller';
import GameListView from '../views/gamelist'

export default class Game extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GameListView)
    }

    load(){
        this.view.addGame(this.models.games.get(this.params.id))
    }

    unload(){
        this.view.clear();
    }

}