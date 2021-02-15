/** Default model  */
export default class Model {
    
    /**
     * Creates a default Model
     * @param {string} type - Type of the model
     * @param {int} id - Id of the model
     */
    constructor(type, id){
        /** @property {string} type - Type of the model */
        this.type = type;
        /** @property {int} id - Id of the model */
        this.id = id;
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
            detail: { type: this.type, id: this.id }
        }))
    }

}