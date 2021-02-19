import { GamePhase, GameStatus } from "./enums";
import Element from "../element";

/** Class representing a Game */
export default class Game extends Element {

    /**
     * Create a game
     * @param {object} data - Properties of the game
     */
    constructor(data){
        super(data.id);

        this.event = -1;
        this.start = new Date(0);
        this.status = GameStatus.UPCOMING;
        this.phase = GamePhase.NORMAL;
        this.location = "[LOCATION]";

        this.team1 = {}
        this.team1.id = -1;
        this.team1.name = "T1"
        this.team1.short = "[T1S]"
        this.team1.score = 0;
        this.team1.penalty = 0;
        this.team1.scorers = [];

        this.team2 = {}
        this.team2.id = -1;
        this.team2.name = "T2"
        this.team2.short = "[T2S]";
        this.team2.score = 0;
        this.team2.penalty = 0;
        this.team2.scorers = [];

        this.tipps = [];

        this.set(data);
    }

    /**
     * Set properties of the game
     * @param {object} data - Properties of the game to update
     */
    set(data){
        this.event = data.event ?? this.event;
        this.start = ('start' in data ? new Date(parseInt(data.start)*1000) : this.start);
        this.status = data.status ?? this.status;
        this.phase = data.phase ?? this.phase;
        this.location = data.location ?? this.location;

        this.team1.id = data.team1 ?? this.team1.id;
        this.team1.name = data.short1 ? Lang.get("teams/"+data.short1.toLowerCase()) : this.team1.name;
        this.team1.short = data.short1 ?? this.team1.short;
        this.team1.score = data.score1 ?? this.team1.score;
        this.team1.penalty = data.penaltyScore1 ?? this.team1.penalty;
        this.team1.scorers = Array.from(data.scorers ?? this.team1.scorers);

        this.team2.id = data.team2 ?? this.team2.id;
        this.team2.name = data.short2 ? Lang.get("teams/"+data.short2.toLowerCase()) : this.team2.name;
        this.team2.short = data.short2 ?? this.team2.short;
        this.team2.score = data.score2 ?? this.team2.score;
        this.team2.penalty = data.penaltyScore2 ?? this.team2.penalty;
        this.team2.scorers = Array.from(data.scorers ?? this.team2.scorers);

        this.tipps = Array.from(data.tipps ?? this.tipps);
    }

    /** 
     * Get the teams participating in the game 
     * @return {Promise[]} Returns an array with a promise for both teams
     */
    getTeams(){
        return App.models.teams.getAll([this.team1.id,this.team2.id])
    }

}