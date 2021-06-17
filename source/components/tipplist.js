import TippTile from "./tiles/tipptile";

export default class TippList {

    constructor(){

        this.dom = {}
        this.dom.root = document.createElement("div");
        this.dom.root.classList.add("tipp-list");
        this.dom.root.classList.add("tile-list");
    }

    insert(list){
        this.clear()
        list.forEach(game => {
            var g = new TippTile(new Promise(r => { r(game) }));
            this.dom.root.appendChild(g.getHtml())
        });
        this.dom.root.classList.remove("loading");
    }

    loading(){
        this.clear();
        this.dom.root.classList.add("loading");
    }

    clear(){
        this.dom.root.innerHTML = '';
    }

    getHTML(){
        return this.dom.root;
    }

}