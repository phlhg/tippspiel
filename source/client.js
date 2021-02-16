import State from './comm/state'
import Debugger from './debugger';

/** Class representing the client */
export default class Client {

    constructor(app){

        /** @type {App} Reference to the app object */
        this.app = app;

        /** @type {H2RFP_Socket} Reference to the socket */
        this.socket = this.app.socket;

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
        this.permission = {}
        
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
    restoreSession(){
        this.isknown = (localStorage.getItem("tipp-dev-iskown") !== null)
        if(localStorage.getItem("tipp-dev-token") !== null){
           this.singIn(localStorage.getItem("tipp-dev-token")).then(r => {
                if(r.state != State.SUCCESS){
                    Debugger.warn(this, `Could not restore session (State: ${r.state}, Error: ${Lang.getError(r.error,r.data)}) `)()
                } else {
                    Debugger.log(this, "Session was restored")()
                }
           })
        }
    }

    /**
     * Shows the sign-in, if the user is known, otherwise the sign-up
     */
    prompt(){
        if(this.isknown){
            this.app.router.forward("/signin/")
        } else {
            this.app.router.forward("/signup/")
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
        if(this.socket.state != H2RFP_SocketState_OPEN) return { state: State.CLIENT_ERROR, error: -1, data: {} };
        var msg = await this.socket.exec("signin",{ token: token, retry: false });
        if(msg.state != State.SUCCESS){ return msg; }
        this.active = true;
        this.token = token;
        localStorage.setItem("tipp-dev-iskown","true")
        localStorage.setItem("tipp-dev-token",this.token)
        if(!await this.getMe()){
            this.singOut()
            return { state: State.SERVER_ERROR, error: 0, data: {} }
        }
        return msg;
    }

    /**
     * Retireves data about the client from the server
     */
    async getMe(){
        if(this.socket.state != H2RFP_SocketState_OPEN) return false;
        if(!this.active) return false;
        var r = await this.socket.exec("me",{})
        if(r.state != State.SUCCESS){ return false; }
        this.id = r.data.id;
        this.name = r.data.name;
        this.permission = {}
        for(var p in r.data.permission){
            this.permission[p] = (r.data.permission[p] == 'true')
        }
        this.groups = r.data.groups.length < 1 ? [] : r.data.groups;
        this.gameTipps = r.data.gameTipps.length < 1 ? [] : r.data.gameTipps;
        this.eventTipps = r.data.eventTipps.length < 1 ? [] : r.data.eventTipps;
        return true;
    }
    
    /**
     * Sign up a new client
     * @async
     * @param {string} name Name of the new client
     * @param {string} email E-Mail of the new client
     * @return {object} Response object
     */
    async singUp(name, email){
        if(this.socket.state != H2RFP_SocketState_OPEN) return { state: State.CLIENT_ERROR, error: -1, data: {} };
        var msg = await this.socket.exec("signup",{ name: name, email: email })
        if(msg.state != State.SUCCESS){ return msg; }
        this.isknown = true;
        localStorage.setItem("tipp-dev-iskown","true")
        return msg;
    }



}