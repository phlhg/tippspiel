window.addEventListener("DOMContentLoaded",function(){
    APP = new App();
});

/**
 * Main class of the application
 */
class App {

    constructor(){
        this.router = new Router();

        this.setRoutes()
        this.setEvents()

        this.router.find(window.location.pathname);
    }

    setRoutes(){
        this.router.add("/",HomeController);
        this.router.setErrorHandler(ErrorController);
    }

    /** Adds global event listeners */
    setEvents(){
        setTimeout(function(){ document.body.classList.remove("loading"); },2000);

        Array.from(document.querySelectorAll("a[href]")).filter(a => {
            return a.getAttribute("href").indexOf("http") != 0 && a.getAttribute("href").indexOf("//") != 0
        }).forEach(a => {
            a.onclick = e => {
                e.preventDefault();
                this.router.run(a.getAttribute("href"));
            }
        })

        window.addEventListener("popstate", e => {
            this.router.find(window.location.pathname);
        })
    }

}


class Router {

    constructor(){
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
        this.routes.forEach(r => r.root.classList.remove("active"))
        this.error.root.classList.remove("active");
        setTimeout(() => {
            let route = this.routes.find(r => r.matches(path));
            console.log("Navigating to "+path);
            if(route == undefined){
                this.error.run({}); 
            } else {
                route.take(path);
            }
        },400);
    }

    run(path){
        window.history.pushState({}, '', path);
        return this.find(path);
    }

}

class Route {

    constructor(router, pattern, controller){
        this.router = router;
        this.pattern = this._bakePattern(pattern)

        this.root = document.createElement("section");
        this.root.setAttribute("data-route",pattern);
        this.router.root.appendChild(this.root);

        this.controller = new controller(this);
    }

    _bakePattern(p){
        p = p.replace(/\//ig,"\\/");
        p = p.replace(/\{(\w+)\}/ig,'(?<$1>[^/]+)')
        p = '^'+p+'$'
        return new RegExp(p,'i');
    }

    matches(path){
        return this.pattern.test(path);
    }

    take(path){
        if(!this.matches(path)){ return false; }
        var match = this.pattern.exec(path);
        return this.run(match.groups ? match.groups : {});
    }

    run(params){
        this.root.classList.add("active")
        this.controller.run(params);
        return true;
    }

}

class Controller {
    
    constructor(route){
        this.route = route;
        this.dom = {}
        this.dom.root = this.route.root;
    }

    run(params){
        console.log(params);
    }

}

class ErrorController extends Controller {

    constructor(root){
        super(root);
        this.dom.root.classList.add("tipp-error-page");
        this.dom.root.innerHTML = `<div class="inner"><h3>Whoops...</h3><p>Sorry for the inconvenience, but this seems like a deadend. We will investigate this further.</p><a href="/" class="button">Return to Home</a></div>`;
        this.dom.root.querySelector(".button").onclick = e => {
            e.preventDefault();
            this.router.run("/");
        }
    }

    run(params){
        
    }

}

class HomeController extends Controller {

    constructor(root){
        super(root);

        const game1 = new Game();
        const game2 = new Game();
        const game3 = new Game();

        this.dom.root.appendChild(game1.getHtml());

        game1.data.t1Name = "SUI";
        game1.data.t2Name = "ESP";
        game1._updateDom();

        this.dom.root.appendChild(game2.getHtml());
        game2.data.t1Name = "GER";
        game2.data.t2Name = "FRA";
        game2._updateDom();

        this.dom.root.appendChild(game3.getHtml());
        game3.data.t1Name = "RUS";
        game3.data.t2Name = "UKR";
        game3._updateDom();

    }

    run(params){

    }

}

console.log(HomeController);
console.log(Controller);

function Game(){
    this.dom = {};
    this.data = {};
    this.data.t1Name = "";
    this.data.t2Name = "";
    this.data.t1Points = 0;
    this.data.t2Points = 0;
    this.data.kickoff = new Date();
    this.data.stream = "";
    this.data.tipps = 0;
    this._setupDom();
    this._updateDom();

    this.dom.wrapper.classList.add("live")

    this.test();

    /*setInterval(function(){
        if(this.dom.wrapper.classList.contains("live")){
            this.dom.wrapper.classList.remove("live")
        } else {
            this.dom.wrapper.classList.add("live")
        }
    }.bind(this),5000);*/
}

Game.prototype.test = function(){
    setTimeout(function(){
        this.data.tipps++;
        this._updateDom();
        this.test();
    }.bind(this),10000*Math.random());
}

Game.prototype._setupDom = function(){
    this.dom.wrapper = document.createElement("a");
    this.dom.wrapper.classList.add("game-tile");
    this.dom.wrapper.innerHTML = `<span class="live-indicator">live</span><span class="title"><span class="tflag"></span> <span class="t"></span> <span class="tflag"></span></span><span class="meta"></span><div class="live-view"><iframe allowfullscreen></iframe></div>`;
    this.dom.title = this.dom.wrapper.querySelector(".title > .t")
    this.dom.flag1 = this.dom.wrapper.querySelectorAll(".title .tflag")[0]
    this.dom.flag2 = this.dom.wrapper.querySelectorAll(".title .tflag")[1]
    this.dom.meta = this.dom.wrapper.querySelector(".meta");
    this.dom.iframe = this.dom.wrapper.querySelector("iframe");
}

Game.prototype._updateDom = function(){
    this.dom.title.innerText = `${this.data.t1Name} ${this.data.t1Points}:${this.data.t2Points} ${this.data.t2Name}`;
    this.dom.flag1.setAttribute("data-t",this.data.t1Name.toLowerCase());
    this.dom.flag2.setAttribute("data-t",this.data.t2Name.toLowerCase());
    this.dom.meta.innerText = `${("0"+this.data.kickoff.getDate()).slice(-2)}.${("0"+(this.data.kickoff.getMonth()+1)).slice(-2)} ${("0"+this.data.kickoff.getHours()).slice(-2)}:${("0"+this.data.kickoff.getMinutes()).slice(-2)} | ${this.data.tipps} Tipps`;
}

Game.prototype.getHtml = function(){
    return this.dom.wrapper;
}



Game.prototype = Object.create(Game.prototype)
Game.prototype.constructor = Game