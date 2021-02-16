function Debugger(){}

Debugger.active = false;

Debugger._getName = function(callee){
    if(typeof callee == "string") return callee;
    let parent = Object.getPrototypeOf(callee.constructor) ?? {};
    return (parent.name ?? "" != "" ? parent.name + "/" : "" ) + callee.constructor.name;
}

Debugger.log = function(callee,...args){
    if(Debugger.active)
        return console.log.bind(console,`%c[${Debugger._getName(callee)}]` , "font-weight: bold;",...args)
    return function(){}
}

Debugger.warn = function(callee,...args){
    if(Debugger.active)
        return console.warn.bind(console,`%c[${Debugger._getName(callee)}]`,"font-weight: bold;",...args)
    return function(){}
}

Debugger.error = function(callee,...args){
    if(Debugger.active)
        return console.error.bind(console,`%c[${Debugger._getName(callee)}]`,"font-weight: bold;",...args)
    return function(){}
}

export default Debugger;