import Application from './app'
import Debugger from './debugger'
import Language from './language'

import NotFound from './controllers/errors/notfound'
import NoConnection from './controllers/errors/noconnection'

import Home from './controllers/home'

import Game from './controllers/game/index'
import GameTipp from './controllers/game/tipp'
import GameCreate from './controllers/game/create'
import GameReport from './controllers/game/report'

import Profile from './controllers/profile'

import SignUp from './controllers/signup'
import SignIn from './controllers/signin'

import Settings from './controllers/settings/index'
import TippIndex from './controllers/tipp'
import StatsIndex from './controllers/stats'
import GroupsIndex from './controllers/groups'

Debugger.active = true;

window.onerror = function(msg, src, line, col, error){
    var stack = error.stack ?? "";
    stack = stack.split("\n").map(a => a.split("@")[0]);
    fetch("/errorfunnel.php",{ 
        method: "POST",
        body: JSON.stringify({
            msg: msg,
            src: src,
            line: line,
            col: col,
            stack : stack
        }) 
    });
}

window.Lang = new Language();

window.addEventListener("DOMContentLoaded", function(){

    window.App = new Application()

    App.router.setErrorHandler(new NotFound)
    App.router.add("/noconnection/", new NoConnection)

    App.router.add("/",new Home)

    App.router.add("/game/create/",new GameCreate)
    App.router.add("/game/{id}/tipp/",new GameTipp).where({ id: 'NUMBER' })
    App.router.add("/game/{id}/report/",new GameReport).where({ id: 'NUMBER' })
    App.router.add("/game/{id}/{t1}-{t2}/",new Game).where({ id: 'NUMBER', t1: 'TEXT',t2: 'TEXT' })

    App.router.add("/tipp/{id}/",new TippIndex).where({id: 'NUMBER'})

    App.router.add("/profile/",new Profile)

    App.router.add("/stats/",new StatsIndex)

    App.router.add("/groups/",new GroupsIndex)

    App.router.add("/signin/",new SignIn).alias("/signin/{token}/");
    App.router.add("/signup/",new SignUp)

    App.router.add("/settings/", new Settings)

    App.run()

});