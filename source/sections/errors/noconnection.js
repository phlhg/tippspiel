import Section from '../section';

export default class NoConnections extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.classList.add("tipp-error-page");
        this.view.root.innerHTML = `<div class="inner"><h3>${Lang.get("section/errors/noconnection/title")}</h3><p>${Lang.get("section/errors/noconnection/desc")}</p><a class="button">${Lang.get("section/errors/noconnection/btn")}</a></div>`;

        this.view.btn = this.view.root.querySelector(".button");
        this.view.btn.onclick = () => { App.router.load(location.pathname); }
    }

}