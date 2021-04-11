import Controller from '../controller';
import View from '../../views/settings/index'

export default class Settings extends Controller {

    constructor(...args){
        super(...args);
    }

    init(){
        this.setView(View);
    }

}