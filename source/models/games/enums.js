/** 
 * Enum for the state of the game 
 * @readonly
 * @enum
 * */
export var GameStatus = {
    /** The game is upcoming */
    UPCOMING: 0,
    /** The game is running */
    RUNNING: 1,
    /** The game is assumed finished - Waiting for results */
    PENDING: 2,
    /** The game has ended - Results are available */
    ENDED: 3
}

/** 
 * Enum for the phase of the game 
 * @readonly
 * @enum
 * */
export var GamePhase = {
    /** The game is in the normal phase */
    NORMAL: 0,
    /** The game is in the overtime phase */
    OVERTIME: 1,
    /** The game is in the penalty phase */
    PENALTY: 2,
}