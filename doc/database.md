# Datenbank

## User
```
type User
    int registerdate
    int lastlogin
    char 50 email
    char 100 name
    char 100 token
    GameTipp [] gameTipps
    EventTipp [] eventTipps
    Group [] groups
    int points
    bool perm_eventAnnounce
    bool perm_eventReport
    bool perm_gameAnnounce
    bool perm_gameReport
    bool perm_console
```

`id` Index zur eindeutigen Identifkation des Nutzers

`name` Jeder Nutzer hat einen lesbaren (kein hash) Namen 

`token` Zur Authentifikation des Nutzers

`gameTipps`

`permissions` Berechtigungen des Nutzer basierend auf Freigaben

## Group
Gruppen ermöglichen eine Separation von mehrern Nutzern. Dabei werden diesen Nutzern nur Resultate der eigenen Gruppe angezeigt.

```
type Group
    User owner
    char 100 name
    char 100 image
    char 100 token
    User admin
    User [] users
```

`id` Zur Identifizierung der Gruppe

`name` Lesbarer Name der Gruppe

`token` Zur Autorisierung beim Beitreten

`member` Liste von Nutzern


## Player
Ein Fussballspieler, aber kein Nutzer. (Ausser er spielt an der Meisterschaft)
```
type Player
    char 100 name
    Team team
```

`id` Zur Identifizierung des Spielers

`name` Name des Spielers

`team` Zugehörigkeit des Spielers

## Team
Ein Team, welches an der Meisterschaft teilnimmt
```
type Team
    char 100 name
    char 10 short
    Event event
    Player [] players
```

`id` Zur Identifizierung des Teams

`name` Name des Teams (z.B. Schweiz)

`short` Offizielles [FIFA Kürzel](https://en.wikipedia.org/wiki/List_of_FIFA_country_codes) des Teams (z.B. SUI)

`games` Spiele, an welchen das Team teilnimmt

`players` Spieler, welche dem Team angehören


## Location
Austragungsort
```
type Location
    char 100 name
```

`id` Zur Identifizierung des Austragungsort

`name` Name des Austragungsort


## Event
Ein Anlass ist den Spielen übergeordnet und fasst diese Zusammen. Es können Tipps auf einen gesamten Anlass abgegeben werden.
```
type Event
    char 100 name
    char 256 description
    int deadline
    int eventStatus
    Team [] teams
    Game [] games
    EventTipp [] tipps
    Team winner
    Player topscorer
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
```
type EventTipp
    Event event
    User user
    Team winner
    Player topscorer
    int reward
```

`id` Zur Identifizierung des Tipps

`eventid` ID des zugehörigen Events

`userid` ID des Nutzers, welcher den Tipp abgeben hat

`winner` Name des getippten Gesamtgewinners

`topscorer` Name des getippten Torschützenkönigs

`reward` Anzahl Punkte für den Tipp

## Game
```
type Game
    int start
    Location location
    char 100 name
    char 256 stream
    Event event
    int gameStatus
    int phase
    Team 2 teams
    int 2 scores
    int 2 penalty
    Player [] scorers
    GameTipp [] tipps
    Game previousStage
    Game nextStage
```

`id` Zur Identifizierung des Spiels

`start` Zeitstempel des Spielbeginn

`location` Austragungsort des Spiels

`name` Name des Spiels falls die Teams noch nicht entschieden sind

`stream` Link zum einer Live-Übertragung

`status` Momentaner Status des Spiels

```js
0 Game.UPCOMING
1 Game.RUNNING
2 Game.PENDING
3 Game.ENDED
```

`previousStage` Ein vorangehendes Spiel; Der Sieger des Vorangehenden Spiels nimmt an diesem Spiel Teil.

`nextStage` Der Sieger dieses Spiels nimmt am nächsten Spiel teil.

`phase` Maximal erreichter Spielabschnitt

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
```
type GameTipp
    Game game
    User user
    int 2 bet
    Team betWinner
    Player betPlayer
    int reward
```

`id` Zur Identifizierung des Tipps

`game` Spiel, zu welchem der Tipp gehört

`user` Nutzer, welcher den Tipp abgeben hat

`bet` Getippte Punktzahl nach normaler Spielzeit und Verlängerung

`betWinner`: Getippter Gewinner, relevant für Penaltyschiessen

`betPlayer`: Getippte Torschütze

`reward` Anzahl Punkte für den Tipp