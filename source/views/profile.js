import View from './view'

export default class Profile extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `<div class="text">Profile</div>`;
    }

    setClient(client){
        this.root.innerHTML = `<div class="text">${client.name}</div>`
    }

}