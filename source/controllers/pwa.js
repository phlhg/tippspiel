import Controller from './controller';

export default class PWASetup extends Controller {

    constructor(...args){
        super(...args);
    }

    async load(){
        localStorage.setItem("tipp-is-pwa", "true");
        return App.router.load("/");
    }

}