import { GamePhase, GameStatus } from './enums';
import Model from '../model'
import Game from './game'

/** Games model */
export default class Games extends Model {

    /** Creates a game model */
    constructor(){
        super(Game);

        /** @todo Added elements for development - Remove in production */
        this.list[1] = new Game({
            id: 1,
            start: 0,
            status: GameStatus.ENDED,
            phase: GamePhase.PENALTY,
            location: "Bern, Stade de Suisse",
            tippsCount: 2,
            team1: {
                name: "Schweiz",
                short: "SUI",
                points: 1,
                pointsPenalty: 3,
                scorers: []
            },
            team2: {
                name: "Spanien",
                short: "ESP",
                points: 1,
                pointsPenalty: 4,
                scorers: []
            }
        });
        this.list[2] = new Game({
            id: 2,
            start: 0,
            status: GameStatus.RUNNING,
            phase: GamePhase.NORMAL,
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
            status: GameStatus.UPCOMING,
            phase: GamePhase.NORMAL,
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
    async load(ids){
        await new Promise(resolve => setTimeout(resolve,1000));
        this.missing(ids).forEach(id => {
            if(id == 5 || id == 7){ return; }
            this.list[id] = new Game({
                id: id,
                start: 0,
                status: GameStatus.UPCOMING,
                phase: GamePhase.NORMAL,
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
        })
    }

}