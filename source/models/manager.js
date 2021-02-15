import Debugger from "../debugger";

/** Default Manager for managing local elements */
export default class Manager {

    /** Creates a default manager */
    constructor(){

        /** @property {object} list - List of locally available elements*/
        this.list = {};

    }

    /** 
     * Loads elements missing elements from server
     * @param {number[]} ids - List of ids
     * @abstract
     * */
    load(ids){
        Debugger.error(this, "Abstract function Manager.load(ids) was called")()
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
        this.load(ids)
        return ids.map(id => { return this.list.hasOwnProperty(id) ? this.list[id] : null })
    }

    /** 
     * Gets an element by id 
     * @param {number} id Id of the element
     * @return {Game} The game matching the id - Null if the id was not found.
     * */
    get(id){
        this.load([id]);
        return this.list[id];
    }

}