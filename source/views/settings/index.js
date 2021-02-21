import View from '../view'

export default class Settings extends View {

    constructor(...args){
        super(...args)
    }

    init(){
        this.root.innerHTML = `<div class="tipp-box">
            <span class="title">${Lang.get("section/settings/lang/title")}</span>
            <span class="meta">${Lang.get("section/settings/lang/desc")}</span>
            <select name="lang" style="margin-top: 10px"></select>
        </div>`

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
    }

}