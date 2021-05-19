import Controller from '../controller'
import NotFoundView from '../../views/errors/notfound'

export default class NotFound extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(NotFoundView);
        this.view.on("click",() => { App.router.load("/"); })
    }



}