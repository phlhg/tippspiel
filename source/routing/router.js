import Route from './route.js'
import Debugger from '../debugger'

export default class Router {

    constructor(app){
        this.app = app
        this.error = null;
        this.routes = [];
        this.handler = []
    }

    add(pattern, controller){
        this.routes.push(new Route(pattern, controller));
        return this.routes[this.routes.length-1]
    }

    setErrorHandler(controller){
        this.error = new Route('errorHandler', controller);
        return this.error;
    }

    find(path){
        this.routes.forEach(r => r.unload())
        this.error.unload()
        let route = this.routes.find(r => r.matches(path));
        if(route == undefined){
            Debugger.warn(this,`Did not find "${path}" - Serving error page`)()
            setTimeout(() => { this.error.load() }, 250);
        } else {
            Debugger.log(this,`Loading "${path}"`)()
            setTimeout(() => { route.take(path) }, 250);
        }
    }

    forward(path){
        Debugger.log(this,`Forwarding to "${path}"`)();
        window.history.replaceState({}, '', path);
        return this.find(path);
    }

    overwrite(path){
        Debugger.log(this,`Overwriting to "${path}"`)();
        return this.find(path);
    }

    back(fallback){
        fallback = fallback ?? "/"
        if(history.length > 0){
            history.back()
        } else {
            this.load(fallback);
        }
    }

    load(path){
        window.history.pushState({}, '', path);
        return this.find(path);
    }

}