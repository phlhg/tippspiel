/** Default Model Element  */
export default class Element {
    
    /**
     * Creates a default model element
     * @param {string} type - Type of the element
     * @param {int} id - Id of the element
     */
    constructor(id){
        this.id = parseInt(id);
    }

    /**
     * Set new properties
     * @param {object} data - List of properties
     */
    set(data){ }

    /**
     * Update properties and notify user interface
     * @param {object} data - List of properties
     */
    update(data){
        this.set(data);
        window.dispatchEvent(new CustomEvent("datachange",{
            detail: { type: this.constructor.name.toLowerCase(), id: this.id }
        }))
    }

}