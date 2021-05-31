import Route from './route.js'
import Debugger from '../debugger'

export default class Router {

    constructor(app){
        this.app = app
        this.error = null;
        this.routes = [];
        this.handler = []
    }

    add(pattern, section){
        this.routes.push(new Route(pattern, section));
        return this.routes[this.routes.length-1]
    }

    setErrorHandler(section){
        this.error = new Route('errorHandler', section);
        return this.error;
    }

    async showError(){
        for(var r of this.routes){ await r.unload() }
        await this.error.unload()
        await this.error.load()
    }

    async find(path){
        for(var r of this.routes){ await r.unload() }
        await this.error.unload()
        let route = this.routes.find(r => r.matches(path));
        if(route == undefined){
            await this.error.load()
        } else {
            Debugger.log(this,`Loading "${path}"`)()
            try{
                await route.take(path)
            } catch(e){
                Debugger.error(route.section,"Exception:",e)()
                await this.error.load()
            }
        }
    }

    async forward(path){
        Debugger.log(this,`Forwarding to "${path}"`)();
        window.history.replaceState({}, '', path);
        return await this.find(path);
    }

    async overwrite(path){
        Debugger.log(this,`Overwriting to "${path}"`)();
        return await this.find(path);
    }

    back(fallback){
        fallback = fallback ?? "/"
        if(history.length > 0){
            history.back()
        } else {
            this.load(fallback);
        }
    }

    async load(path){
        window.history.pushState({}, '', path);
        return await this.find(path);
    }

    async reload(){
        return await this.find(window.location.pathname)
    }

}