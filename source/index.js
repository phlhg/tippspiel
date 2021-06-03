import Application from './app'
import Debugger from './debugger'
import Language from './language'

//Errors
import NotFound from './sections/errors/notfound'
import NoConnection from './sections/errors/noconnection'

//Home
import Home from './sections/home'

// Account
import SignIn from './sections/account/signin'
import Recover from './sections/account/recover'

import SignUp from './sections/account/signup/index'
import SignUpName from './sections/account/signup/name'
import SignUpWelcome from './sections/account/signup/welcome'

// Game
import Game from './sections/game/index'
import GameReport from './sections/game/report'
import GameTipp from './sections/game/tipp'
import TippDetail from './sections/game/tippdetail'

// Event
import EventIndex from './sections/event/index'
import EventGameAdd from './sections/event/add'

// Groups
import GroupsIndex from './sections/groups/index'
import GroupDetail from './sections/groups/detail'
import GroupAdvanced from './sections/groups/advanced'
import GroupJoin from './sections/groups/join'
import GroupCreate from './sections/groups/create'

// More
import StatsIndex from './sections/stats/index'
import Profile from './sections/profile/index'
import Settings from './sections/settings/index'
import Rules from './sections/settings/rules'
import PWASetup from './sections/special/pwasetup'
import PlayerCreate from './sections/player/create'

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

    // Errors
    App.router.setErrorHandler(new NotFound)
    App.router.add("/noconnection/", new NoConnection)

    // Home
    App.router.add("/",new Home)

    // Account
    App.router.add("/signin/",new SignIn).alias("/signin/{token}/");
    App.router.add("/recover/",new Recover)

    App.router.add("/signup/",new SignUp)
    App.router.add("/signup/2/",new SignUpName)
    App.router.add("/signup/3/",new SignUpWelcome)


    //Game
    App.router.add("/game/{id}/{t1}-{t2}/",new Game).where({ id: 'NUMBER', t1: 'TEXT',t2: 'TEXT' })
    App.router.add("/game/{id}/tipp/",new GameTipp).where({ id: 'NUMBER' })
    App.router.add("/game/{id}/report/",new GameReport).where({ id: 'NUMBER' })
    App.router.add("/tipp/{id}/",new TippDetail).where({id: 'NUMBER'})

    //Event
    App.router.add("/event/{id}/add/",new EventGameAdd)
    App.router.add("/event/{id}/{name}/",new EventIndex).where({ id: 'NUMBER', name: 'TEXT' })

    // Groups
    App.router.add("/groups/",new GroupsIndex)
    App.router.add("/groups/{id}/{name}/",new GroupDetail).where({ id: 'NUMBER', name: 'TEXT' })
    App.router.add("/groups/advanced/{id}/{name}/",new GroupAdvanced).where({ id: 'NUMBER', name: 'TEXT' })
    App.router.add("/groups/join/{id}-{token}/", new GroupJoin)
    App.router.add("/groups/create/", new GroupCreate)

    // More
    App.router.add("/stats/",new StatsIndex)
    App.router.add("/profile/",new Profile)
    App.router.add("/settings/", new Settings)
    App.router.add("/settings/rules/", new Rules)
    App.router.add("/pwa/",new PWASetup)

    App.router.add("/player/create/", new PlayerCreate)

    App.run()

});