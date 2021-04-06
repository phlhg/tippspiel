import Controller from '../controller'
import GameTippView from '../../views/game/tipp'

export default class GameTipp extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(GameTippView)
    }

    async load(){
        if(!App.client.active){ return App.client.prompt() };

        this.game = await App.model.games.get(this.params.id);
        this.view.setGame(this.game);

        if(this.game.hasOwnTipp()){
            this.game.getOwnTipp().then(t => { this.view.setTipp(t); })
        }

        this.view.on("submit",data => {
            this.game.makeTipp({
                bet1: data.b1,
                bet2: data.b2,
                winner: data.winner,
                topscorer: data.topscorer
            }).then(r => {
                if(r){
                    App.router.forward(`/game/${this.game.id}/${this.game.team1.short.toLowerCase()}-${this.game.team2.short.toLowerCase()}/`)
                } else {
                    this.view.error("Something went wrong");
                }
            })
        })
    }

    unload(){
        this.view.clear();
    }

}