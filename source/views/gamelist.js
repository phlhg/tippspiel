import View from './view'
import GameTile from './components/gametile'

export default class GameList extends View {

    constructor(...args){
        super(...args)
    }

    addGame(id,data){
        let g = new GameTile(id,data);
        this.root.appendChild(g.getHtml())
    }

    clear(){
        this.root.innerHTML = '';
    }

}