export default class TippPush {

    constructor(){

        this.options = {
            userVisibleOnly: true,
            applicationServerKey: this._urlBase64ToUint8Array("BJq9JHonZAGTS_IYH0sfuEK0JNLJ576r7NOATOxaYvEXQgVJJjc3rhc-dkP-05YA_4Esc2X55DM21F-c-y4zY-w")
        }

        if(this.isSupported()){ 
            navigator.serviceWorker.register('worker.js', {scope: "/"})
        }

    }

    isSupported(){
        return 'serviceWorker' in navigator && 'PushManager' in window;
    }

    isAvailable(){
        return this.isSupported() && App.client.active
    }

    async isEnabled(){
        if(!this.isAvailable()){ return false; }
        return navigator.serviceWorker.ready.then(registration => {
            return registration.pushManager.getSubscription().then(subscription => {
                return subscription != null
            })
        }).catch(e => {
            console.warn(e);
            return false;
        });
    }

    async enable(){
        if(!this.isAvailable()){ return false; }
        return navigator.serviceWorker.ready.then(registration => {
            return registration.pushManager.getSubscription().then(subscription => {
                if(subscription !== null){ return true; }
                return registration.pushManager.subscribe(this.options).then(subscription => {
                    if(subscription == null){ return false; }
                    return App.socket.exec("push_enable", { subscription: subscription.toJSON() }).then(r => {
                        return true;
                    })
                })
            })
        }).catch(e => {
            console.warn(e);
            return false;
        });
    }

    async disable(){
        if(!this.isAvailable()){ return true; }
        return navigator.serviceWorker.ready.then(registration => {
            return registration.pushManager.getSubscription().then(subscription => {
                if(subscription == null){ return true; }
                return subscription.unsubscribe().then(success => {
                    if(!success){ return false; }
                    return App.socket.exec("push_disable", { endpoint: subscription.toJSON().endpoint }).then(r => {
                        return true;
                    })
                })
            })
        }).catch(e => {
            console.warn(e);
            return false;
        });
    }

    _urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

}