import Element from '../element'
import { EventStatus } from './enum'

/** Class representing a Event */
export default class Event extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} name Name of the event */
        this.name = ""

        this.short = "e";

        /** @property {string} description Short description of the event */
        this.description = ""

        /** @property {Date} deadline Deadline for submitting EventTipps on this event */
        this.deadline = new Date(0);

        /** @property {number} status Current status of the event */
        this.status = EventStatus.UPCOMING;

        /** @property {number[]} games Games of the event */
        this.games = [];

        /** @property {number[]} tipps EventTipps of the event */
        this.tipps = [];

        /** @property {number[]} teams Teams taking part in the event */
        this.teams = []

        /** @property {number} winner Team, which won the event */
        this.winner = 0;

        /** @property {number} topscorer Player, which scored the most goals at the event */
        this.topscorer = 0;

        this.url = "";
        
        this.set(data)
    }

    /**
     * Sets properties of the Group
     * @param {object} data - Properties to update
     */
    set(data){
        this.name = data.name ?? this.name
        this.short = data.hasOwnProperty("name") ? data.name.toLowerCase().replace(/ /ig,"-").replace(/[^a-z0-9-_]/ig,'') : this.short;
        this.description = data.description ?? this.description
        this.deadline = data.hasOwnProperty("deadline") ? new Date(parseInt(data.deadline)*1000) : this.deadline
        this.status = parseInt(data.status ?? this.status)
        this.games = Array.from(data.games ?? this.games).map(i => parseInt(i))
        this.tipps = Array.from(data.tipps ?? this.tipps).map(i => parseInt(i))
        this.teams = Array.from(data.teams ?? this.teams).map(i => parseInt(i))
        this.winner = parseInt(data.winner ?? this.winner)
        this.topscorer = parseInt(data.topscorer ?? this.topscorer)

        this.url = `/event/${this.id}/${this.short}/`;
    }

    makeTipp(data){
        return App.model.eventTipps.makeTipp({
            event: this.id,
            winner: data.winner,
            topscorer: data.topscorer
        })
    }

    hasOwnTipp(){
        var id = this.tipps.filter(id => App.client.eventTipps.includes(id))
        return id.length > 0
    }

    getOwnTipp(){
        var id = this.tipps.filter(id => App.client.eventTipps.includes(id))
        if(id.length > 0){ return App.model.eventTipps.get(id[0]); }
        return new Promise(resolve => { resolve(false) })
    }

    getTipps(){
        return App.model.eventTipps.getAll(this.tipps);
    }

    getRanking(){
        return App.model.events.getRanking(this.id);
    }

    getGames(){
        return App.model.games.getAll(this.games);
    }

    getTeams(){
        return App.model.teams.getAll(this.teams);
    }

    addGame(team1, team2, time, location){
        return App.model.events.addGame(this.id, team1, team2, time, location);
    }

}