import Controller from '../controller'
import NoConnections from '../../views/errors/noconnection';

export default class NoConnection extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(NoConnections);
    }



}