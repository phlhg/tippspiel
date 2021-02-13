window.addEventListener("DOMContentLoaded",function(){
    APP = new App();
});

/**
 * Main class of the application
 */
class App {

    constructor(){
        this.router = new Router(this);
        this.models = {}
        this.models.games = new GameList();

        this.setRoutes()
        this.setGlobalEvents()

        this.router.find(window.location.pathname);
    }

    setRoutes(){
        this.router.setErrorHandler(ErrorController);
        this.router.add("/",HomeController);
        this.router.add("/profile/",ProfileController);
        this.router.add("/signin/",SignInController);
        this.router.add("/signup/",SignUpController);
    }

    /** Adds global event listeners */
    setGlobalEvents(){
        setTimeout(function(){ document.body.classList.remove("loading"); },1000);

        this.setEvents(document.body);

        window.addEventListener("popstate", e => {
            this.router.find(window.location.pathname);
        })

        document.addEventListener("DOMNodeRemoved", e => {
            e.target.dispatchEvent(new Event("removed"));
        });
    }

    setEvents(root){
        Array.from(root.querySelectorAll("a[href]")).filter(a => {
            return a.getAttribute("href").indexOf("http") != 0 && a.getAttribute("href").indexOf("//") != 0
        }).forEach(a => {
            a.onclick = e => {
                e.preventDefault();
                this.router.load(a.getAttribute("href"));
            }
        })
    }

}


class Router {

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

    load(path){
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
        return this.load(match.groups ? match.groups : {});
    }

    load(params){
        params = params ?? {}
        this.controller._load(params);
        return true;
    }

    unload(){
        this.controller._unload();
    }

}

class Controller {
    
    constructor(route){
        this.active = false;
        this.route = route;
        this.router = this.route.router;
        this.app = this.router.app;

        this.params = {};
        this.models = this.app.models;
        this.dom = {}
        this.dom.root = this.route.root;

        this.init();
    }

    init(){
        console.log("Initialized")
    }

    _load(params){
        this.active = true;
        this.params = params ?? {};
        this.load();
        this.dom.root.classList.add("active");
        this.app.setEvents(this.dom.root);
    }

    load(){
        console.log("Loaded with ",this.params)
    }

    _unload(){
        this.dom.root.classList.remove("active")
        if(this.active){ setTimeout(() => { this.unload() }, 400); }
        this.active = false;
    }

    unload(){
        console.log("Unloaded");
    }

}

class ErrorController extends Controller {

    constructor(...args){
        super(...args);
        this.dom.root.classList.add("tipp-error-page");
        this.dom.root.innerHTML = `<div class="inner"><h3>Whoops...</h3><p>Sorry for the inconvenience, but this seems like a deadend. We will investigate this further.</p><a href="/" class="button">Return to Home</a></div>`;
        this.dom.root.querySelector(".button").onclick = e => {
            e.preventDefault();
            this.router.load("/");
        }
    }

}

class ProfileController extends Controller {

    constructor(...args){
        super(...args);
    }

    load(){
        this.router.load("/signup/");
    }

}

class SignUpController extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.dom.root.classList.add("tipp-login-page");
        this.dom.root.innerHTML = `<div class="inner">
            <h3>Registrieren</h3>
            <p>Gib deinen Namen und deine E-Mail ein und erhalte von uns einen Zugangscode.</p>
            <form>
                <input type="name" placeholder="Name: z.B. Max Mustermann" />
                <input type="email" placeholder="E-Mail: z.B. max.mustermann@beispiel.ch" />
                <input type="submit" value="Registrieren"/>
            </form>
            <span class="meta">Falls du schon einen Account hast, <a href="/signin/">melde dich an</a></span>
        </div>`;
    }

}

class SignInController extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.dom.root.classList.add("tipp-login-page");
        this.dom.root.innerHTML = `<div class="inner">
            <h3>Anmelden</h3>
            <p>Gib deinen Zugangscode <i>aus der E-Mail</i>, die wir dir gesendet haben, ein.</p>
            <form>
                <input type="text" pattern="TPS[0-9]{9}" placeholder="Zugangscode: z.B. TPS123456789" />
                <input type="submit" value="Anmelden"/>
            </form>
            <span class="meta">Falls du noch keinen Account hast, <a href="/signup/">registriere dich</a></span>
        </div>`
    }

}

class HomeController extends Controller {

    constructor(...args){
        super(...args);
    }

    load(){
        this.models.games.get([1,2]).forEach(game => {
            let view = new GameTileView(game)
            this.dom.root.appendChild(view.getHtml());
        });
    }

    unload(){
        this.dom.root.innerHTML = "";
    }

}

class GameTileView {
    
    constructor(data){
        this.data = data;
        this.dom = {};
        this._setupDom();
        this._updateDom();
        this._func = function(e){
            if(e.detail?.type == "game" && e.detail?.id == this.data.id)
                this._updateDom();
        }.bind(this);
        window.addEventListener("datachange", this._func);
        this.dom.wrapper.addEventListener("removed",e => {
            window.removeEventListener("datachange",this._func)
        });
    }

