/**
 * Enumeration for Event.status
 * @readonly
 * @enum
 */
export var EventStatus = {
    /** The Event is upcoming */
    UPCOMING: 0,
    /** The Event is running */
    RUNNING: 1,
    /** The Event is finished - Results are missing */
    PENDING: 2,
    /* The Event is finished - Results are available */
    ENDED: 3
}