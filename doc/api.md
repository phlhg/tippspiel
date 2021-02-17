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

### Suggestions

Liefert Vorschläge für Client-Eingaben von Spielern, Teams und Austragungsorten

```js
socket.exec("suggest_players", { game: Int })
socket.exec("suggest_teams",{})
socket.exec("suggest_locations",{})
```

Liste von Vorschlägen

```js
{ state, error, data: [ String, ... ] }
```

### Console

```js
socket.exec("console",{cmd: String});
```

`cmd` Auszuführender Befehl
Unterstützt:
* access get
* access set
* access emplace
* access erase
* access list
* print [Tablename | `all`]

```js
{state, error, data:{text: String} }
```

## Filter

### Latest Games

Neuste Spiele

```js
socket.exec("latest_games")
```

```js
{ state, error, data: [ Game, Game, ... ] }
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
* users
* groups
* players
* teams
* events
* games
* etipps
* gtipps

`ids`: Diese Objekte werden angefordert

```js
{ state, error, data: { Int: User, Int: User, ...} }
```

## Updates

