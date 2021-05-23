class TippPrompt {
    
    constructor(text, confirm, deny, type){
        this.text = text;
        this.confirm = confirm ?? "Yes";
        this.deny = deny ?? "No";
        this.type = type ?? "";

        this._onclick = result => {};


        this.dom = {}

        this._setup();
    }

    _setup(){
        this.dom.root = document.createElement("div");
        this.dom.root.classList.add("tipp-prompt-wrapper");
        if(this.type != ""){ this.dom.root.classList.add(this.type); }

        this.dom.root.innerHTML = 
            `<div class="tipp-prompt">
                <span class="text">${this.text}</span>
                <div class="actions">
                    <span></span>
                    <span></span>
                </div>
            </div>`;

        this.dom.confirm = this.dom.root.querySelector(".actions span:nth-child(2)")
        this.dom.deny = this.dom.root.querySelector(".actions span:nth-child(1)")

        this.dom.confirm.innerText = this.confirm
        this.dom.deny.innerText = this.deny

        this.dom.confirm.onclick = () => { this._click(true); }
        this.dom.deny.onclick = () => { this._click(false); }

        document.body.appendChild(this.dom.root);
    }

    prompt(){
        setTimeout(() => { this.dom.root.classList.add("active"); }, 20);
        return new Promise(resolve => {
            this._onclick = result => resolve(result)
        })
    }

    _click(result) {
        this._onclick(result ? true : false);
        this.dom.root.classList.remove("active");
        setTimeout(() => { this.dom.root.remove(); },500);
    }

}

TippPrompt.make = function(text, confirm, deny){
    var p = new TippPrompt(text, confirm, deny)
    return p.prompt();
}

TippPrompt.danger = function(text, confirm, deny){
    var p = new TippPrompt(text, confirm, deny, "danger")
    return p.prompt();
}

TippPrompt.confirm = function(text, confirm, deny){
    var p = new TippPrompt(text, confirm, deny, "confirm")
    return p.prompt();
}

window.TippPrompt = TippPrompt;

export default TippPrompt;