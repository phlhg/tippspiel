import View from './view'

export default class Error extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.classList.add("tipp-error-page");
        this.root.innerHTML = `<div class="inner"><h3>Whoops...</h3><p>Sorry for the inconvenience, but this seems like a deadend. We will investigate this further.</p><a href="/" class="button">Return to Home</a></div>`;
        this.button = this.root.querySelector(".button");
    }

}