import View from './view'

export default class Profile extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("fullscreen");
        this.root.innerHTML = `<div class="tipp-console">
            <input type="text" placeholder="command"></input>
        </div>`;

        this.console = this.root.querySelector(".tipp-console")
        this.input = this.console.querySelector("input")

        this.history = [];
        this.index = -1;

        this.input.addEventListener("keydown",e => {
            if(e.code == 'Enter' && this.input.value.replace(/ /gi,"") != ""){
                e.preventDefault()
                this.history = this.history.slice(Math.max(this.index,0));
                this.history.unshift(this.input.value);
                this.index = -1;
                this.event("submit",{value: this.input.value}).then(r => {
                    if(r){ this.input.value = ""; }
                });
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
            }
        });

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