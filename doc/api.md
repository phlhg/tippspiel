# API

Definiert die Interaktion zwischen Browser und Datenserver.
Der Austausch basiert auf dem H2 Event Protokoll mit einer Websocket verbindung.

## Login

Weist der aktuellen Verbindung einen Benutzer zu

### Request

```
{ pass }
```

```pass```: Hash of the user

### Response

```login_denied```

```login_ok```

