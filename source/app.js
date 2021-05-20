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
import TippNotification from './helper/notification';
import Device from './device';

export default class Application {

    constructor(){
        this.socket = new H2RFP_Socket('wss://wetterfrosch.internet-box.ch',SERVER_PORT);
        Debugger.log(this, "Connecting to server on port "+SERVER_PORT)()

        this.device = new Device();
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

        // Dark Mode
        if(localStorage.getItem("tipp-theme-dark") === null){ localStorage.setItem("tipp-theme-dark", window.matchMedia("(prefers-color-scheme: dark)").matches ? "1" : "0") }
        if(localStorage.getItem("tipp-theme-dark") == "0"){ this.disabledDarkTheme(); }

        this.setGlobalEvents()
    }

    async run(){

        if(this.device.supportsPWA()){ setTimeout(() => { this.pwaInfo() },10*1000); }

        this.socket.listen("Ping", (data,respond) => { respond() });
        this.socket.listen("Update", this.updateModel.bind(this));

        this.socket.open().then(() => {
            this.client.restoreSession();
        }).catch((e) => {
            this.reconnect(false);
        }).finally(() => {
            setTimeout(() => { 
                this.router.find(window.location.pathname);
                document.body.classList.remove("loading"); 
            },1000);
        })

    }

    /** Adds global event listeners */
    setGlobalEvents(){

        this.socket.onConnect = () => { 
            Debugger.log(this, "Connected to server")() 
        }

        this.socket.onDisconnect = () => { 
            this.reconnect(true);
            Debugger.log(this, "Disconnected from server")()
        }

        window.onbeforeunload = () => {
            this.socket.onDisconnect = () => {}
        }

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
        Array.from(root.parentElement.querySelectorAll("a")).forEach(a => {
            if(a.hasAttribute("href")){
                a.onclick = e => {
                    if(a.hasAttribute("href") && a.getAttribute("href").indexOf("http") != 0 && a.getAttribute("href").indexOf("//") != 0){
                        e.preventDefault();
                        this.router.load(a.getAttribute("href"));
                    }
                }
            }
        })
    }

    async reconnect(retry){

        var msg = TippNotification.create(retry ? Lang.get("notifications/reconnecting") : Lang.get("notifications/connecting") ,-1,"wifi_off","error");
        msg.show();
        
        if(retry){
            await new Promise(r => { setTimeout(r, 100); })
            Debugger.log(this, "Trying to connect")()
            try{ await this.socket.open(); } catch(e) {}
        }

        while(App.socket.state == SocketState.CLOSED){
            await new Promise(r => { setTimeout(r, 5000); })
            Debugger.log(this, "Trying to connect")()
            try{ await this.socket.open(); } catch(e) {}
        }

        if(!retry){ 
            await this.client.restoreSession(); 
        } else {
            var r = await this.client.restoreConnection(); 
            if(!r){ Debugger.warn(this, "Should actually reload (upToDate=false)")() }
        }

        TippNotification.create(retry ? Lang.get("notifications/reconnected") : Lang.get("notifications/connected"), 3000, "wifi", "success").show();
        App.router.load(location.pathname);
        msg.hide();

    }

    updateModel(data){

        this.model.events.update(data.event ?? [])
        this.model.eventTipps.update(data.EventTipp ?? [])
        this.model.games.update(data.Game ?? [])
        this.model.gameTipps.update(data.GameTipp ?? [])
        this.model.groups.update(data.Group ?? [])
        this.model.players.update(data.Player ?? [])
        this.model.teams.update(data.Team ?? [])
        this.model.users.update(data.User ?? [])

        if((data.User ?? []).includes(this.client.id)){ this.client.getMe(); }

    }

    hasConnection(){
        return App.socket.state == SocketState.OPEN
    }

    promptConnection(){
        if(this.hasConnection()){ return true; }
        App.router.overwrite("/noconnection/");
        return false;
    }

    pwaInfo(){

        if(this.device.os.android){
            TippNotification.create(
                Lang.get("pwa_info/android"),
                15*1000,
                "phone_android",
                "popup"
            ).show()
        } else if(this.device.os.ios){
            TippNotification.create(
                Lang.get("pwa_info/ios"),
                15*1000,
                "phone_iphone",
                "popup"
            ).show()
        }

    }

    enableDarkTheme(){
        localStorage.setItem("tipp-theme-dark", "1")
        var l = document.createElement("link");
        l.rel = "stylesheet"
        l.href = "/css/dark.css"
        document.head.append(l)
    } 

    disabledDarkTheme(){
        localStorage.setItem("tipp-theme-dark", "0")
        document.querySelector("link[href='/css/dark.css']").remove();
    }

}