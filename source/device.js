export default class Device {

    constructor(){

        this.os = {}

        this.os.windows = /(Win32|Win64|Windows)/i.test(navigator.platform)
        this.os.macos = /Mac/i.test(navigator.platform)
        this.os.ios = /(iPad|iPhone|iPod)/i.test(navigator.platform) || (/Mac/i.test(navigator.userAgent) && "ontouchend" in document)
        this.os.android = /android/i.test(navigator.userAgent) && /mobile/i.test(navigator.userAgent)
        this.os.linux = /linux/i.test(navigator.platform) && !this.os.window && !this.os.macos && !this.os.ios && !this.os.android
        
        this.browser = {}
        this.browser.firefox = /firefox/i.test(navigator.userAgent)
        this.browser.chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        this.browser.safari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
        this.browser.edge = /edge?/i.test(navigator.platform)

        this.standalone =   window.matchMedia('(display-mode: standalone)').matches || // Chrome
                            navigator.standalone || // Safari 
                            (this.browser.firefox && window.screenTop < 50) || //Firefox (workaround)
                            localStorage.getItem("tipp-is-pwa") == "true" // Fallback

    }

    supportsPWA(){

        return  !this.standalone && // is not a PWA
                ((this.os.ios && this.browser.safari) || // iOS Safari
                (this.os.android && this.browser.chrome) || // Android Chrome
                (this.os.android && this.browser.firefox)) // Android Firefox

    }

}