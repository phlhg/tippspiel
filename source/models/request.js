import Debugger from "../debugger";

export default class Request {

    constructor(command, params){
        this._command = command;
        this._params = params;
        this._response = {};

        this.success = true;
        this.message = Lang.get("errors/local/unknown");
        this.data = {};
    }

    async run(){
        if(App.socket.state != SocketState.OPEN) return this._error(Lang.get("errors/local/noconnection"));

        this._response = await App.socket.exec(this._command, this._params);

        if(this._response.state != ResponseState.SUCCESS){
            if(parseInt(this._response.error) >= 0){
                if(parseInt(this._response.error) == 0){ Debugger.error(this,`Encountered unknown error while executing "${this._command}": `, this._response)() }
                return this._error(Lang.getError(this._response.error,this._response.data));
            } else if(this._response.data.hasOwnProperty("info")){
                return this._error(this._response.data.info);
            } else {
                Debugger.error(this,`Encountered unknown error while executing "${this._command}": `, this._response)()
                return this._error(Lang.get("errors/local/unknown"));
            }
        }

        return this._return(this._response.data);
    }

    _return(data){
        this.success = true;
        this.message = "";
        this.data = data;
        return true;
    }

    return(data){
        this._return(data);
        return this;
    }

    _error(message){
        this.success = false;
        this.message = message;
        this.data = {};
        return false;
    }

    error(message){
        this._error(message);
        return this;
    }

}