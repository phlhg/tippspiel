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

export default Game;