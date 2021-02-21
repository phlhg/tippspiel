import Element from '../element'
import { EventStatus } from './enum'

/** Class representing a Event */
export default class Event extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} name Name of the event */
        this.name = ""

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

        /** @property {number} winner Team, which won the event */
        this.winner = 0;

        /** @property {number} topscorer Player, which scored the most goals at the event */
        this.topscorer = 0;
        
        this.set(data)
    }

    /**
     * Sets properties of the Group
     * @param {object} data - Properties to update
     */
    set(data){
        this.name = data.name ?? this.name
        this.description = data.description ?? this.description
        this.deadline = data.hasProperty("deadline") ? new Date(data.deadline) : this.deadline
        this.status = parseInt(data.status ?? this.status)
        this.games = Array.from(data.games ?? this.games).map(i => parseInt(i))
        this.tipps = Array.from(data.tipps ?? this.tipps).map(i => parseInt(i))
        this.winner = parseInt(data.winner ?? this.winner)
        this.topscorer = parseInt(data.topscorer ?? this.topscorer)
    }

}