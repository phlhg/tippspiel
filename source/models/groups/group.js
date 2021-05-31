import Element from '../element'

/** Class representing a group */
export default class Group extends Element {

    constructor(data){
        super(data.id)

        /** @property {string} name - Name of the group */
        this.name = "Unkown Group";

        /** @property {number} owner - User-ID of the group owner */
        this.admin = -1;

        /** @property {number[]} users - Lister of member IDs */
        this.users = []

        this.token = "";

        this.url = ""
        this.url2 = ""

        this.set(data)
    }

    /**
     * Sets properties of the Group
     * @param {object} data - Properties to update
     */
    set(data){
        this.name = data.name ?? this.name
        this.admin = parseInt(data.admin ?? this.admin);
        this.users = Array.from(data.users ?? this.users).map(i => parseInt(i))
        this.token = data.token ?? this.token

        this.url = `/groups/${this.id}/${this._url(this.name)}/`;
        this.url2 = `/groups/advanced/${this.id}/${this._url(this.name)}/`;
    }

    _url(name){
        var r = encodeURIComponent(name.toLowerCase().replace(/ /ig,"-").replace(/[^a-z0-9-_]/ig,''))
        if(r == ""){ return "-"; }
        return r;
    }

    getUsers(){
        return App.model.users.getAll(this.users);
    }

    rename(name){
        return App.model.groups.rename(this.id, name);
    }

    leave(){
        return App.model.groups.leave(this.id);
    }

    resetToken(){
        return App.model.groups.resetToken(this.id);
    }

    activate(){
        App.client.addGroup(this.id);
    }

    disable(){
        App.client.removeGroup(this.id);
    }

}