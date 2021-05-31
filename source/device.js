import TippNotification from "./helper/notification"

export default class Device {

    constructor(){

        this.os = {}

        this.os.windows = /(Win32|Win64|Windows)/i.test(navigator.platform)
        this.os.macos = /Mac/i.test(navigator.platform)
        this.os.ios = /(iPad|iPhone|iPod)/i.test(navigator.platform) || (/Mac/i.test(navigator.userAgent) && "ontouchend" in document)
        this.os.android = /android/i.test(navigator.userAgent) && /mobile/i.test(navigator.userAgent)
        this.os.linux = /linux/i.test(navigator.platform) && !this.os.window && !this.os.macos && !this.os.ios && !this.os.android
        
        this.browser = {}
        this.browser.firefox = /firefox/i.test(navigator.userAgent) && !/seamonkey/i.test(navigator.userAgent)
        this.browser.chromium = !!window.chrome || /DuckDuckGo/i.test(navigator.userAgent);
        this.browser.chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !this.browser.chromium;
        this.browser.safari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
        this.browser.opera = /OPR/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent);
        this.browser.edge = /edg(e)?/i.test(navigator.userAgent)

        this.standalone =   window.matchMedia('(display-mode: standalone)').matches || // Chrome
                            navigator.standalone || // Safari 
                            (this.browser.firefox && window.screenTop < 50) || //Firefox (workaround)
                            localStorage.getItem("tipp-is-pwa") == "true" // Fallback

    }

    supportsPWA(){

        return  !this.standalone && // is not a PWA
                ((this.os.ios && this.browser.safari) || // iOS Safari
                (this.os.android && this.browser.chrome && !this.chromium) || // Android Chrome
                (this.os.android && this.browser.firefox)) // Android Firefox

    }

    async share(data){

        var data = {
            url: data.url ?? window.location.hostname,
            title: data.title ?? "",
            text: data.text ?? ""
        }

        if('share' in navigator && navigator.canShare && navigator.canShare(data)){
            await navigator.share(data)
        } else {
            var input = document.createElement("input");
            input.value = data.url;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            input.remove();
            TippNotification.create(Lang.get("notifications/linkCopied"), 3000, "content_copy", "success").show()
        }

    }

}