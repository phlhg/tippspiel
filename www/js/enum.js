/** @enum Status of a socket response */
var ResponseState = {
    SUCCESS: 0,
    USER_ERROR: 1,
    CLIENT_ERROR: 2,
    SERVER_ERROR: 3
}

/** @enum Status of the H2RFP_SOCKET */
var SocketState = {
    CLOSED: H2RFP_SocketState_CLOSED,
    OPENING: H2RFP_SocketState_OPENING,
    OPEN: H2RFP_SocketState_OPEN,
    CLOSING: H2RFP_SocketState_CLOSING
}