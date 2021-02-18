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
        for(var [id, game] of Object.entries(App.models.games.getAll([1,2,3,4,5,6,7,8,9,10]))){
            this.view.addGame(id,game)
        };
    }

    unload(){
        this.view.clear();
    }

}