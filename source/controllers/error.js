import Controller from './controller'
import ErrorView from '../views/error'

export default class Error extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(ErrorView);
        this.view.button.onclick = e => {
            e.preventDefault();
            this.router.load("/");
        }
    }



}