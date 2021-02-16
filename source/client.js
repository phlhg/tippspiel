import State from './comm/state'

/** Class representing the client */
export default class Client {

    constructor(app){

        /** Reference to the app object */
        this.app = app;

        /** Reference to the socket */
        this.socket = this.app.socket;

        /** Indicates whether the client is signed in or not */
        this.active = false;

        /** Token of the client */
        this.token = "";

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
        return msg;
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
        return msg;
    }



}