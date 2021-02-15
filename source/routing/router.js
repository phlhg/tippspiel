import Route from './route.js'
import Debugger from '../debugger'

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
            if(route == undefined){
                Debugger.warn(this,`Did not find "${path}" - Serving error page`)()
                this.error.load(); 
            } else {
                Debugger.log(this,`Loading "${path}"`)()
                route.take(path);
            }
        },400);
    }

    forward(path){
        Debugger.log(this,`Forwarding to "${path}"`)();
        window.history.replaceState({}, '', path);
        return this.find(path);
    }

    load(path){
        window.history.pushState({}, '', path);
        return this.find(path);
    }

}