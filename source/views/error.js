import View from './view'

export default class Error extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("tipp-error-page");
        this.root.innerHTML = `<div class="inner"><h3>Hoppla...</h3><p>Das sieht nach einer Sackgasse aus.<br/>Wir werden dies untersuchen.</p><a href="/" class="button">Zurück zu Start</a></div>`;
        this.button = this.root.querySelector(".button");
    }

}