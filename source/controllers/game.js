import Controller from './controller';
import GameTile from '../views/components/gametile'

export default class Game extends Controller {

    constructor(...args){
        super(...args);
    }

    load(){
        let view = new GameTile(this.models.games.get(this.params.id))
        this.dom.root.appendChild(view.getHtml());
    }

    unload(){
        this.dom.root.innerHTML = "";
    }

}