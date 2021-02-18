import Debugger from "../debugger";

/** Default Model */
export default class Model {

    /** Creates a default manager */
    constructor(element){

        /** @property {object} list - List of locally available elements*/
        this.list = {};
        
        /** @property {object} promises Currently open promises for each element */
        this.promises = {};

        /** @property {object} element Name of the elements stored in the model */
        this.element = element.name;

    }

    /** 
     * Loads elements missing elements from server
     * @param {number[]} ids - List of ids
     * @abstract
     * @async
     * */
    async load(ids){
        Debugger.error(this, `Abstract function Manager.load([${ids.slice(0,5).join(",")}]) was called`)()
    }

    /**
     * Returns the list of missing ids from an array of ids
     * @param {number[]} ids - List of ids
     * @return {number[]} List of missing ids
     */
    missing(ids){
        return ids.filter(id => (!this.list.hasOwnProperty(id) && !this.promises.hasOwnProperty(id)))
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
     * */
    get(id){
        var promise = this.load([id])
        if(this.list.hasOwnProperty(id)){ // Entry exists
            return new Promise(resolve => { resolve(this.list[id]) })
        } else {
            if(this.promises.hasOwnProperty(id)){ // Already requested
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
                    Debugger.error(this, `${this.element}(${id}) was promised, but is not available`)()
                    reject()
                }
            });
        })
    }

}