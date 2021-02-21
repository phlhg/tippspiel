touchstart = [0,0]

window.ontouchstart = e => {
    touchstart = [e.touches[0].pageX, e.touches[0].pageY]
}

window.ontouchend = e => {
    var dx = e.changedTouches[0].pageX - touchstart[0];
    var dy = e.changedTouches[0].pageY - touchstart[1];
    if(Math.pow(Math.pow(dx,2) + Math.pow(dy,2),0.5) > 100){
        if(Math.abs(dx) > Math.abs(dy)){
            //Left Right
            if(dx > 0){
                window.dispatchEvent(new Event("swipeRight"))
            } else {
                window.dispatchEvent(new Event("swipeLeft"))
            }
        } else {
            //Up Down
            if(dy > 0){
                window.dispatchEvent(new Event("swipeDown"))
            } else {
                window.dispatchEvent(new Event("swipeUp"))
            }
        }
    }
}

document.addEventListener("DOMContentLoaded",() => {
    window.controller = new Controller();
});

class Controller {

    constructor(){

        this.token = localStorage.getItem("tipp-dev-token") ?? "";

        this.view = new View();

        this.socket = new H2RFP_Socket('wss://wetterfrosch.internet-box.ch',15320);

        this.socket.onConnect = () => {
            this.view.addInfo("Mit der Server verbunden")
        }

        this.socket.onDisconnect = () => {
            this.view.addError("Verbindug mit Server unterbrochen")
            setTimeout(() => { this.socket.open().then(() => this.login(this.token)) },5000);
        }

        this.view.addCommand("connect")
        this.view.addOutput("Versuche zu verbinden...")

        this.socket.open().then(() => {
            this.socket.listen("Ping", (data,respond) => { respond() });
            this.view.addCommand("signin")
            if(this.token == ""){
                this.view.addOutput("Bitte gib deinen Zugangscode ein:")
                this.view.events.submit = data => { this.login(data.value); }
            } else {
                this.view.addInfo("Zugangscode wurde aus letzter Sitzung bezogen");
                this.login(this.token);
            }
        }).catch(() => {
            this.view.addError("Verbindung mit Server konnte nicht hergestellt werden")
        })

    }

    async login(token){
        var r = await this.socket.exec("signin",{ token: token, retry: false });
        if(r.state != 0){ 
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

        this.view.addInfo("Erfolgreich angemeldet")
        this.view.addOutput("Für Befehle siehe: https://github.com/phlhg/tippspiel/blob/develop/doc/console.md")
        this.view.addOutput("Die Konsole unterstützt Command-History (KeyUp & KeyDown) & TypeSuggestions (Tab)")

        return true;
    }

}

class View {

    constructor(){

        this.events = {}
        this.events.submit = () => {}

        this.root = document.querySelector(".console");
        this.console = this.root.querySelector(".inner")
        this.form = this.root.querySelector("form")
        this.input = this.root.querySelector("input")

        this.history = JSON.parse(localStorage.getItem("tipp-console-history") ?? "[]");

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
            },
            "cache": {
                "clear": {},
            },
            "guard": {
                "watch": {}
            }
        }

        this.index = -1;

        this.form.onsubmit = e => {
            e.preventDefault()
            this.submit();
        }

        this.input.addEventListener("keydown",e => {
            if(e.code == 'Enter'){
                e.preventDefault()
                this.submit()
            } else if(e.code == 'ArrowUp') {
                e.preventDefault()
                this.historyUp()
            } else if(e.code == 'ArrowDown') {
                e.preventDefault()
                this.historyDown()
            } else if(e.code == 'Tab'){
                e.preventDefault()
                this.tab();
            }
        });

        window.addEventListener("swipeUp",e => {
            this.historyUp()
        })

        window.addEventListener("swipeDown",e => {
            this.historyDown()
        })

        window.addEventListener("swipeRight",e => {
            this.tab()
        })
        

    }

    submit(){
        if(this.input.value.replace(/ /gi,"") != "" && controller.socket.state == 2){
            if(this.input.value != this.history[0]){
                this.history.unshift(this.input.value);
                localStorage.setItem("tipp-console-history",JSON.stringify(this.history.slice(0,100)))
            }
            this.index = -1;
            this.events.submit({value: this.input.value})
            this.input.value = "";
        }
    }

    historyUp(){
        if(this.index + 1 < this.history.length){
            this.index++;
            this.input.value = this.history[this.index];
        }
    }

    historyDown(){
        if(this.index > 0){
            this.index--;
            this.input.value = this.history[this.index];
        } else if(this.index == 0){
            this.index--;
            this.input.value = "";
        }
    }

    tab(){
        var m = this.suggestion(this.commands,this.input.value.split(" "))
        if(m != ""){ this.input.value = m; }
    }

    suggestion(options, split){
        if(Object.keys(options).length < 1 || split.length < 1 ){ return ""; }
        var p = Object.keys(options).filter(k => k.toLowerCase().indexOf(split[0].toLowerCase()) == 0);
        if(p.length == 1){
            split.shift();
            return p + " " + this.suggestion(options[p],split)
        } else {
            return split[0];
        }
    }

    addOutput(text){
        var s = document.createElement("span");
        s.innerHTML = this.bake(text);
        return this.console.appendChild(s);
    }

    bake(text){
        var t = document.createTextNode(text);
        var p = document.createElement("p");
        p.appendChild(t);
        var r = p.innerHTML;
        r = r.replace(/("[^"]+")/ig,'<i>$1</i>')
        r = r.replace(/\n/g,"<br/>")
        r = r.replace(/((?:https?:\/\/)(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/ig,'<a target="_blank" href="$1">$1</a>')
        return r;
    }

    addCommand(text){
        var e = this.addOutput(text)
        e.classList.add("cmd");
        return e;
    }

    addError(text){
        var e = this.addOutput(text)
        e.classList.add("error");
        return e;
    }

    addInfo(text){
        var e = this.addOutput(text)
        e.classList.add("info");
        return e;
    }

}