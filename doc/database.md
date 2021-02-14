# Datenbank

Beschreibt die Strukturen der Datenbank

Attribute mit `*` werden synchronisiert.

## User

```js
User {
    id: int,
    name: String(100),
    email: String(100),
    token: String(100),
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
```

[id,points]

`id` Index zur eindeutigen Identifkation des Nutzers

`name` Jeder Nutzer hat einen lesbaren (kein hash) Namen 

`token` Zur Authentifikation des Nutzers

`gameTipps`

`permissions` Berechtigungen des Nutzer basierend auf Freigaben

## Group

Gruppen ermöglichen eine Separation von mehrern Nutzern. Dabei werden diesen Nutzern nur Resultate der eigenen Gruppe angezeigt.

```js
Group {
    id: int,
    name: String(100),
    token: String(100),
    members: [ User, ... ]
}
```

`id` Zur Identifizierung der Gruppe

`name` Lesbarer Name der Gruppe

`token` Zur Autorisierung beim Beitreten

`member` Liste von Nutzern

## Player

Ein Fussballspieler, aber kein Nutzer. (Ausser er spielt an der Meisterschaft)

```js
Player {
    id: int,
    name: String(100),
    team: Team
}
```

`id` Zur Identifizierung des Spielers

`name` Name des Spielers

`team` Zugehörigkeit des Spielers


## Team

Ein Team, welches an der Meisterschaft teilnimmt

```js
Team {
    id: int,
    name: String(100),
    short: String(10),
    games: [ Game , ... ]
    players: [ Player , ... ]
    team: Team
}
```

`id` Zur Identifizierung des Teams

`name` Name des Teams (z.B. Schweiz)

`short` Offizielles [FIFA Kürzel](https://en.wikipedia.org/wiki/List_of_FIFA_country_codes) des Teams (z.B. SUI)

`games` Spiele, an welchen das Team teilnimmt

`players` Spieler, welche dem Team angehören

## Location

Austragungsort

```js
Location {
    id: int,
    name: String(100)
}
```

`id` Zur Identifizierung des Austragungsort

`name` Name des Austragungsort

## Event

Ein Anlass ist den Spielen übergeordnet und fasst diese Zusammen. Es können Tipps auf einen gesamten Anlass abgegeben werden.

```js
Event {
    id: int,
    name: String(100),
    description: String(256),
    deadline: Date,
    status: ENUM,
    games: [ Game, ... ],
    tipps: [ EventTipp, ... ]
    winner: Team
    topscorer: Player
}
```

`id` Zur Identifizierung des Events

`name` Lesbarer Name des Events

`description` Lesbare Beschreibung des Events

`deadline` Deadline für Tippabgaben (int)

`status` Status des Events

```js
0 EVENT.UPCOMING // Das Event steht bevor
1 EVENT.RUNNING // Das Event läuft
2 EVENT.PENDING // Das Event ist beendet - Resultate fehlen
3 EVENT.ENDED // Das Event ist beendet - Resultate bekannt 
```

`games` Liste von Spielen

`winner` Name des Gesamtgewinners

`topscorer` Name des Torschützenkönigs

## EventTipp

```js
EventTipp {
    id: int,
    event: Event,
    user: User,
    winner: Team,
    topscorer: Player,
    reward: int
}
```

`id` Zur Identifizierung des Tipps

`eventid` ID des zugehörigen Events

`userid` ID des Nutzers, welcher den Tipp abgeben hat

`winner` Name des getippten Gesamtgewinners

`topscorer` Name des getippten Torschützenkönigs

`reward` Anzahl Punkte für den Tipp

## Game

```js
Game {
    id: int,
    start: Date,
    location: Location,
    stream: String(255),
    event: Event
    status: ENUM,
    progress: ENUM,
    teams: [ Team, Team ]
    scores: [ int, int ]
    scoresPenalty: [ int, int ]
    scorer: [ Player, ... ],
}
```

`id` Zur Identifizierung des Spiels

`start` Zeitstempel des Spielbeginn

`location` Austragungsort des Spiels

`stream` Link zum einer Live-Übertragung

`status` Momentaner Status des Spiels

```js
0 Game.UPCOMING
1 Game.RUNNING
2 Game.PENDING
3 Game.ENDED
```

`progress` Maximal erreichter Spielabschnitt

```js
0 Game.NORMAL
1 Game.OVERTIME
2 Game.PENALTY
```

`teams` Teilnehmer des Spiels (2)

`scores` Punktzahl während normaler Spielzeit und Verlängerung

`scoresPenalty` Punktzahl während Penaltyschiessen

`scorers` Spieler, welche ein Tor während der Spiels geschossen haben


## GameTipp

```js
GameTipp {
    id: int,
    game: Game,
    user: User,
    bet: [ int, int ]
    betWinner: Team,
    betPlayer: Player,
    reward: int,
}
```

`id` Zur Identifizierung des Tipps

`game` Spiel, zu welchem der Tipp gehört

`user` Nutzer, welcher den Tipp abgeben hat

`bet` Getippte Punktzahl nach normaler Spielzeit und Verlängerung

`betWinner`: Getippter Gewinner, relevant für Penaltyschiessen

`betPlayer`: Getippte Torschütze

`reward` Anzahl Punkte für den Tipp