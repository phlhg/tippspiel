export default class Controller {
    
    constructor(route){
        this.active = false;
        this.route = route;
        this.router = this.route.router;
        this.app = this.router.app;

        this.params = {};
        this.models = this.app.models;
        this.view = {}
        this.view.root = this.route.root;

        this.init();
    }

    init(){
        console.log("Initialized")
    }

    _load(params){
        this.active = true;
        this.params = params ?? {};
        this.load();
        this.view.root.classList.add("active");
        this.app.setEvents(this.view.root);
    }

    load(){
        console.log("Loaded with ",this.params)
    }

    _unload(){
        this.view.root.classList.remove("active")
        if(this.active){ setTimeout(() => { this.unload() }, 400); }
        this.active = false;
    }

    unload(){
        console.log("Unloaded");
    }

}