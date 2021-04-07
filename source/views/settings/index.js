import View from '../view'

export default class Settings extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `<div class="tipp-box">
            <span class="icon"><span class="material-icons">translate</span></span>
            <span class="title">${Lang.get("section/settings/lang/title")}</span>
            <span class="meta">${Lang.get("section/settings/lang/desc")}</span>
            <select name="lang" style="margin-top: 10px"></select>
        </div>
        <a class="tipp-box" href="https://phlhg.ch/report/2/tippspiel/" target="_blank" >
            <span class="icon"><span class="material-icons">feedback</span></span>
            <span class="title">${Lang.get("section/settings/report/title")}</span>
            <span class="meta">${Lang.get("section/settings/report/desc")}</span>
        </a>
        <a class="tipp-box" href="https://phlhg.ch/about/contact/" target="_blank" >
            <span class="icon"><span class="material-icons">lightbulb</span></span>
            <span class="title">${Lang.get("section/settings/idea/title")}</span>
            <span class="meta">${Lang.get("section/settings/idea/desc")}</span>
        </a>
        <span class="tipp-box console-button">
            <span class="icon"><span class="material-icons">code</span></span>
            <span class="title">${Lang.get("section/settings/console/title")}</span>
        </span>
        `

        this.select = this.root.querySelector("select");

        Lang.available.forEach(element => {
            var o = document.createElement("option");
            o.value = element;
            o.innerText = __LANG[element]._name;
            this.select.appendChild(o)
        });
        this.select.value = Lang.id

        this.select.onchange = e => {
            if(Lang.setLanguage(this.select.value)){
                document.body.classList.add("loading");
                setTimeout(() => window.location.reload(),1000);
            }
        }

        this.root.querySelector(".console-button").onclick = () => {
            window.open ("/console/","Tippspiel-Console","resizable=1,width=720,height=450");
        }

    }

    show(){
        if(App.client.permission?.console == true){
            this.root.querySelector(".console-button").style.display = "block";
        } else {
            this.root.querySelector(".console-button").style.display = "none";
        }
    }

}