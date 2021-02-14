import Controller from './controller';
import GameTile from '../views/components/gametile'

export default class Home extends Controller {

    constructor(...args){
        super(...args);
    }

    load(){
        this.models.games.getAll([1,2]).forEach(game => {
            let g = new GameTile(game)
            this.view.root.appendChild(g.getHtml());
        });
    }

    unload(){
        this.view.root.innerHTML = "";
    }

}