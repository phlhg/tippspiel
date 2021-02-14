import Game from './entry.js'

export default class GameList {

    constructor(){
        this.list = {};
        this.list[1] = new Game({
            id: 1,
            start: 0,
            status: Game.UPCOMING,
            progress: Game.NORMAL,
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
            status: Game.UPCOMING,
            progress: Game.NORMAL,
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

    getAll(ids){
        return ids.map(id => {
            if(this.list.hasOwnProperty(id))
                return this.list[id];
        })
    }

    get(id){
        return this.list[id];
    }

}