import { GamePhase, GameStatus } from "./enums";
import Model from "../model";

/**
 * Class representing a Game
 * @extends Model
 */
export default class Game extends Model {

    /**
     * Create a game
     * @param {object} data - Properties of the game
     */
    constructor(data){
        super("game",data.id);

        this.start = new Date(0);
        this.status = GameStatus.UPCOMING;
        this.phase = GamePhase.NORMAL;
        this.location = "";
        this.tippsCount = 0;

        this.team1 = {}
        this.team1.name = "Team 1";
        this.team1.short = "TM1"
        this.team1.points = 0;
        this.team1.pointsPenalty = 0;
        this.team1.scorers = [];

        this.team2 = {}
        this.team2.name = "Team 1";
        this.team2.short = "TM2";
        this.team2.points = 0;
        this.team2.pointsPenalty = 0;
        this.team2.scorers = [];

        this.set(data);
    }

    /**
     * Set properties of the game
     * @param {object} data - Properties of the game to update
     */
    set(data){
        this.start = data.start ? new Date(data.start) : this.start;
        this.status = data.status ?? this.status;
        this.progress = data.progress ?? this.progress;
        this.location = data.location ?? this.location;
        this.tippsCount = data.tippsCount ?? this.tippsCount;

        this.team1.name = data.team1?.name ?? this.team1.name;
        this.team1.short = data.team1?.short ?? this.team1.short;
        this.team1.points = data.team1?.points ?? this.team1.points;
        this.team1.pointsPenalty = data.team1?.pointsPenalty ?? this.team1.pointsPenalty;
        this.team1.scorers = data.team1?.scorers ?? this.team1.scorers;

        this.team2.name = data.team2?.name ?? this.team2.name;
        this.team2.short = data.team2?.short ?? this.team2.short;
        this.team2.points = data.team2?.points ?? this.team2.points;
        this.team2.pointsPenalty = data.team2?.pointsPenalty ?? this.team2.pointsPenalty;
        this.team2.scorers = data.team2?.scorers ?? this.team2.scorers;
    }

}