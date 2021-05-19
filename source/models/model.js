import Debugger from "../debugger";

/** Default Model */
export default class Model {

    /** Creates a default manager */
    constructor(type){

        /** @property {object} list - List of locally available elements*/
        this.list = {};
        
        /** @property {object} promises Currently open promises for each element */
        this.promises = {};

        /** @property {object} element Type elements stored in the model */
        this.type = type;

    }

    /** 
     * Loads missing elements from server
     * @param {number[]} ids - List of ids
     * @async
     */
    async load(ids){
        ids = this.missing(ids);
        await this._load(ids);
    }

    async _load(ids){
        if(ids.length < 1) return;
        if(App.socket.state != SocketState.OPEN) return; 

        Debugger.log(this,`Requested data for ${this.type.name}[${ids.join(",")}]`)()
        var r = await App.socket.exec("get_data", { table: this.type.name, ids: ids })
            
        if(r.state != ResponseState.SUCCESS){
            if(parseInt(r.error) >= 0){
                Debugger.warn(this,Lang.getError(r.error,r.data))()
            } else if(r.data.hasOwnProperty("info")) {
                Debugger.warn(this,r.data.info)()
            } else {
                Debugger.warn(this,`Unbekannter Fehler beim Laden von ${this.type.name}[${ids.join(",")}] :`, r)()
            }
        } else {
            var data = Array.from(r.data);
            var delivered = data.filter(g => g != "" && g.hasOwnProperty("id")).map(g => parseInt(g.id));
            var missing = ids.filter(id => !delivered.includes(id))
            if(missing.length > 0){ Debugger.error(this,`Data for ${this.type.name}[${missing.join(",")}] was not delivered`)(); }
            r.data.filter(e => e != "").forEach(e => {
                if(!this.list.hasOwnProperty(e.id)){
                    this.list[e.id] = new this.type(e)
                } else {
                    this.list[e.id].update(e)
                }
            })
        }
    }

    /**
     * Returns the list of missing ids from an array of ids
     * @param {number[]} ids - List of ids
     * @return {number[]} List of missing ids
     */
    missing(ids){
        return ids.map(id => parseInt(id)).filter(id => (!this.list.hasOwnProperty(id) && !this.promises.hasOwnProperty(id) && id > 0))
    }

    /**
     * Gets a list of elements by ids
     * @param {number[]} ids List of ids
     * @return {Promise[]} List of Promises for the games - Resolve if the element was found, otherwise reject
     */
    getAll(ids){
        var promise = this.load(ids)
        return ids.map(id => {
            if(this.list.hasOwnProperty(id)){ // Entry exists
                return new Promise(resolve => { resolve(this.list[id]) })
            } else {
                if(id == 0){ // Dummy
                    Debugger.warn(this,`Dummy-${this.type.name} was created`)()
                    this.list[id] = new this.type({id: 0})
                    return new Promise(resolve => { resolve(this.list[id]) })
                }

                if(!this.promises.hasOwnProperty(id)) // No Request was made yet
                    this.promises[id] = this.makePromise(id,promise)
                return this.promises[id];
            }
        });
    }

    /**
     * Gets a object of elements by ids
     * @param {number[]} ids List of ids
     * @return {Promise{}} Object of Promises for the games, corresponding the id - Resolve if the element was found, otherwise reject
     */
    getObject(ids){
        var promise = this.load(ids)
        return Object.fromEntries(ids.map(id => {
            if(this.list.hasOwnProperty(id)){ // Entry exists
                return [id,new Promise(resolve => { resolve(this.list[id]) })]
            } else {
                if(id == 0){ // Dummy
                    Debugger.warn(this,`Dummy-${this.type.name} was created`)()
                    this.list[id] = new this.type({id: 0})
                    return [id,new Promise(resolve => { resolve(this.list[id]) })]
                }
                
                if(!this.promises.hasOwnProperty(id)) // No Request was made yet
                    this.promises[id] = this.makePromise(id,promise)
                return [id,this.promises[id]];
            }
        }));
    }

    /** 
     * Gets an element by id 
     * @param {number} id Id of the element
     * @return {Promise} A promise for the game - Resolves if element was found, otherwise rejects
     */
    get(id){
        var promise = this.load([id])
        if(this.list.hasOwnProperty(id)){ // Entry exists
            return new Promise(resolve => { resolve(this.list[id]) })
        } else {
            if(id == 0){ // Dummy
                Debugger.warn(this,`Dummy-${this.type.name} was created`)()
                this.list[id] = new this.type({id: 0})
                return new Promise(resolve => { resolve(this.list[id]) })
            } else if(this.promises.hasOwnProperty(id)){ // Already requested
                return this.promises[id];
            } else {
                this.promises[id] = this.makePromise(id,promise)
                return this.promises[id];
            }
        }
    }

    makePromise(id,promise){
        return new Promise((resolve, reject) => {
            promise.then(() => {
                delete this.promises[id];
                if(this.list.hasOwnProperty(id) && this.list[id] != null){
                    resolve(this.list[id]);
                } else { 
                    resolve(null)
                }
            });
        })
    }

    async update(data){
        var ids = data.map(id => parseInt(id)).filter(id => this.list.hasOwnProperty(id))
        if(ids.length < 1){ return; }
        await this._load(ids);
    }

}