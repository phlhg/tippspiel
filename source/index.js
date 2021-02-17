import App from './app'
import ErrorController from './controllers/error'
import ProfileController from './controllers/profile'
import SignUpController from './controllers/signup'
import SignInController from './controllers/signin'
import HomeController from './controllers/home'
import GameController from './controllers/game'
import Debugger from './debugger'
import Lang from './lang'

Debugger.active = true;

window.Lang = new Lang();

window.addEventListener("DOMContentLoaded", function(){
    window.APP = new App();
    APP.setErrorHandler(ErrorController);
    APP.setRoute("/",HomeController);
    APP.setRoute("/game/{id}/{name}/",GameController)
    APP.setRoute("/profile/",ProfileController);
    APP.setRoute("/signin/",SignInController);
    APP.setRoute("/signup/",SignUpController);
    APP.run();
});