import Router from './routing/router.js'
import GameList from './models/games/list.js'

export default class App {

    constructor(){
        this.router = new Router(this);
        this.models = {}
        this.models.games = new GameList();
        this.setGlobalEvents()
    }

    run(){
        this.router.find(window.location.pathname);
    }

    setRoute(...args){
        this.router.add(...args);
    }

    setErrorHandler(...args){
        this.router.setErrorHandler(...args);
    }

    /** Adds global event listeners */
    setGlobalEvents(){
        setTimeout(function(){ document.body.classList.remove("loading"); },1000);

        this.setEvents(document.body);

        window.addEventListener("popstate", e => {
            this.router.find(window.location.pathname);
        })

        document.addEventListener("DOMNodeRemoved", e => {
            e.target.dispatchEvent(new Event("removed"));
        });
    }

    setEvents(root){
        Array.from(root.querySelectorAll("a[href]")).filter(a => {
            return a.getAttribute("href").indexOf("http") != 0 && a.getAttribute("href").indexOf("//") != 0
        }).forEach(a => {
            a.onclick = e => {
                e.preventDefault();
                this.router.load(a.getAttribute("href"));
            }
        })
    }

}