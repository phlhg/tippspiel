import View from './view'

export default class Error extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("tipp-error-page");
        this.root.innerHTML = `<div class="inner"><h3>${Lang.get("section/error/title")}</h3><p>${Lang.get("section/error/desc")}</p><a href="/" class="button">${Lang.get("section/error/btn")}</a></div>`;
        this.button = this.root.querySelector(".button");
    }

}