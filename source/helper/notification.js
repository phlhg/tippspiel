class Notification {
    
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
        this.dom.root.innerHTML = `<span class="material-icons icon"></span><span class="text"></span>`;
        this.dom.icon = this.dom.root.querySelector(".icon");
        this.dom.text = this.dom.root.querySelector(".text");

        this.dom.icon.innerText = this.icon;
        this.dom.text.innerText = this.text;

        document.body.appendChild(this.dom.root);
    }


    show(){
        Notification.queue.push(this);
        if(Notification.queue.length == 1){ this._show(); }
    }

    _show(){
        setTimeout(() => { this.dom.root.classList.add("active"); }, 20);
        this.timeout = setTimeout(() => {
            this.hide();
        }, this.duration);
    }

    hide(destroy){
        destroy = destroy ?? true
        this.dom.root.classList.remove("active");
        clearTimeout(this.timeout);
        Notification.queue.shift(); // Remove me from the queue 
        if(Notification.queue.length > 0){ setTimeout(() => {  Notification.queue[0]._show(); },250) } //Show the next Notification
        if(destroy){ this.destroy(); }
    }

    destroy(){
        setTimeout(() => { this.dom.root.remove(); },500);
    }

}

Notification.queue = [];

Notification.info = function(text){
    var n = new Notification(text, 3000, "info", "info");
    n.show();
    return n;
}

Notification.error = function(text){
    var n = new Notification(text, 3000, "warning", "error");
    n.show();
    return n;
}

Notification.success = function(text){
    var n = new Notification(text, 3000, "done", "success");
    n.show();
    return n;
}

Notification.create = function(text, duration, icon, type){
    return new Notification(text, duration, icon, type);
}

window.Notification = Notification;

export default Notification;