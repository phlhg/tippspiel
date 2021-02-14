import Controller from './controller';
import GameTile from '../views/components/gametile'

export default class Game extends Controller {

    constructor(...args){
        super(...args);
    }

    load(){
        let g = new GameTile(this.models.games.get(this.params.id))
        this.view.root.appendChild(g.getHtml());
    }

    unload(){
        this.view.root.innerHTML = "";
    }

}