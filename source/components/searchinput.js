export default class SearchInput {

    constructor(name, placeholder, img){

        this.img = img;

        this.root = document.createElement("div");
        this.root.classList.add("tipp-searchselect");
        this.root.innerHTML = 
            `<span class="icon"></span>
            <input type="text" autocomplete="off" placeholder="${placeholder}" name="${name}"/>
            <div class="suggestions"></div>`

        this.dom = {}
        this.dom.input = this.root.querySelector("input[type='text']");
        this.dom.suggestions = this.root.querySelector(".suggestions");

        this.dom.icon = this.root.querySelector(".icon");
        this.dom.icon.style.backgroundImage = `url(${this.img})`

        this.getSuggestions = async (input) => [];
        this.onchange = () => {}

        this._setEvents();
    }

    _setEvents(){

        this.dom.input.onkeyup = async e => {
            this._fillSuggestions(this.dom.input.value);
        }

        this.dom.input.onfocus = e => {
            this.dom.suggestions.innerHTML = "";
            this._fillSuggestions("");
        }

        this.dom.input.onblur = e => {
            setTimeout(() => { this.dom.suggestions.innerHTML = ""; }, 100);
        }

    }

    _select(value){
        this.dom.input.value = value;
        this.onchange();
        setTimeout(() => { this.dom.suggestions.innerHTML = ""; }, 100);
    }

    async _fillSuggestions(value){
        this.dom.suggestions.innerHTML = "";
        (await this.getSuggestions(value)).forEach(v => {
            var s = document.createElement("span");
            s.innerHTML = `<span class="icon" style="background-image: url(${this.img});"></span>`

            // Prevent XSS in value
            var t = document.createElement("span");
            t.innerText = v;
            s.appendChild(t);

            s.onclick = () => { this._select(v); }
            this.dom.suggestions.appendChild(s);
        });
    }

    getValue(){
        return this.value;
    }

    getHtml(){
        return this.root;
    }

    reset(){
        this.dom.input.value = "";
        this.dom.suggestions.innerHTML = "";
        this.dom.icon.style.backgroundImage = `url(${this.img})`
    }

}