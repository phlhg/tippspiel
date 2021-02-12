# API

Definiert die Interaktion zwischen Browser und Datenserver.
Der Austausch basiert auf dem H2 Event Protokoll mit einer Websocket verbindung.

## Error Handling

```
{ result: ENUM, error: ENUM, data: {} }
```

### result
```
SUCCESS: 0 -> Programmfluss fortführen
CLIENT_ERROR: 1 -> Clienteingabe wiederholen
SERVER_ERROR: 2 -> Programmfluss beenden
```

### error: Enumeration von genaueren Fehlermeldungen
Siehe [Enumeration](../client/js/lang.js)

## Login

Weist der aktuellen Verbindung einen Benutzer zu

### Request

```
{ token: String }
```

`token`: Hash of the user

### Response

```
{ state, error, data: {} }
```





