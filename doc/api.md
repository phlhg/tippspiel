# API

Definiert die Interaktion zwischen Browser und Datenserver.
Der Austausch basiert auf dem H2 Event Protokoll mit einer Websocket verbindung.

## Response & Error Handling

```js
Response { 
    state: ENUM, 
    error: ENUM, 
    data: Object 
}
```

`state` Enumeration des Status der Anfrage

```js
State.SUCCESS: 0 // Programmfluss fortführen
State.USER_ERROR: 1 // Der Nutzer hat eine ungültige Eingabe gemacht - Programmfluss fortführen
State.CLIENT_ERROR: 2 // Das Client-Programm hat eine ungültige Anfrage gesendet - Programmfluss beenden
State.SERVER_ERROR: 3 // Auf dem Server ist beim Bearbeiten ein Problem aufgetreten - Programmfluss beenden
```

`error` [Enumeration](../www/js/lang.js) von genaueren Fehlermeldungen

`data` Daten, welche an den Client gesendet werden - Zusätzliche Fehler-Informationen, falls `State.CLIENT_ERROR` oder `State.SERVER_ERROR`.

## Funktional

### SignIn

Weist der aktuellen Verbindung einen Benutzer zu

```js
socket.exec("signin",{ token: String, retry: Boolean })
```

`token` Hash of the user

```js
{ state, error, data: { upToDate: Boolean } }
```

### SignUp

Erstellt einen neuen Benutzer

```js
socket.exec("signup",{ name: String, email: String })
```
`name` Name des Nutzers

`email` E-Mail des Nutzers

```js
{ state, error, data: {} }
```

### restoreToken

Erstellt ein Neues Token für einen Account

```js
socket.exec("restoreToken",{email: String})
socket.exec("restoreToken")
```

`email` Email des betroffenen Accounts. Alternativ kann eine eingeloggte session verwendet werden

### Me

Gibt Information über den Klient

```js
socket.exec("me",{})
```

`token` Hash of the user

```js
{ 
    state, 
    error, 
    data: Client { 
        id: int,
        name: String(100),
        gameTipps: [ GameTipps, ... ]
        eventTipps: [ EventTipps, ... ]
        group: [ Group, ... ]
        points: int,
        permisson: {
            invitation: Boolean
            eventAnnounce: Boolean
            eventResult: Boolean
            gameAnnounce: Boolean
            gameResult: Boolean
        }
    } 
}
```

### createPlayer

```js
socket.exec("createPlayer", { name: String, team: ID });
```

antwort:
```js
{ state, error, data:{id: ID} }
```

### createGame

```js
socket.exec("createGame", {
    id: [optional] ID, // falls das Spiel schon existiert und überschrieben werden soll
    location: string,
    name: string,
    stream: string,
    event: ID,
    team1: ID, // 0 falls noch nicht bekannt
    team2: ID, // 0 falls noch nicht bekannt
    previous1: [optional] ID, // falls es sich um ein folgespiel handelt
    previous2: [optional] ID, // falls es sich um ein folgespiel handelt
    });
```

antwort:
```js
{ state, error, data:{id: ID} }
```

### MakeTipp

```js
socket.exec("makeTipp",{
    game: id,
    bet1: Int, // -1 = not used
    bet2: Int, // -1 = not used
    winner: id, // 0 = not used
    topscorer: id // 0 = not used
});
```

```js
{state, error, data:{ }}
```

### reportGame

```js
socket.exec("reportGame",{
    game: ID,
    score1: Int,
    score2: Int,
    scorePenalty1: Int,
    scorePenalty2: Int,
    scorers: [ID, ID, ...],
});
```

```js
{state, error, data:{ }}
```

### Console

```js
socket.exec("console",{cmd: String});
```

`cmd` Auszuführender Befehl: [Siehe Befehle](./console.md)

```js
{state, error, data:{text: String} }
```

## Filter

### Suggestions

Liefert Vorschläge für Client-Eingaben von Spielern, Teams und Austragungsorten

```js
socket.exec("suggest_events");
socket.exec("suggest_players", { game: Int })
socket.exec("suggest_locations",{})
```

Liste von Vorschlägen

```js
{ state, error, data: [ ID | string, ... ] }
```


### Latest Games

Neuste Spiele

```js
socket.exec("hotGames")
```

```js
{ state, error, data: {
    upcoming: [ID, ID, ...], // Zeitlich sortiert
    over: [ID, ID, ...] // Zeitlich sortiert
} }
```

### Ranking

Rangliste aller Spieler

```js
socket.exec("ranking", {})
```

```js
{ state, error, data: [ Int, Int, ... ] }
```

## Anfrage

Liste von Nutzern

```js
socket.exec("get_data", { table: String, ids: [Int, Int, ...]})
```
`table`: Die Art von Objekten die Angefordert werden.
* User
* Group
* Player
* Team
* Event
* Game
* EventTipp
* GameTipp

`ids`: Diese Objekte werden angefordert

```js
{ state, error, data: { Int: User, Int: User, ...} }
```

## Server-initiated Events

### Updates

Teilt mit, welche Einträge im client veraltet sind.

```js
// data: {User:[ID, ID, ...], Group:[ID, ID, ...], ...}
socket.listen("Update", (data, respond) => {
    ...
    respond();
});

```

### Ping

Erhält die Verbindung am Leben

```js
socket.listen("Ping", (data,respond) => {
    respond();
});

Der Client Antwortet mit einem leeren Objekt, um den Empfang zu bestätigen!