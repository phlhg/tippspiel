import Element from '../element'

/** Class representing a user */
export default class User extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} name - Name of the user */
        this.name = "Anon"

        this.short = "A"

        /** @property {number} points - Points of the user */
        this.points = 0

        this.groups = [];

        this.banned = false;

        this.set(data)
    }

    /**
     * Sets properties of the User
     * @param {object} data - Properties of to update
     */
    set(data){
        this.name = data.name ?? this.name
        this.points = parseInt(data.points ?? this.points)
        this.groups = Array.from(data.groups ?? this.groups).map(id => parseInt(id))
        this.banned = (data.banned ?? "false") == "true"
    }

    isInGroup(){
        return App.client.groupsActive.filter(g =>  this.groups.indexOf(g) > -1).length > 0;
    }

}