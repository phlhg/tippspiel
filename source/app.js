import Debugger from './debugger';

import Device from './device';
import Client from './client';
import Model from './models';
import Router from './routing/router'

import TippNotification from './helper/notification';
import TippPush from './push';

export default class Application {

    constructor(){
        this.socket = new H2RFP_Socket('wss://wetterfrosch.internet-box.ch',SERVER_PORT);
        Debugger.log(this, "Connecting to server on port "+SERVER_PORT)()

        this.device = new Device();
        this.client = new Client();
        this.model = new Model();
        this.push = new TippPush()
        this.router = new Router();

        this.setup()
        this.setGlobalEvents()
    }

    setup(){

        // Backbutton
        if(this.device.os.ios && this.device.standalone){ document.body.classList.add("ios"); }

        // Title
        document.querySelector("header .heading strong").innerText = Lang.get("name");

        // Theme
        this.theme = localStorage.getItem("tipp-theme") ?? "auto";
        this.loadTheme();

    }

    async run(){

        if(this.device.supportsPWA()){ setTimeout(() => { this.pwaInfo() },10*1000); }

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

        this.socket.listen("Ping", (data,respond) => { respond() });

        this.socket.listen("Update", data => { this.model.update(data) });

        window.onbeforeunload = () => {
            this.socket.onDisconnect = () => {}
        }

        window.addEventListener("storage",() => {

            // Theme
            this.theme = localStorage.getItem("tipp-theme") ?? "auto";
            this.loadTheme();

            //Client
            this.client.handleStorageUpdate();

            //Language
            if(localStorage.getItem("tipp-lang") != null && localStorage.getItem("tipp-lang") != Lang.id){
                if(Lang.setLanguage(localStorage.getItem("tipp-lang"))){
                    document.body.classList.add("loading");
                    setTimeout(() => window.location.reload(),500);
                }
            }

        })

        window.addEventListener("popstate", e => {
            this.router.find(window.location.pathname,e.state);
        })

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",() => {
            this.loadTheme();
        })

        document.addEventListener("DOMNodeRemoved", e => {
            e.target.dispatchEvent(new Event("removed"));
        });

        this.setEvents(document.body);

        document.querySelector("header .back").onclick = e => {
            e.preventDefault();
            setTimeout(() => { window.history.go(-1) },100); // weird behaviour of safari
        }
    }

    setEvents(root){

        Array.from((root.parentElement ?? root).querySelectorAll("a")).forEach(a => {
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
            await this.client.signInAgain();
        }

        TippNotification.create(retry ? Lang.get("notifications/reconnected") : Lang.get("notifications/connected"), 3000, "wifi", "success").show();
        App.router.load(location.pathname);
        msg.hide();

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
    
    // Theme

    loadTheme(){
        if(this.theme == "dark" || (this.theme == "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches)){
            if(document.querySelector("link[href='/css/dark.css']") == null){
                var l = document.createElement("link");
                l.rel = "stylesheet"
                l.href = "/css/dark.css"
                document.head.append(l)
            }
        } else {
            var l = document.querySelector("link[href='/css/dark.css']")
            if(l !== null){ l.remove(); }
        }
    }

    setTheme(name){
        if(!["dark","light","auto"].includes(name)){ return false; }
        this.theme = name;
        localStorage.setItem("tipp-theme",this.theme)
        this.loadTheme();
    }

}