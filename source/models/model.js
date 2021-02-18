import Debugger from "../debugger";

/** Default Model */
export default class Model {

    /** Creates a default manager */
    constructor(element){

        /** @property {object} list - List of locally available elements*/
        this.list = {};
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
        return true;
    }

    /**
     * Returns the list of missing ids from an array of ids
     * @param {number[]} ids - List of ids
     * @return {number[]} List of missing ids
     */
    missing(ids){
        return ids.filter(id => !this.list.hasOwnProperty(id))
    }

    /**
     * Gets a list of elements by ids
     * @param {number[]} ids List of ids
     * @return {Game[]} List of Games matching the ids - If an Id was not found the position is null.
     */
    getAll(ids){
        var promise = this.load(ids)
        return Object.fromEntries(ids.map(id => {
            if(this.list.hasOwnProperty(id)){
                return [id, new Promise(resolve => { resolve(this.list[id]) })]
            } else {
                return [id, this.makePromise(id,promise)]
            }
        }));
    }

    /** 
     * Gets an element by id 
     * @param {number} id Id of the element
     * @return {Game} The game matching the id - Null if the id was not found.
     * */
    get(id){
        var promise = this.load([id])
        if(this.list.hasOwnProperty(id)){
            return new Promise(resolve => { resolve(this.list[id]) })
        } else {
            return this.makePromise(id,promise);
        }
    }

    makePromise(id,promise){
        return new Promise((resolve, reject) => {
            promise.then(() => {
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