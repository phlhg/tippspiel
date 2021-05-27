import GameTile from "./tiles/gametile";
import TippDate from "../helper/date";

export default class GameList {

    constructor(){

        this.dom = {}
        this.dom.root = document.createElement("div");
        this.dom.root.classList.add("game-list");

    }

    insert(list){
        this.clear()
        var prevDate = '';
        list.forEach(game => {
            if(prevDate != TippDate.toDate(game.start)){
                prevDate = TippDate.toDate(game.start);
                var h = document.createElement("h4");
                h.innerText = prevDate;
                this.dom.root.appendChild(h)
            }
            var g = new GameTile(new Promise(r => { r(game) }));
            this.dom.root.appendChild(g.getHtml())
        });
    }

    clear(){
        this.dom.root.innerHTML = '';
    }

    getHTML(){
        return this.dom.root;
    }

}