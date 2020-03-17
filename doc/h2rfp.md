# Huber-Hugo Remote Function Protocol: H2RFP

## Idee
Das Ursprüngliche H2 Event Protokoll (H2EP) funktionierte mit Events, welche vom Server und Client gleichermassen erzeugt wurden und bei der Gegenseite ein Ereignis auslöste. Somit entstand eine Grosse Abhängigkeit zwischen der Client-Applikation und der Server-Applikation seitens Programmierung.

Konkret soll mit H2RFP verhindert werden, dass die Front-End Programmierung durch die Architektur einer Serverapplikation eingeschränkt wird. Nach Absenden eines Events soll der weitere Programmverlauf eindeutig sein. Es soll unterschieden werden zwischen Ereignissen und Abläufen.

## Anwendung

Die Anwendung von H2RFP wird anhand eines Browser-Chat-Programms mit JavaScript dargestellt:

### Initialisierung
Eine H2RFP-Objekt wird erstellt und verbindet mit Server. Der Verbindungsaufbau verwerndet ```Promise```
```JavaScript
    function main() {
        server = new H2RFP();
        server.connect("myserver.com",4242).then(()=>{
            login();
        }).catch(()=>{
            console.log("Verbindung kann nicht aufgebaut werden");
        });
        ...
    }
```

### Kommunikation
Die Kommunikation geschieht auf 3 verschiedene Arten:

**listen:** Stellt einen Einstiegspunkt im Client-Programm dar. Ein Prozess wird auf Initiative des Servers gestartet.
```JavaScript
    function main() {
        ...
        // Sobald jemand dem Chat beitritt, addMember aufrufen.
        server.listen("newMember",addMember);
        ...
    }
```

**notify:** Startet einen Prozess beim Server, ohne Einfluss auf Programmfluss im Client
```JavaScript
    function setAFK() {
        // Server wird über AFK informiert.
        server.notify("status",{status:"afk"});
    }
```

**exec**: Ein Teil des Programmflusses wird auf dem Server ausgeführt. Das Prinzip von ```Promise``` wird verwendet, um einzelne Funktionen auf dem Server auszuführen.
```JavaScript
    function login(credentials) {
        server.exec("login",credentials).then((obj)=>{
            if (obj.success)
                console.log("ich bin drinn")
            else
                console.log("zugriff verweigert")
        });
    }
```
### Beenden
Eine Verbindung wird mit einem Promise beendet.
```JavaScript
    function logout(){
        server.close().then(()=>{
            console.log("Verbindung wurde beendet");
        });
    }
```

### Lokale Ereignisse
Damit ein Verbindungsverlust erkannt werden kann, gibt es lokale Ereignisse. 

```onDisconnect```: Dieses Ereigniss wird bei einem Verbindungsverlust ausgelöst.
```onReconnect```: Dieses Ereigniss wird beim erneuten Verbinden ausgelöst.

```JavaScript
    function main()
    {
        server.onDisconnect = function {
            console.log("Verbindung unterbrochen")
        };
       
        server.onReconnect = function {
            console.log("Verbindung wieder hergestellt")
        }
    }
```