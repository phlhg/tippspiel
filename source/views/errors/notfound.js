import View from '../view'

export default class NotFound extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("tipp-error-page");
        this.root.innerHTML = `<div class="inner"><h3>${Lang.get("section/errors/notfound/title")}</h3><p>${Lang.get("section/errors/notfound/desc")}</p><a href="/" class="button">${Lang.get("section/errors/notfound/btn")}</a></div>`;
        
        this.btn = this.root.querySelector(".button");
        this.btn.onclick = () => { this.event("click",{}); }
    }

}