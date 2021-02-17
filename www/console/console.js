document.addEventListener("DOMContentLoaded",() => {
    
    window.controller = new Controller();

});

class Controller {

    constructor(){

        this.token = localStorage.getItem("tipp-dev-token") ?? "";

        this.view = new View();

        this.socket = new H2RFP_Socket('wss://wetterfrosch.internet-box.ch',15320);

        this.view.addCommand("connect")
        this.view.addOutput("Versuche zu verbinden...")

        this.socket.open().then(() => {
            this.view.addOutput("Erfolgreich verbunden")
            this.view.addCommand("signin")
            if(this.token == ""){
                this.view.addOutput("Bitte gib deinen Zugangscode ein:")
                this.view.events.submit = data => { this.login(data.value); }
            } else {
                this.view.addOutput("Zugangscode wurde aus letzter Sitzung bezogen");
                this.login(this.token);
            }
        }).catch(() => {
            this.view.addError("Konnte nicht verbinden")
        })

    }

    async login(token){
        var msg = await this.socket.exec("signin",{ token: token, retry: false });
        if(msg.state != 0){ 
            if(r.error != 0){
                this.view.addError(__LANG.de.errors[r.error] ? __LANG.de.errors[r.error] : __LANG.de.errors[0]);
            } else {
                this.view.addError(r.data.info);
            }
            this.view.events.submit = () => {}
            return false;
        }

        this.token = token;
        localStorage.setItem("tipp-dev-token",this.token)

        this.view.events.submit = async (data) => {
            this.view.addCommand(data.value);
            if(this.socket.state != H2RFP_SocketState_OPEN){  this.view.addError("Nicht mit dem Server verbunden"); return true }
            var r = await this.socket.exec("console",{ cmd: data.value })
            if(r.state != 0){
                if(r.error != 0){
                    this.view.addError(Lang.getError(r.error,r.data));
                } else {
                    this.view.addError(r.data.info);
                }
            } else {
                this.view.addOutput(r.data.text);
            }
        }

        this.view.addOutput("Erfolgreich angemeldet - Befehle können nun ausgeführt werden");

        return true;
    }

}

class View {

    constructor(){

        this.events = {}
        this.events.submit = () => {}

        this.root = document.querySelector(".console");
        this.console = this.root.querySelector(".inner")
        this.input = this.root.querySelector("input")

        this.history = [];

        var db = {
            "User": {},
            "Group": {},
            "Player": {},
            "Team": {},
            "Location": {},
            "Event": {},
            "EventTipp": {},
            "Game": {},
            "GameTipp": {}
        }

        this.commands = {
            "access": {
                "get": db,
                "set": db,
                "emplace": db,
                "erase": db,
                "list": db
            },
            "print": {
                "all": {},
                ...db
            }
        }

        this.index = -1;

        this.input.addEventListener("keydown",e => {
            if(e.code == 'Enter' && this.input.value.replace(/ /gi,"") != ""){
                e.preventDefault()
                this.history = this.history.slice(Math.max(this.index,0));
                this.history.unshift(this.input.value);
                this.index = -1;
                this.events.submit({value: this.input.value})
                this.input.value = "";
            } else if(e.code == 'ArrowUp') {
                e.preventDefault()
                if(this.index + 1 < this.history.length){
                    this.index++;
                    this.input.value = this.history[this.index];
                }
            } else if(e.code == 'ArrowDown') {
                e.preventDefault()
                if(this.index > 0){
                    this.index--;
                    this.input.value = this.history[this.index];
                } else if(this.index == 0){
                    this.index--;
                    this.input.value = "";
                }
            } else if(e.code == 'Tab'){
                e.preventDefault()
                var m = this.suggestion(this.commands,this.input.value.split(" "))
                if(m != ""){ this.input.value = m; }
            }
        });

    }

    suggestion(options, split){
        if(Object.keys(options).length < 1 || split.length < 1 ){ return ""; }
        var p = Object.keys(options).filter(k => k.indexOf(split[0]) == 0);
        if(p.length == 1){
            split.shift();
            return p + " " + this.suggestion(options[p],split)
        } else {
            return split[0];
        }
    }

    addCommand(text){
        var s = document.createElement("span");
        s.innerText = text;
        s.classList.add("cmd");
        this.console.appendChild(s);
    }

    addOutput(text){
        var s = document.createElement("span");
        s.innerText = text;
        this.console.appendChild(s);
    }

    addError(text){
        var s = document.createElement("span");
        s.innerText = text;
        s.classList.add("error");
        this.console.appendChild(s);
    }

}