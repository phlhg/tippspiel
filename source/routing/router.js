import Route from './route.js'

export default class Router {

    constructor(app){
        this.app = app
        this.root = document.querySelector(".tipp-section-wrapper");
        this.error = null;
        this.routes = [];
    }

    add(pattern, controller){
        this.routes.push(new Route(this, pattern, controller));
    }

    setErrorHandler(controller){
        this.error = new Route(this, 'errorHandler', controller);
    }

    find(path){
        this.routes.forEach(r => r.unload())
        this.error.unload()
        setTimeout(() => {
            let route = this.routes.find(r => r.matches(path));
            console.log("Navigating to "+path);
            if(route == undefined){
                this.error.load(); 
            } else {
                route.take(path);
            }
        },400);
    }

    forward(path){
        window.history.replaceState({}, '', path);
        return this.find(path);
    }

    load(path){
        window.history.pushState({}, '', path);
        return this.find(path);
    }

}