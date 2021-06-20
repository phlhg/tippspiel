import Debugger from './debugger';
import TippNotification from './helper/notification';
import Request from './models/request';

/** Class representing the client */
export default class Client {

    constructor(){
        this.clear()
    }

    clear(){
        /** @type {boolean} Indicates if the client is signed in or not */
        this.active = false;

        /** @type {boolean} Indicates if the client was already logged in once  */
        this.isknown = localStorage.getItem("tipp-dev-iskown") !== null;

        /** @type {string} Token of the client */
        this.token = "";

        /** @type {number} Id of the client */
        this.id = -1;

        /** @type {string} Name of the client */
        this.name = "";

        /** @type {object} Permissions of the client */
        this.permission = {
            eventAnnounce: false,
            eventReport: false,
            gameAnnounce: false,
            gameReport: false,
            groupCreate: false,
            liveReport: false,
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

        this.lang = "";
    }

    /**
     * Restore a possible previous session of the client
     */
    async restoreSession(){
        if(localStorage.getItem("tipp-dev-token") !== null){
            var r = await this.signIn(localStorage.getItem("tipp-dev-token"));
            if(!r.success){
                Debugger.warn(this, `Could not restore session (${Lang.getError(r.message)})`)()
                localStorage.removeItem("tipp-dev-token")
            } else {
                Debugger.log(this, "Session was restored")()
            }
        }
    }

    /**
     * Sign in a client by token
     * @async
     * @param {string} token Token of the client
     * @return {object} Response object
     */
    async signIn(token){

        if(this.active){  
            var r0 = await this._signOut();  
            if(!r0.success){ return r0; }
        }

        var r1 = await this._signIn(token, false)
        if(!r1.success){ return r1; }

        localStorage.setItem("tipp-dev-iskown","true")
        localStorage.setItem("tipp-dev-token",this.token)

        return r1;
    }

    /**
     * Sign in a client again - e.g. after a disconnect
     */
    async signInAgain(){
        if(!this.active){ return true; }
        var r = await this._signIn(this.token,true);
        if(!r.success){ return false; }
        return true;
    }

    /** 
     * Internal method to sign in the client
     */
    async _signIn(token, retry){
        retry = retry ?? false;

        var r1 = new Request("signin", { token: token, retry: retry });
        if(!retry && this.active){ return r1.error("Already signed in"); }
        if(!(await r1.run())){ return r1; }

        var r2 = await this.getMe();
        if(!r2.success){ return r2; }

        this.active = true;
        this.token = token;

        // Handle missed updates on reconnect
        if(retry){
            if((r1.data.upToDate ?? "true") == "true" && (r1.data.updates ?? "") !== ""){
                App.model.update(r1.data.updates)
            } else {
                App.model.clear(); 
            }
        }

        Debugger.log(this, "Client is now signed in")()

        return r1;
    }

    /**
     * Signs the client out - Manipulates the LocalStorage
     */
     async signOut(){
        var r = await this._signOut()
        if(!r.success){ return r; }

        // Remove token
        localStorage.setItem("tipp-dev-iskown","true")
        localStorage.removeItem("tipp-dev-token")

        // Redirect
        App.router.load("/");

        return r;
    }

    /**
     * Internal signOut - Ignores the LocalStorage
     */
    async _signOut(){
        var r = new Request("signout");
        if(!this.active){ return r.error("Not signed in"); }
        if(!(await r.run())){ return r }

        App.model.clear()
        App.client.clear()

        Debugger.log(this, "Client is now signed out")()

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

        this.lang = r.data.lang;
        if(!Lang.available.includes(this.lang)){ this.setLanguage(Lang.id); }

        if(localStorage.getItem("tipp-active-groups") === null){ localStorage.setItem("tipp-active-groups", JSON.stringify(this.groups)) }
        this.groupsActive = JSON.parse(localStorage.getItem("tipp-active-groups")).filter(g => this.groups.includes(g));

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

    async handleServerUpdate(){
        if(!this.active){ return false; }
        var r = await this.getMe();
        if(!r.success){ Debugger.warn(this,r.message); }
        Debugger.log(this,"Updated client")()
        window.dispatchEvent(new CustomEvent("datachange",{ detail: { type: "user", id: this.id } }))
        return true;
    }

    async handleStorageUpdate(){
        
        if(this.token != localStorage.getItem("tipp-dev-token")){
            if(this.active){
                // Locally signed In
                var r0 = await this._signOut();
                if(r0.success){
                    if(localStorage.getItem("tipp-dev-token") != null){
                        // Remotely signed in
                        var r = await this._signIn(localStorage.getItem("tipp-dev-token"), false)
                        if(r.success){ 
                            TippNotification.create(Lang.get("notifications/postSwitch"),3000, "swap_horiz", "success").show() 
                        } else {
                            Debugger.warn(this, r.message);
                        }
                    } else {
                        // Remotely signed out
                        TippNotification.create(Lang.get("notifications/postSignOut"),3000, "logout", "error").show() 
                    }
                } else {
                    Debugger.warn(this, r0.message);
                }
            } else {
                // Locally Signed Out
                if(localStorage.getItem("tipp-dev-token") != null && this.token != localStorage.getItem("tipp-dev-token")){
                    // Remotely signed in
                    var r = await this._signIn(localStorage.getItem("tipp-dev-token"), false)
                    if(r.success){ 
                        TippNotification.create(Lang.get("notifications/postSignIn"),3000, "login", "success").show() 
                    } else {
                        Debugger.warn(this, r.message);
                    }
                }
            }
            App.router.reload()
        }

        this.groupsActive = JSON.parse(localStorage.getItem("tipp-active-groups")).filter(g => this.groups.includes(g));
        window.dispatchEvent(new CustomEvent("datachange",{ detail: { type: "user", id: this.id } }))
    }

    // Language
    async setLanguage(value){
        if(!this.active || !Lang.available.includes(value)){ return false; }
        var r = new Request("setlang", { lang: value });
        if(!(await r.run())){ console.warn(r); return false; }
        this.lang = value;
        return true;
    }

    // GROUPS

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