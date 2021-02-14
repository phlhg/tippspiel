import Controller from './controller';

export default class Error extends Controller {

    constructor(...args){
        super(...args);
        this.view.root.classList.add("tipp-error-page");
        this.view.root.innerHTML = `<div class="inner"><h3>Whoops...</h3><p>Sorry for the inconvenience, but this seems like a deadend. We will investigate this further.</p><a href="/" class="button">Return to Home</a></div>`;
        this.view.root.querySelector(".button").onclick = e => {
            e.preventDefault();
            this.router.load("/");
        }
    }

}