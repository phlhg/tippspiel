import Router from './routing/router'
import Client from './client';
import Debugger from './debugger';

import Events from './models/events/model'
import EventTipps from './models/eventtipps/model'
import Games from './models/games/model'
import GameTipps from './models/gametipps/model'
import Groups from './models/groups/model'
import Players from './models/players/model'
import Teams from './models/teams/model'
import Users from './models/users/model'

export default class Application {

    constructor(){
        this.socket = new H2RFP_Socket('wss://wetterfrosch.internet-box.ch',SERVER_PORT);
        Debugger.log(this, "Connecting to server on port "+SERVER_PORT)()
        this.socket.onConnect = () => { Debugger.log(this, "Connected to server")() }
        this.socket.onDisconnect = () => { Debugger.log(this, "Disconnected from server") }

        this.client = new Client();
        this.router = new Router();

        this.model = {}
        this.model.events = new Events()
        this.model.eventTipps = new EventTipps()
        this.model.games = new Games()
        this.model.gameTipps = new GameTipps()
        this.model.groups = new Groups()
        this.model.players = new Players()
        this.model.teams = new Teams()
        this.model.users = new Users()

        this.setGlobalEvents()
    }

    async run(){

        this.socket.open().then(() => {
            this.socket.listen("Ping", (data,respond) => { respond() });
            this.socket.listen("Update", this.updateModel.bind(this));
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
        Array.from(root.querySelectorAll("a")).forEach(a => {
            a.onclick = e => {
                if(a.hasAttribute("href") && a.getAttribute("href").indexOf("http") != 0 && a.getAttribute("href").indexOf("//") != 0){
                    e.preventDefault();
                    this.router.load(a.getAttribute("href"));
                }
            }
        })
    }

    updateModel(data){
        
        this.model.games.update(data.game ?? [])
        this.model.gameTipps.update(data.gameTipp ?? [])
        this.model.users.update(data.user ?? [])

    }

}