export default class SearchSelect {

    constructor(name, placeholder){

        this.selected = {
            value: -1,
            text: "",
            img: ""
        }

        this.root = document.createElement("div");
        this.root.classList.add("tipp-searchselect");
        this.root.innerHTML = 
            `<span class="icon"></span>
            <input type="search" autocomplete="off" placeholder="${placeholder}" />
            <div class="suggestions"></div>
            <input type="hidden" name="${name}" value="-1" />`

        this.dom = {}
        this.dom.search = this.root.querySelector("input[type='search']");
        this.dom.input = this.root.querySelector("input[type='hidden']");
        this.dom.icon = this.root.querySelector(".icon");
        this.dom.suggestions = this.root.querySelector(".suggestions");

        this.getSuggestions = async (input) => [];
        this.onchange = () => {}

        this._setEvents();
    }

    _setEvents(){

        this.dom.search.onkeyup = async e => {
            this._fillSuggestions(this.dom.search.value);
        }

        this.dom.search.onfocus = e => {
            this.dom.search.value = "";
            this.dom.icon.style.backgroundImage = "";
            this._fillSuggestions("");
        }

        this.dom.search.onblur = e => {
            setTimeout(() => { 
                this._update();
                this.dom.suggestions.innerHTML = "";
            }, 250);
        }

    }

    _select(element){
        this.selected = element;
        this._update();
        this.onchange();
        setTimeout(() => { this.dom.suggestions.innerHTML = ""; }, 250);
    }

    async _fillSuggestions(value){
        this.dom.suggestions.innerHTML = "";
        (await this.getSuggestions(value)).forEach(e => {
            var s = document.createElement("span");
            s.innerHTML = `<span class="icon" style="background-image: url(${e.img});"></span>`;

            // Prevent XSS in text
            var t = document.createElement("span");
            t.innerText = e.text;
            s.appendChild(t);

            s.onclick = ev => { ev.preventDefault(); this._select(e); }
            this.dom.suggestions.appendChild(s);
        });
    }

    _update(){
        this.dom.input.value = this.selected.value;
        this.dom.search.value = this.selected.text;
        this.dom.icon.style.backgroundImage = `url(${this.selected.img})`;
    }

    getSelected(){
        return this.selected;
    }

    getHtml(){
        return this.root;
    }

    reset(){
        this.selected = { value: -1, text: "", img: "" }
        this.dom.input.value = -1;
        this.dom.search.value = "";
        this.dom.icon.style.backgroundImage = "";
        this.dom.suggestions.innerHTML = "";
    }

}