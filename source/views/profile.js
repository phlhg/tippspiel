import View from './view'

export default class Profile extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `<div class="text">Profile</div>`;
    }

    setClient(client){
        this.root.innerHTML = `<div class="text">${client.name}<br/></div>`
        if(App.client.permission.console ?? false){
            var b = document.createElement("a");
            b.innerText = "$ Console";
            b.classList.add("button");
            b.onclick = () => {
                window.open ("/console/","Tippspiel-Console","resizable=1,width=720,height=450");
            }
            this.root.querySelector(".text").appendChild(b);
        }
        
    }

}