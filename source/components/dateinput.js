export default class DateInput {

    constructor(){

        this.date = new Date();
        this.date.setMinutes(Math.ceil((this.date.getMinutes()+1)/5)*5);

        this.dom = {};
        this.dom.root = document.createElement("div");
        this.dom.root.classList.add("tipp-date-input");

        this.dom.root.innerHTML = `
            <select class="day"><option disabled >${Lang.get("date/name/day")}</option></select>
            <select class="month"><option disabled >${Lang.get("date/name/month")}</option></select>
            <select class="year"><option disabled >${Lang.get("date/name/year")}</option></select>
            <select class="hour"><option disabled >${Lang.get("date/name/hour")}</option></select>
            <select class="minute"><option disabled >${Lang.get("date/name/minute")}</option></select>
        `

        this.dom.day = this.dom.root.querySelector(".day");
        this.dom.month = this.dom.root.querySelector(".month");
        this.dom.year = this.dom.root.querySelector(".year");
        this.dom.hour = this.dom.root.querySelector(".hour");
        this.dom.minute = this.dom.root.querySelector(".minute");

        for(var i = 1; i <= 31; i++){  this.dom.day.innerHTML += `<option value="${i}">${("0"+i).slice(-2)}</option>` }
        for(var i = 1; i <= 12; i++){  this.dom.month.innerHTML += `<option value="${i}">${("0"+i).slice(-2)}</option>` }
        for(var i = this.date.getFullYear(); i <= this.date.getFullYear() + 5; i++){  this.dom.year.innerHTML += `<option value="${i}">${i}</option>` }
        for(var i = 0; i <= 23; i++){  this.dom.hour.innerHTML += `<option value="${i}">${("0"+i).slice(-2)}</option>` }
        for(var i = 0; i < 60; i = i + 5){  this.dom.minute.innerHTML += `<option value="${i}">${("0"+i).slice(-2)}</option>` }

        this.set(this.date);
        this.update();

        this.setEvents();
    }

    setEvents(){
        [this.dom.day,this.dom.month, this.dom.year, this.dom.hour, this.dom.minute].forEach(s => {
            s.onchange = e => {
                this.update();
            }
        })
    }

    set(date){
        this.dom.day.value = date.getDate();
        this.dom.month.value = date.getMonth()+1;
        this.dom.year.value = date.getFullYear();
        this.dom.minute.value = date.getMinutes();
        this.dom.hour.value = date.getHours();
    }

    update(){

        this.date = new Date(
            this.dom.year.value,
            this.dom.month.value - 1,
            this.dom.day.value,
            this.dom.hour.value,
            this.dom.minute.value
        );

        if(this.isValid()){
            this.dom.root.classList.remove("invalid");
        } else {
            this.dom.root.classList.add("invalid"); 
        }

    }

    isValid(){
        return this.date.getFullYear() == this.dom.year.value &&
        this.date.getMonth() + 1 == this.dom.month.value &&
        this.date.getDate() == this.dom.day.value && 
        this.date.getHours() == this.dom.hour.value && 
        this.date.getMinutes() == this.dom.minute.value &&
        this.date.getTime() > Date.now()
    }

    getDate(){
        return this.date;
    }

    getHtml(){
        return this.dom.root;
    }

}