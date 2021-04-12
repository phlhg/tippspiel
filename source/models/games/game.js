import { GamePhase, GameStatus } from "./enums";
import Element from "../element";

/** Class representing a Game */
export default class Game extends Element {

    constructor(data){
        super(data.id);

        this.event = 0;
        this.start = new Date(0);
        this.stream = "";
        this.status = GameStatus.UPCOMING;
        this.phase = GamePhase.NORMAL;
        this.location = "";

        this.team1 = {}
        this.team1.id = 0;
        this.team1.name = "T1"
        this.team1.short = "T1"
        this.team1.score = 0;
        this.team1.penalty = 0;

        this.team2 = {}
        this.team2.id = 0;
        this.team2.name = "T2"
        this.team2.short = "T2";
        this.team2.score = 0;
        this.team2.penalty = 0;

        this.scorers = [];
        this.tipps = [];

        this.short = ""
        this.url = ""

        this.set(data);
    }

    /**
     * Set properties of the game
     * @param {object} data - Properties of to update
     */
    set(data){
        this.event = parseInt(data.event ?? this.event);
        this.start = ('start' in data ? new Date(parseInt(data.start)*1000) : this.start);
        this.stream = data.stream ?? this.stream;
        this.status = parseInt(data.status ?? this.status);
        this.phase = parseInt(data.phase ?? this.phase);
        this.location = data.location ?? this.location;

        this.team1.id = parseInt(data.team1 ?? this.team1.id);
        this.team1.name = data.short1 ? Lang.get("teams/"+data.short1.toLowerCase()) : this.team1.name;
        this.team1.short = data.short1 ?? this.team1.short;
        this.team1.score = parseInt(data.score1 ?? this.team1.score);
        this.team1.penalty = parseInt(data.penaltyScore1 ?? this.team1.penalty);

        this.team2.id = parseInt(data.team2 ?? this.team2.id);
        this.team2.name = data.short2 ? Lang.get("teams/"+data.short2.toLowerCase()) : this.team2.name;
        this.team2.short = data.short2 ?? this.team2.short;
        this.team2.score = parseInt(data.score2 ?? this.team2.score);
        this.team2.penalty = parseInt(data.penaltyScore2 ?? this.team2.penalty);
        
        this.scorers = Array.from(data.scorers ?? this.scorers).map(id => parseInt(id));
        this.tipps = Array.from(data.tipps ?? this.tipps).map(id => parseInt(id))

        this.short = this.team1.short.toLowerCase() + "-" + this.team2.short.toLowerCase()
        this.url = `/game/${this.id}/${this.short}/`
    }

    /** 
     * Get the teams participating in the game 
     * @return {Promise[]} Returns an array with a promise for both teams
     */
    getTeams(){
        return App.model.teams.getAll([this.team1.id,this.team2.id])
    }

    /**
     * Gets all tipps made for the game
     * @return {Promise[]} Returns an promise for each tipp
     */
    getTipps(){
        return App.model.gameTipps.getAll(this.tipps)
    }

    getScorers(){
        return App.model.players.getAll(this.scorers)
    }


    hasOwnTipp(){
        var id = this.tipps.filter(id => App.client.gameTipps.includes(id))
        return id.length > 0
    }

    makeTipp(data){
        return App.model.gameTipps.makeTipp({
            id: this.id,
            bet1: data.bet1,
            bet2: data.bet2,
            winner: data.winner,
            topscorer: data.topscorer
        })
    }

    /**
     * Gets the tipp of the current clien for this game
     * @return {Promise} Resolves to a GameTipp if successfull, otherwise to false
     */
    getOwnTipp(){
        var id = this.tipps.filter(id => App.client.gameTipps.includes(id))
        if(id.length > 0){ return App.model.gameTipps.get(id[0]); }
        return new Promise(resolve => { resolve(false) })
    }

    getSuggestedPlayers(){
        return App.model.players.getSuggested(this.id);
    }

    report(data){
        return App.model.games.report(this.id, data);
    }

    async nextPhase(){
        var r = await App.model.games.nextPhase(this.id);
        if(!r){ return false; }
        if(this.phase == GamePhase.NORMAL){ this.phase = GamePhase.OVERTIME; }
        else if(this.phase == GamePhase.OVERTIME){ this.phase = GamePhase.PENALTY; }
        this.status = GameStatus.RUNNING;
        return true;
    }

}