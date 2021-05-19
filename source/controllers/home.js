import Controller from './controller';
import HomeView from '../views/home'

export default class Home extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(HomeView);
    }

    async load(){
        if(!App.promptConnection()){ return false; }
        
        this.view.addEvent(App.model.events.get(1))
        this.view.addEvent(App.model.events.get(2))

        App.model.games.getHot().then(data => {
          data.upcoming.forEach(game => { this.view.addUpcoming(game) })
          data.over.forEach(game => { this.view.addOver(game) })
        })
    }

    unload(){
        this.view.clear();
    }

}