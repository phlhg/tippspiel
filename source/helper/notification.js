class TippNotification {
    
    constructor(text, duration, icon, type){
        this.text = text;
        this.icon = icon ?? "info";
        this.duration = duration ?? 5000;
        this.type = type ?? "";
        this.timeout = -1;

        this.dom = {}

        this._setup();
    }

    _setup(){
        this.dom.root = document.createElement("div");
        this.dom.root.classList.add("tipp-notification");
        if(this.type != ""){ this.dom.root.classList.add(this.type); }
        this.dom.root.innerHTML = `<span class="material-icons icon">${this.icon}</span><span class="text"></span>`;
        this.dom.root.querySelector(".text").innerText = this.text;
        document.body.appendChild(this.dom.root);
    }


    show(){
        TippNotification.queue.push(this);
        if(TippNotification.queue.length == 1){ setTimeout(() => { this._show(); }, 20); }
    }

    _show(){
        this.dom.root.classList.add("active");
        if(this.duration > -1){
            this.timeout = setTimeout(() => {
                this.hide();
            }, this.duration);
        }
    }

    hide(destroy){
        destroy = destroy ?? true
        this.dom.root.classList.remove("active");
        clearTimeout(this.timeout);
        TippNotification.queue.shift(); // Remove me from the queue 
        if(TippNotification.queue.length > 0){ setTimeout(() => {  TippNotification.queue[0]._show(); },250) } //Show the next Notification
        if(destroy){ this.destroy(); }
    }

    destroy(){
        setTimeout(() => { this.dom.root.remove(); },500);
    }

}

TippNotification.queue = [];

TippNotification.info = function(text, duration){
    duration = duration ?? 3000
    var n = new TippNotification(text, duration, "info", "info");
    n.show();
    return n;
}

TippNotification.error = function(text, duration){
    duration = duration ?? 3000
    var n = new TippNotification(text, duration, "warning", "error");
    n.show();
    return n;
}

TippNotification.success = function(text, duration){
    duration = duration ?? 3000
    var n = new TippNotification(text, duration, "done", "success");
    n.show();
    return n;
}

TippNotification.create = function(text, duration, icon, type){
    return new TippNotification(text, duration, icon, type);
}

window.TippNotification = TippNotification;

export default TippNotification;