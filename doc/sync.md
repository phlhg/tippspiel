# Synchronisation

Beschreibt das Format in welchem Daten zwischen Client und Server synchronisiert werden.

(Zeitpunkte und Intervalle werden mit Unix-Timestamps angegeben)

## User

```js
User {
    banned: bool,
    id: User,
    name: String,
    points: int,
    groups: [Group, ...],

    eventTipps: [EventTipp, ...], // private
    gameTipps: [GameTipp, ...],   // "
    permission: {                 // "
       eventAnnounce: bool,       // "
       eventReport: bool,         // "
       gameAnnounce: bool,        // "
       gameReport: bool,          // "
       groupCreate: bool          // "
    },
}

```

## Group

```js
Group {
    id: int,
    name: String(100),
    admin: User,
    users: [ User, ... ],

    token: String  // admin only
}
```

## Player

```js
Player {
    id: int,
    name: String(100),
    team: Team
}
```

## Team

```js
Team {
    id: int,
    name: String(100),
    short: String(10),
    event: Event,
    players: [ Player , ... ]
}
```

## Event

```js
Event {
    id: int,
    name: String(100),
    description: String(256),
    deadline: Date,
    status: ENUM,
    games: [ Game, ... ],
    teams: [ Team, ...],
    tipps: [ EventTipp, ... ]
    winner: Team
    topscorer: Player
}
```

## EventTipp

```js
EventTipp {
    id: int,
    event: Event,
    user: User,
    reward: int,
    winner: Team,
    topscorer: Player,
}
```

## Game

```js
Game {
    id: int,
    start: Date,
    location: String,
    stream: String(255),
    event: Event
    status: ENUM,
    phase: ENUM,
    team1: Team,
    team2: Team
    score1: int,
    score2: int,
    scorePenalty1: int,
    scorePenalty2: int,
    scorers: [ Player, ... ],
    tipps: [GameTipp, ...],
    short1: String,
    short2: String
}
```

## GameTipp

```js
GameTipp {
    id: int,
    game: Game,
    user: User,
    reward: int,
    tippkat: int, // Preiskategorie siehe unten
    goals: int, // der Torschütze hat so viel getroffen
    bonus: bool // Bonus für korrektes Penaltyschiess (+1)
    bet1: int,
    bet2: int,
    winner: Team,
    topscorer: Player,
}
```

`tipkat`: Preiskategorie des Tipps
```js
0 TIPPKAT.WRONG // Komplett falsch getippt (+0)
1 TIPPKAT.TEAM // Auf richtiges Team getippt (+1)
2 TIPPKAT.DIFF // Richtige Tordifferenz (+2)
3 TIPPKAT.EXACT // Exaktes Resulat (+4)
```
