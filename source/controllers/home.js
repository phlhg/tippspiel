import Controller from './controller';
import GameListView from '../views/gamelist'

export default class Home extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GameListView);
    }

    load(){
        for(var [id, game] of Object.entries(App.models.games.getObject([1,2,3]))){
            this.view.addGame(id,game)
        }
    }

    unload(){
        this.view.clear();
    }

}