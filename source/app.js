import Router from './routing/router'
import GamesModel from './models/games/model'
import UsersModel from './models/users/model';
import TeamsModel from './models/teams/model';
import Client from './client';
import Debugger from './debugger';

export default class Application {

    constructor(){
        this.socket = new H2RFP_Socket('wss://wetterfrosch.internet-box.ch',15320);
        this.socket.onConnect = () => { Debugger.log(this, "Connected to server")() }
        this.socket.onDisconnect = () => { Debugger.log(this, "Disconnected from server") }

        this.client = new Client();
        this.router = new Router();

        this.models = {}
        this.models.teams = new TeamsModel();
        this.models.games = new GamesModel();
        this.models.users = new UsersModel();

        this.setGlobalEvents()
    }

    async run(){

        this.socket.open().then(() => {
            this.client.restoreSession();
        }).catch((e) => {
            Debugger.warn(this, "Could not connect to server:",e)();
        }).finally(() => {
            setTimeout(() => { 
                this.router.find(window.location.pathname);
                document.body.classList.remove("loading"); 
            },1000);
        })

    }

    /** Adds global event listeners */
    setGlobalEvents(){

        document.querySelector("header .heading strong").innerText = Lang.get("name");

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