import Route from './route.js'
import Debugger from '../debugger'

export default class Router {

    constructor(app){
        this.app = app
        this.error = null;
        this.routes = [];
        this.handler = [];

        this.lastRoute = null;
        this.lastPath = null
        this.lastParams = {};

    }

    add(pattern, section){
        this.routes.push(new Route(pattern, section));
        return this.routes[this.routes.length-1]
    }

    setErrorHandler(section){
        this.error = new Route('errorHandler', section);
        return this.error;
    }

    async showError(params){
        params = params ?? {}
        for(var r of this.routes){ await r.unload() }
        await this.error.unload()
        await this.error.load(params)
    }

    async find(path, params){
        params = params ?? {}
        for(var r of this.routes){ await r.unload() }
        await this.error.unload()
        let route = this.routes.find(r => r.matches(path));
        if(route == undefined){
            await this.error.load()
        } else {
            Debugger.log(this,`Loading "${path}"`)()
            this.lastRoute = route;
            this.lastPath = path;
            this.lastParams = params;
            try{
                await route.take(path, params)
            } catch(e){
                Debugger.error(route.section,"Exception:",e)()
                await this.error.load()
            }
        }
    }

    async forward(path, params){
        params = params ?? {}
        Debugger.log(this,`Forwarding to "${path}"`)();
        window.history.replaceState(params, '', path);
        return await this.find(path, params);
    }

    async overwrite(path, params){
        params = params ?? {}
        Debugger.log(this,`Overwriting to "${path}"`)();
        return await this.find(path, params);
    }

    back(fallback, params){
        fallback = fallback ?? "/"
        params = params ?? {}
        if(history.length > 0){
            history.back()
        } else {
            this.load(fallback, params);
        }
    }

    async load(path, params){
        params = params ?? {}
        window.history.pushState(params, '', path);
        return await this.find(path, params);
    }

    async reload(){
        if(this.lastRoute == null || this.lastPath == null){ return false; }
        for(var r of this.routes){ await r.unload() }
        await this.error.unload()
        this.lastRoute.take(this.lastPath,this.lastParams)
    }

}