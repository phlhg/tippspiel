import Manager from '../manager'
import Game from './game.js'

/** 
 * Class managing local games 
 * @extends Manager
 * */
export default class GameManager extends Manager {

    /** Creates a game manager */
    constructor(){
        super();

        /** @todo Added elements for development - Remove in production */
        this.list[1] = new Game({
            id: 1,
            start: 0,
            status: Game.STATUS.UPCOMING,
            phase: Game.PHASE.NORMAL,
            location: "Bern, Stade de Suisse",
            tippsCount: 2,
            team1: {
                name: "Schweiz",
                short: "SUI",
                points: 0,
                pointsPenalty: 0,
                scorers: []
            },
            team2: {
                name: "Spanien",
                short: "ESP",
                points: 0,
                pointsPenalty: 0,
                scorers: []
            }
        });
        this.list[2] = new Game({
            id: 2,
            start: 0,
            status: Game.STATUS.UPCOMING,
            phase: Game.PHASE.NORMAL,
            location: "Zürich, Letzigrund",
            tippsCount: 0,
            team1: {
                name: "Deutschland",
                short: "GER",
                points: 0,
                pointsPenalty: 0,
                scorers: []
            },
            team2: {
                name: "Frankreich",
                short: "FRA",
                points: 0,
                pointsPenalty: 0,
                scorers: []
            }
        });

        this.list[3] = new Game({
            id: 3,
            start: 0,
            status: Game.STATUS.UPCOMING,
            phase: Game.PHASE.NORMAL,
            location: "Zürich, Letzigrund",
            tippsCount: 0,
            team1: {
                name: "Italien",
                short: "ITA",
                points: 0,
                pointsPenalty: 0,
                scorers: []
            },
            team2: {
                name: "Portugal",
                short: "POR",
                points: 0,
                pointsPenalty: 0,
                scorers: []
            }
        });

    }

    /**
     * Loads missing elements from server
     * @param {number[]} ids - List of ids
     */
    load(ids){
        let missing = this.missing(ids);
    }

}