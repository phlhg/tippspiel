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
        <a class="tipp-box console-button">
            <span class="icon"><span class="material-icons">code</span></span>
            <span class="title">${Lang.get("section/settings/console/title")}</span>
        </a>
        <a class="tipp-box signout-button">
            <span class="icon"><span class="material-icons">logout</span></span>
            <span class="title">${Lang.get("section/settings/logout/name")}</span>
            <span class="meta">${Lang.get("section/settings/logout/desc")}</span>
        </a>
        `

        this.languageSelect = this.root.querySelector("select");

        Lang.available.forEach(element => {
            var o = document.createElement("option");
            o.value = element;
            o.innerText = __LANG[element]._name;
            this.languageSelect.appendChild(o)
        });

        this.languageSelect.value = Lang.id

        this.languageSelect.onchange = e => {
            if(Lang.setLanguage(this.languageSelect.value)){
                document.body.classList.add("loading");
                setTimeout(() => window.location.reload(),1000);
            }
        }

        this.consoleButton = this.root.querySelector(".console-button");
        this.consoleButton.onclick = () => { window.open ("/console/","Tippspiel-Console","resizable=1,width=720,height=450"); }

        this.signOutButton = this.root.querySelector(".signout-button");
        this.signOutButton.onclick = () => { App.client.signout(); }

    }

    show(){
        this.consoleButton.style.display = App.client.permission.console ? "block" : "none"
        this.signOutButton.style.display = App.client.active ? "block" : "none"
    }

}