    _setupDom(){
        this.dom.wrapper = document.createElement("a");
        this.dom.wrapper.setAttribute("href",`/game/${this.data.id}/${this.data.team1.name.toLowerCase()}-${this.data.team2.name.toLowerCase()}/`)
        this.dom.wrapper.classList.add("game-tile");
        this.dom.wrapper.innerHTML = `<span class="live-indicator">live</span><span class="title"><span class="tflag"></span> <span class="t"></span> <span class="tflag"></span></span><span class="meta"></span><div class="live-view"><iframe allowfullscreen></iframe></div>`;
        this.dom.title = this.dom.wrapper.querySelector(".title > .t")
        this.dom.flag1 = this.dom.wrapper.querySelectorAll(".title .tflag")[0]
        this.dom.flag2 = this.dom.wrapper.querySelectorAll(".title .tflag")[1]
        this.dom.meta = this.dom.wrapper.querySelector(".meta");
        this.dom.iframe = this.dom.wrapper.querySelector("iframe");
    }

    _updateDom(){
        this.dom.title.innerText = `${this.data.team1.name} ${this.data.team1.points}:${this.data.team2.points} ${this.data.team2.name}`;
        this.dom.flag1.setAttribute("data-t",this.data.team1.name.toLowerCase());
        this.dom.flag2.setAttribute("data-t",this.data.team2.name.toLowerCase());
        this.dom.meta.innerText = `${("0"+this.data.start.getDate()).slice(-2)}.${("0"+(this.data.start.getMonth()+1)).slice(-2)} ${("0"+this.data.start.getHours()).slice(-2)}:${("0"+this.data.start.getMinutes()).slice(-2)} | ${this.data.tippsCount} Tipps`;
    }

    getHtml(){
        return this.dom.wrapper;
    }

}

class GameList {

    constructor(){
        this.list = {};
        this.list[1] = new Game({
            id: 1,
            start: 0,
            status: Game.UPCOMING,
            progress: Game.NORMAL,
            location: "Bern, Stade de Suisse",
            tippsCount: 2,
            team1: {
                name: "SUI",
                points: 0,
                pointsExt: 0,
                pointsPenalty: 0,
                scorers: []
            },
            team2: {
                name: "ESP",
                points: 0,
                pointsExt: 0,
                pointsPenalty: 0,
                scorers: []
            }
        });
        this.list[2] = new Game({
            id: 2,
            start: 0,
            status: Game.UPCOMING,
            progress: Game.NORMAL,
            location: "Zürich, Letzigrund",
            tippsCount: 0,
            team1: {
                name: "GER",
                points: 0,
                pointsExt: 0,
                pointsPenalty: 0,
                scorers: []
            },
            team2: {
                name: "FRA",
                points: 0,
                pointsExt: 0,
                pointsPenalty: 0,
                scorers: []
            }
        });
    }

    get(ids){
        return ids.map(id => {
            if(this.list.hasOwnProperty(id))
                return this.list[id];
        })
    }

}

class Game {

    constructor(data){
        this.id = -1;
        this.start = new Date(0);
        this.status = Game.UPCOMING;
        this.progress = Game.NORMAL;
        this.location = "";
        this.tippsCount = 0;

        this.team1 = {}
        this.team1.name = "TM1";
        this.team1.points = 0;
        this.team1.pointsExt = 0;
        this.team1.pointsPenalty = 0;
        this.team1.scorers = [];

        this.team2 = {}
        this.team2.name = "TM2";
        this.team2.points = 0;
        this.team2.pointsExt = 0;
        this.team2.pointsPenalty = 0;
        this.team2.scorers = [];

        this._update(data);
    }

    _update(data){
        this.id = data.id ?? this.id;
        this.start = data.start ? new Date(data.start) : this.start;
        this.status = data.status ?? this.status;
        this.progress = data.progress ?? this.progress;
        this.location = data.location ?? this.location;
        this.tippsCount = data.tippsCount ?? this.tippsCount;

        this.team1.name = data.team1?.name ?? this.team1.name;
        this.team1.points = data.team1?.points ?? this.team1.points;
        this.team1.pointsExt = data.team1?.pointsExt ?? this.team1.pointsExt;
        this.team1.pointsPenalty = data.team1?.pointsPenalty ?? this.team1.pointsPenalty;
        this.team1.scorers = data.team1?.scorers ?? this.team1.scorers;

        this.team2.name = data.team2?.name ?? this.team2.name;
        this.team2.points = data.team2?.points ?? this.team2.points;
        this.team2.pointsExt = data.team2?.pointsExt ?? this.team2.pointsExt;
        this.team2.pointsPenalty = data.team2?.pointsPenalty ?? this.team2.pointsPenalty;
        this.team2.scorers = data.team2?.scorers ?? this.team2.scorers;
    }

    update(data){
        this._update(data);
        window.dispatchEvent(new CustomEvent("datachange",{
            detail: { type: "game", id: this.id }
        }))
    }

}

/** Enumerations for Game.state */
Game.UPCOMING = 0;
Game.RUNNING = 1;
Game.PENDING = 2;
Game.ENDED = 3;

/** Enumerations for Game.progress */
Game.NORMAL = 0;
Game.OVERTIME = 1;
Game.PENALTY = 2;