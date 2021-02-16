import Debugger from "./debugger";

export default class Lang {

    getError(id,data){
        data = data ?? {}
        if(!__LANG.de.errors.hasOwnProperty(id)){ id = 0; }
        return this.bake(__LANG.de.errors[id],data)
    }

    bake(text, data){
        data = data ?? {}
        return text.replace(/{(\w+)}/ig, (match, id) => {
            if(!data.hasOwnProperty(id)){
                Debugger.warn(this,`Parameter "${id}" was not supplied for "${text}"`)();
                return "{"+id+"}";
            }
            return data[id];
        })
    }

}