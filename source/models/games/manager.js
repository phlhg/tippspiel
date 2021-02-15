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
                name: "SUI",
                points: 0,
                pointsExt: 0,
                pointsPenalty: 0,
                scorers: []
            },
            team2: {
                name: "ESP",
                points: 0,
                pointsExt: 0,
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
                name: "GER",
                points: 0,
                pointsExt: 0,
                pointsPenalty: 0,
                scorers: []
            },
            team2: {
                name: "FRA",
                points: 0,
                pointsExt: 0,
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