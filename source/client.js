import Debugger from './debugger';
import Request from './models/request';

/** Class representing the client */
export default class Client {

    constructor(){

        /** @type {boolean} Indicates if the client is signed in or not */
        this.active = false;

        /** @type {boolean} Indicates if the client was already logged in once  */
        this.isknown = false;

        /** @type {string} Token of the client */
        this.token = "";

        /** @type {number} Id of the client */
        this.id = -1;

        /** @type {string} Name of the client */
        this.name = "";

        /** @type {number} Points of the client */
        this.points = 0;

        /** @type {object} Permissions of the client */
        this.permission = {
            eventAnnounce: false,
            eventReport: false,
            gameAnnounce: false,
            gameReport: false,
            console: false
        }
        
        /** @type {array} Groups of the client */
        this.groups = []

        /** @type {array} EventTipps of the client */
        this.eventTipps = []

        /** @type {array} GameTipps of the client */
        this.gameTipps = []

    }

    /**
     * Restore a possible previous session of the client
     */
    async restoreSession(){
        this.isknown = (localStorage.getItem("tipp-dev-iskown") !== null)
        if(localStorage.getItem("tipp-dev-token") !== null){
            var r = await this.singIn(localStorage.getItem("tipp-dev-token"));
            if(!r.success){
                Debugger.warn(this, `Could not restore session (${Lang.getError(r.message)})`)()
                localStorage.removeItem("tipp-dev-token")
                App.router.forward("/signin/")
            } else {
                Debugger.log(this, "Session was restored")()
            }
        }
    }

    /**
     * Shows the sign-in, if the user is known, otherwise the sign-up
     */
    prompt(){
        if(this.isknown){
            App.router.overwrite("/signin/")
        } else {
            App.router.overwrite("/signup/")
        }
        return false;
    }

    /**
     * Sign in a client by token
     * @async
     * @param {string} token Token of the client
     * @return {object} Response object
     */
    async singIn(token){
        var r = new Request("signin", { token: token, retry: false });
        if(!(await r.run())){ return r; }

        this.active = true;
        this.token = token;

        var r2 = await this.getMe();
        if(!r2.success){ 
            this.active = false;
            this.token = "";
            return r2; 
        }

        localStorage.setItem("tipp-dev-iskown","true")
        localStorage.setItem("tipp-dev-token",this.token)

        return r;
    }

    /**
     * Retireves data about the client from the server
     */
    async getMe(){
        var r = new Request("me", {});
        if(!(await r.run())){ return r; }

        this.id = parseInt(r.data.id);
        this.name = r.data.name;

        for(var p in this.permission){
            this.permission[p] = (r.data.permission.hasOwnProperty(p) && r.data.permission[p] == 'true')
        }

        this.groups = Array.from(r.data.groups).map(i => parseInt(i))
        this.gameTipps = Array.from(r.data.gameTipps).map(i => parseInt(i))
        this.eventTipps = Array.from(r.data.eventTipps).map(i => parseInt(i))

        return r;
    }
    
    /**
     * Sign up a new client
     * @async
     * @param {string} name Name of the new client
     * @param {string} email E-Mail of the new client
     * @return {object} Response object
     */
    async singUp(name, email){
        var r = new Request("signup", { name: name, email: email });
        if(!(await r.run())){ return r; }

        this.isknown = true;
        localStorage.setItem("tipp-dev-iskown","true")
        
        return r;
    }

    signout(){
        localStorage.setItem("tipp-dev-iskown","true")
        localStorage.removeItem("tipp-dev-token")
        window.location = "/"
    }



}