class TippDate { }

TippDate.toString = function(date){
    var now = new Date();
    var delta = Math.abs(now - date) / 1000
    if(now - date > 0){
        // Past
        if(delta < 60){
            return Lang.get("date/past_sec")
        } else if(delta < 60 * 60){
            return Lang.get("date/past_min",{
                m: Math.floor(delta/60)
            })
        } else if(delta < 60 * 60 * (24 - date.getHours())){
            return Lang.get("date/past_today",{
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        } else if(delta < 60 * 60 * (48 - date.getHours())){
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
        } else if(delta < 60 * 60 * date.getHours()){
            return Lang.get("date/future_today",{
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        } else if(delta < 60 * 60 * (date.getHours() + 24)){
            return Lang.get("date/future_tomorrow",{
                h: ("0"+date.getHours()).slice(-2), 
                m: ("0"+date.getMinutes()).slice(-2)
            })
        } else if(delta < 60 * 60 * 24 * 3){
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

export default TippDate;