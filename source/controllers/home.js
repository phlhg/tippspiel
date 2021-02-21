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
        if(App.socket.state != SocketState.OPEN){ return App.router.overwrite("/noconnection/"); }
        App.model.games.getAll([1,2,3]).forEach(game => {
            this.view.addGame(game)
        })
    }

    unload(){
        this.view.clear();
    }

}