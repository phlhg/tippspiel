import Controller from './controller';
import GameTile from '../views/components/gametile'

export default class Home extends Controller {

    constructor(...args){
        super(...args);
    }

    load(){
        this.models.games.getAll([1,2]).forEach(game => {
            let view = new GameTile(game)
            this.dom.root.appendChild(view.getHtml());
        });
    }

    unload(){
        this.dom.root.innerHTML = "";
    }

}