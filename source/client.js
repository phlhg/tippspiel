/** Class representing the client */
export default class Client {

    constructor(app){

        /** A reference to the app object */
        this.app = app;

        /** Indicates whether the client is signed in or not */
        this.active = false;

        /** Reference to the User object of the client - Null if not active */
        this.data = null;

    }

    isActive(){
        return this.active;
    }

}