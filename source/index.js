import Application from './app'
import ErrorController from './controllers/error'
import ProfileController from './controllers/profile'
import SignUpController from './controllers/signup'
import SignInController from './controllers/signin'
import HomeController from './controllers/home'
import GameController from './controllers/game'
import Debugger from './debugger'
import Language from './language'

Debugger.active = true;

window.Lang = new Language();

window.addEventListener("DOMContentLoaded", function(){
    window.App = new Application()
    App.router.setErrorHandler(new ErrorController)
    App.router.add("/",new HomeController)
    App.router.add("/game/{id}/{name}/",new GameController).where({ id: 'NUMBER', name: 'TEXT' })
    App.router.add("/profile/",new ProfileController)
    App.router.add("/signin/",new SignInController)
    App.router.add("/signup/",new SignUpController).alias("/register/")
    App.run()
});