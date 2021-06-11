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
            this.dom.suggestions.innerHTML = "";
            if(this.dom.search.value.replace(/ /ig,"") != ""){
                (await this.getSuggestions(this.dom.search.value)).slice(0,4).forEach(e => {
                    var s = document.createElement("span");
                    s.innerHTML = `<span class="icon" style="background-image: url(${e.img});"></span>`;

                    // Prevent XSS in text
                    var t = document.createElement("span");
                    t.innerText = e.text;
                    s.appendChild(t);

                    s.onmousedown = () => { this._select(e); }
                    s.ontouchstart = () => { this._select(e); }
                    this.dom.suggestions.appendChild(s);
                });
            }
        }

        this.dom.search.onfocus = e => {
            this.dom.search.value = "";
            this.dom.icon.style.backgroundImage = "";
            this.dom.suggestions.innerHTML = "";
        }

        this.dom.search.onblur = e => {
            this._update();
        }

    }

    _select(element){
        this.selected = element;
        this.dom.suggestions.innerHTML = "";
        this._update();
        this.onchange();
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