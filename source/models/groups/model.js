import Manager from '../model'
import Request from '../request';
import Group from './group'

/** Users Model */
export default class Groups extends Manager {

    constructor(){
        super(Group)

    }

    getClientGroups(){
        return this.getAll(App.client.groups);
    }

    async create(name){
        var r = new Request("group_create",{ name: name })
        if(!(await r.run())){ return r; }
        App.client.groups.push(parseInt(r.data.id))
        return r;
    }

    async rename(id, name){
        var r = new Request("group_rename",{ group: id, name: name })
        if(!(await r.run())){ return r; }
        await App.model.groups.update([id]);
        return r;
    }

    async join(token){
        var r = new Request("group_join",{ token: token })
        if(!(await r.run())){ return r; }
        var id = parseInt(r.data.id)
        if(!App.client.groups.includes(id)){ App.client.groups.push(id) }
        await App.model.groups.update([id]);
        return r;
    }

    async leave(id){
        var r = new Request("group_leave",{ group: id })
        if(!(await r.run())){ return r; }
        App.client.removeGroup(id)
        if(App.client.groups.includes(id)){ App.client.groups.splice(App.client.groups.indexOf(id), 1); }
        return r;
    }

    async resetToken(id){
        var r = new Request("group_reset_token",{ group: id })
        if(!(await r.run())){ return r; }
        await App.model.groups.update([id]);
        return r;
    }

}