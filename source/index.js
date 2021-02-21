import Application from './app'
import Debugger from './debugger'
import Language from './language'

import NotFound from './controllers/errors/notfound'
import NoConnection from './controllers/errors/noconnection'

import Home from './controllers/home'

import Game from './controllers/game/index'
import GameTipp from './controllers/game/tipp'

import Profile from './controllers/profile'

import SignUp from './controllers/signup'
import SignIn from './controllers/signin'

import Settings from './controllers/settings/index'

Debugger.active = true;

window.Lang = new Language();

window.addEventListener("DOMContentLoaded", function(){

    window.App = new Application()

    App.router.setErrorHandler(new NotFound)
    App.router.add("/noconnection/", new NoConnection)

    App.router.add("/",new Home)

    App.router.add("/game/{id}/tipp/",new GameTipp).where({ id: 'NUMBER' })
    App.router.add("/game/{id}/{name}/",new Game).where({ id: 'NUMBER', name: 'TEXT' })

    App.router.add("/profile/",new Profile)

    App.router.add("/signin/",new SignIn)
    App.router.add("/signup/",new SignUp)

    App.router.add("/settings/", new Settings)

    App.run()

});