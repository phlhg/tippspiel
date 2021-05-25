import Section from '../section';

export default class NotFound extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.classList.add("tipp-error-page");
        this.view.root.innerHTML = `<div class="inner"><h3>${Lang.get("section/errors/notfound/title")}</h3><p>${Lang.get("section/errors/notfound/desc")}</p><a href="/" class="button">${Lang.get("section/errors/notfound/btn")}</a></div>`;
        
        this.view.btn = this.view.root.querySelector(".button");
        this.view.btn.onclick = () => { App.router.load("/"); }
    }

}