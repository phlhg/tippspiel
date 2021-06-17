class TippDate { }

TippDate.toString = function(date){
    var now = new Date();
    var tomorrow = new Date(now.getTime() + 1000 * 60 * 60 * 24)
    var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24)
    var delta = Math.abs(now.getTime() - date.getTime()) / 1000

    if(now - date > 0){
        // Past
        if(delta < 60){
            return Lang.get("date/past_sec")
        } else if(delta < 60 * 105){
            return Lang.get("date/past_min",{
                m: Math.floor(delta/60)
            })
        } else if(date.toDateString() == now.toDateString()){
            return Lang.get("date/past_today",{
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        } else if(date.toDateString() == yesterday.toDateString()){
            return Lang.get("date/past_yesterday",{
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        } else {
            return Lang.get("date/general",{
                day: ("0"+date.getDate()).slice(-2), 
                month:("0"+(date.getMonth()+1)).slice(-2), 
                year: (""+date.getYear()).slice(-2),
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        }
    } else {
        // Future
        if(delta < 60){
            return Lang.get("date/future_sec")
        } else if(delta < 60 * 60){ 
            return Lang.get("date/future_min",{
                m: Math.ceil(delta/60)
            })
        } else if(date.toDateString() == now.toDateString()){
            return Lang.get("date/future_today",{
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        } else if(date.toDateString() == tomorrow.toDateString()){
            return Lang.get("date/future_tomorrow",{
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        } else if(delta < 60 * 60 * 24 * 4){
            return Lang.get("date/future_day",{
                d: Lang.getRaw("date/days")[date.getDay()],
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        } else {
            return Lang.get("date/general",{
                day: ("0"+date.getDate()).slice(-2), 
                month:("0"+(date.getMonth()+1)).slice(-2), 
                year: (""+date.getYear()).slice(-2),
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        }
    }  
}

TippDate.toDate = function(date){
    var now = new Date();
    var tomorrow = new Date(now.getTime() + (1000 * 60 * 60 * 24))
    var yesterday = new Date(now.getTime() - (1000 * 60 * 60 * 24));

    if(now - date > 0){
        if(date.toDateString() == now.toDateString()){
            return Lang.get("date/today");
        } else if(date.toDateString() == yesterday.toDateString()){
            return Lang.get("date/yesterday");
        } else {
            return Lang.get("date/date_only", {
                day: ("0"+date.getDate()).slice(-2),
                month: ("0"+(date.getMonth()+1)).slice(-2),
                year: date.getFullYear()
            })
        }
    } else {
        if(date.toDateString() == now.toDateString()){
            return Lang.get("date/today");
        } else if(date.toDateString() == tomorrow.toDateString()){
            return Lang.get("date/tomorrow");
        } else {
            return Lang.get("date/date_only", {
                day: ("0"+date.getDate()).slice(-2),
                month: ("0"+(date.getMonth()+1)).slice(-2),
                year: date.getFullYear()
            })
        }
    }
}

export default TippDate;