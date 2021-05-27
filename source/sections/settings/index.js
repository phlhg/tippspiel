import Section from '../section'
import TippPrompt from '../../helper/prompt'
import TippNotification from '../../helper/notification';

export default class Settings extends Section {

    constructor(...args){
        super(...args)
    }

    init(){
        this.view.root.innerHTML = `<div class="tipp-box language">
            <span class="icon"><span class="material-icons">translate</span></span>
            <span class="title">${Lang.get("section/settings/lang/title")}</span>
            <span class="meta">${Lang.get("section/settings/lang/desc")}</span>
            <select name="lang" style="margin-top: 10px"></select>
        </div>
        <div class="tipp-box theme">
            <span class="icon"><span class="material-icons">dark_mode</span></span>
            <span class="title">${Lang.get("section/settings/theme/title")}</span>
            <span class="meta">${Lang.get("section/settings/theme/desc")}</span>
            <select name="theme" style="margin-top: 10px">
                <option value="auto">${Lang.get("section/settings/theme/auto")}</option>
                <option value="light">${Lang.get("section/settings/theme/light")}</option>
                <option value="dark">${Lang.get("section/settings/theme/dark")}</option>
            </select>
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
        <a class="tipp-box signout-button" style="background: #e00; border-color: #e00; color: #fff;" >
            <span class="icon"><span class="material-icons">logout</span></span>
            <span class="title">${Lang.get("section/settings/logout/name")}</span>
        </a>
        `

        // Language

        this.view.languageSelect = this.view.root.querySelector(".language select");

        Lang.available.forEach(element => {
            var o = document.createElement("option");
            o.value = element;
            o.innerText = __LANG[element]._name;
            this.view.languageSelect.appendChild(o)
        });

        this.view.languageSelect.value = Lang.id
        this.view.languageSelect.onchange = e => {
            if(Lang.setLanguage(this.view.languageSelect.value)){
                document.body.classList.add("loading");
                setTimeout(() => window.location.reload(),500);
            }
        }

        // Theme

        this.view.themeSelect = this.view.root.querySelector(".theme select");
        this.view.themeSelect.onchange = e => {
            App.setTheme(this.view.themeSelect.value)
        }

        // Console

        this.view.consoleButton = this.view.root.querySelector(".console-button");
        this.view.consoleButton.onclick = () => { window.open ("/console/","Tippspiel-Console","resizable=1,width=720,height=450"); }

        // Signout

        this.view.signOutButton = this.view.root.querySelector(".signout-button");
        this.view.signOutButton.onclick = async () => { 
            if(await TippPrompt.danger(Lang.get("section/settings/logout/desc"),Lang.get("section/settings/logout/confirm"),Lang.get("section/settings/logout/deny"))){
                var r = await App.client.signOut(); 
                if(!r.success){
                    TippNotification.error(r.message);
                } else {
                    App.router.load("/");
                }
            }
        }

    }

    async load(){
        this.view.themeSelect.value = App.theme;
        this.view.consoleButton.style.display = App.client.permission.console ? "block" : "none"
        this.view.signOutButton.style.display = App.client.active ? "block" : "none"
    }

}