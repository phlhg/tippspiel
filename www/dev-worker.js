self.addEventListener('push', function(event) {
    event.waitUntil(
        self.registration.showNotification('Push Notification', {
          body: 'Received a push notification by Tippspiel',
          badge: "/img/badge.png",
          icon: "/img/favicon512.png",
          data: { url: "/" }
        })
    );
});

self.addEventListener('notificationclick', function(event){
    event.notification.close()
    event.waitUntil(
        clients.openWindow(
            event.notification.data.url ?? "/"
        )
    )
})

self.addEventListener('fetch', event => {
    if(event.request.method != 'GET') return;
    event.respondWith(async function(){
        return fetch(event.request)
    }())
})
    
    