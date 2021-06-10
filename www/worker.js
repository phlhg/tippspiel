self.addEventListener('push', function(event){

    event.waitUntil(
        fetch('getnotify.php', {
            method: 'post',
            body: JSON.stringify(Object.assign({},{lang: "en"},event.data.json()))
        }).then(response => {
            return response.json()
        }).then(response => {
            if(response.show){
                self.registration.showNotification(response.title,{
                    body: response.body,
                    badge: "/img/badge.png",
                    icon: "/img/favicon.png",
                    data: {
                        url: response.link
                    }
                })
            }
        })
    )

});

self.addEventListener('notificationclick', function(event){
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    )
})

self.addEventListener('fetch', event => {
    if(event.request.method != 'GET') return;
    event.respondWith(async function(){
        return fetch(event.request)
    }())
})