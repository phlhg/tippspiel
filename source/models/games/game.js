import Model from "../model";

/**
 * Class representing a Game
 * @extends Model
 */
class Game extends Model {

    /**
     * Create a game
     * @param {object} data - Properties of the game
     */
    constructor(data){
        super("game",data.id);

        this.start = new Date(0);
        this.status = Game.STATUS.UPCOMING;
        this.phase = Game.PHASE.NORMAL;
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

}

/** 
 * Enum for the state of the game 
 * @readonly
 * @enum
 * */
Game.STATUS = {}
/** The game is upcoming */
Game.STATUS.UPCOMING = 0;
/** The game is running */
Game.STATUS.RUNNING = 1;
/** The game is assumed finished - Waiting for results */
Game.STATUS.PENDING = 2;
/** The game has ended - Results are available */
Game.STATUS.ENDED = 3;

/** 
 * Enum for the phase of the game 
 * @readonly
 * @enum
 * */
Game.PHASE = {}
/** The game is in the normal phase */
Game.PHASE.NORMAL = 0;
/** The game is in the overtime phase */
Game.PHASE.OVERTIME = 1;
/** The game is in the penalty phase */
Game.PHASE.PENALTY = 2;

export default Game;