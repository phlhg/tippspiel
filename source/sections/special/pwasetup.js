import Section from '../section';

export default class PWASetup extends Section {

    constructor(...args){
        super(...args);
    }

    async load(){
        localStorage.setItem("tipp-is-pwa", "true");
        App.router.load("/");
    }

}