import { GamePhase, GameStatus } from './enums';
import Model from '../model'
import Game from './game'
import Debugger from '../../debugger';

/** Games model */
export default class Games extends Model {

    /** Creates a game model */
    constructor(){
        super(Game)
    }

    async getHot(){
        var r = await App.socket.exec("hotGames", {})
        if(r.state != ResponseState.SUCCESS){
            if(r.error != 0){
                Debugger.warn(this,Lang.getError(r.error,r.data))()
            } else if(r.data.hasOwnProperty("info")) {
                Debugger.warn(this,r.data.info)()
            } else {
                Debugger.warn(this,`Unbekannter Fehler beim Laden von "getHot":`, r)()
            }
            return {
                upcoming: [],
                over: []
            };
        } else {
            // To get all games together
            this.getAll(Array.from(r.data.upcoming).concat(Array.from(r.data.over)).map(i => parseInt(i)));
            return {
                upcoming: this.getAll(Array.from(r.data.upcoming).map(i => parseInt(i))),
                over: this.getAll(Array.from(r.data.over).map(i => parseInt(i)))
            }
        }
    }

    async getSuggestedLocations(){
        var r = await App.socket.exec("suggest_locations", {})
        if(r.state != ResponseState.SUCCESS){
            if(r.error != 0){
                Debugger.warn(this,Lang.getError(r.error,r.data))()
            } else if(r.data.hasOwnProperty("info")) {
                Debugger.error(this,r.data.info)()
            } else {
                Debugger.error(this,`Unbekannter Fehler beim Laden von "suggest_locations":`, r)()
            }
            return [];
        } else {
            return r.data.map(e => e.toString());
        }
    }

    async create(team1, team2, time, location){
        var r = await App.socket.exec("createGame", {
            location: location,
            time: time,
            name: "",
            stream: "",
            event: 1,
            team1: team1,
            team2: team2,
        })

        if(r.state != ResponseState.SUCCESS){
            if(r.error != 0){
                Debugger.warn(this,Lang.getError(r.error,r.data))()
            } else if(r.data.hasOwnProperty("info")) {
                Debugger.error(this,r.data.info)()
            } else {
                Debugger.error(this,`Unbekannter Fehler beim Erstellen des Spiels:`, r)()
            }
            return -1;
        } else {
            return parseInt(r.data.id);
        }

    }

}