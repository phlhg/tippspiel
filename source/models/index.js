import Debugger from "../debugger"
import Events from "./events/model"
import EventTipps from "./eventtipps/model"
import Games from "./games/model"
import GameTipps from "./gametipps/model"
import Groups from "./groups/model"
import Players from "./players/model"
import Teams from "./teams/model"
import Users from "./users/model"

export default class Model {

    constructor(){

        this.events = new Events()
        this.eventTipps = new EventTipps()
        this.games = new Games()
        this.gameTipps = new GameTipps()
        this.groups = new Groups()
        this.players = new Players()
        this.teams = new Teams()
        this.users = new Users()

    }

    clear(){

        this.events = new Events()
        this.eventTipps = new EventTipps()
        this.games = new Games()
        this.gameTipps = new GameTipps()
        this.groups = new Groups()
        this.players = new Players()
        this.teams = new Teams()
        this.users = new Users()

        Debugger.log(this,"Cleared synchronized objects")();

    }

    update(data){

        Debugger.log(this,"Distributing server update")();

        if(Array.from(data.User ?? []).map(i => parseInt(i)).includes(App.client.id)){ 
            App.client.handleServerUpdate(); 
        }

        this.eventTipps.update(Array.from(data.EventTipp ?? []).map(i => parseInt(i)))
        this.events.update(Array.from(data.Event ?? []).map(i => parseInt(i)))
        this.gameTipps.update(Array.from(data.GameTipp ?? []).map(i => parseInt(i)))
        this.games.update(Array.from(data.Game ?? []).map(i => parseInt(i)))
        this.players.update(Array.from(data.Player ?? []).map(i => parseInt(i)))
        this.teams.update(Array.from(data.Team ?? []).map(i => parseInt(i)))
        this.users.update(Array.from(data.User ?? []).map(i => parseInt(i)))
        this.groups.update(Array.from(data.Group ?? []).map(i => parseInt(i)))

    }

}