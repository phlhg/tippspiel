# API

Definiert die Interaktion zwischen Browser und Datenserver.
Der Austausch basiert auf dem H2 Event Protokoll mit einer Websocket verbindung.

## Error Handling

```
{ result: ENUM, error: ENUM, data: {} }
```

### Resultat
```
SUCCESS: 0 -> Programmfluss fortführen
CLIENT_ERROR: 1 -> Clienteingabe wiederholen
SERVER_ERROR: 2 -> Programmfluss beenden
```
error: [Enumeration](../client/js/lang.js) von genaueren Fehlermeldungen

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

### User

Liste von Nutzern

```js
socket.exec("users", { ids: [Int, Int, ...]})
```

```js
{ state, error, data: { Int: User, Int: User, ...} }
```

## Updates
