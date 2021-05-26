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
            groupCreate: false,
            console: false
        }
        
        /** @type {number[]} Groups of the client */
        this.groups = []

        /** @type {number[]} List of active groups */
        this.groupsActive = [];

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
    promptLogin(){
        if(this.active){ return true; }
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
    async singIn(token,retry){

        retry = retry ?? false;

        var r = new Request("signin", { token: token, retry: retry });

        // Signout client if active
        if(!retry && this.active){ 
            window.history.replaceState({}, '', "/signin/"+encodeURIComponent(token)+"/");
            this.signout();
            return r.error(""); 
        }

        if(!(await r.run())){ return r; }

        this.active = true;
        this.token = token;

        var r2 = await this.getMe();
        if(!r2.success){ 
            this.active = false;
            this.token = "";
            return r2; 
        }

        /** FIX: Load own user into cache to enable user update events */
        App.model.users.get(this.id)

        if(localStorage.getItem("tipp-active-groups") === null){ localStorage.setItem("tipp-active-groups", JSON.stringify(this.groups)) }
        this.groupsActive = JSON.parse(localStorage.getItem("tipp-active-groups")).filter(g => this.groups.includes(g));

        localStorage.setItem("tipp-dev-iskown","true")
        localStorage.setItem("tipp-dev-token",this.token)

        return r;
    }

    async restoreConnection(){
        if(!this.active){ return true; }
        var r = await this.singIn(localStorage.getItem("tipp-dev-token"),true);
        if(r.success){ return false; }
        return r.data.upToDate == "true";
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
     * @return {Request} Response object
     */
    async singUp(name, email){
        var r = new Request("signup", { 
            name: name, 
            email: email,
            lang: Lang.id ?? "en"
        });
        
        if(!(await r.run())){ return r; }

        this.isknown = true;
        localStorage.setItem("tipp-dev-iskown","true")
        
        return r;
    }


    /**
     * Recover an account by email
     * @param {string} email E-Mail of the account to recover
     * @returns {Request} Response object
     */
    async recoverToken(email){
        var r = new Request("restoreToken", { email: email, lang: Lang.id ?? "en" });
        if(this.active){ return r.error("Please sign out first"); }
        if(!(await r.run())){ return r; }
        return r;
    }

    /**
     * Signs out the client
     */
    signout(){
        localStorage.setItem("tipp-dev-iskown","true")
        localStorage.removeItem("tipp-dev-token")
        document.body.classList.add("loading"); 
        setTimeout(() => { window.location.reload() },500);
    }

    isGroupActive(id){
        return this.groupsActive.includes(id);
    }

    addGroup(id){
        if(!this.groupsActive.includes(id)){ this.groupsActive.push(id); }
        localStorage.setItem("tipp-active-groups",JSON.stringify(this.groupsActive))
    }

    removeGroup(id){
        if(this.groupsActive.includes(id)){ this.groupsActive.splice(this.groupsActive.indexOf(id), 1); }
        localStorage.setItem("tipp-active-groups",JSON.stringify(this.groupsActive))
    }

}