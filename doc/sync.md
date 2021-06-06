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
    winner: Team,
    topscorer: Player,
    processed: bool,
    reward: {
        sum: int,
        winner: bool,
        topscorer: bool
    }
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
    processed: bool,
    reward: {
        sum: int, // >= 0
        team: bool, // +1
        diff: bool, // +1
        exact: bool, // +2
        draw: bool, // +2
        scorer: int // >= 0
    }
    bet1: int,
    bet2: int,
    winner: Team,
    topscorer: Player,
}
```

```
Punkteverteilung:
    team: +1 wenn das getippte team gewonnen hat
    diff: +1 wenn die punktedifferenz stimmt
    exact: +2 wenn die punkte beider teams exakt stimmen
    draw: +2 wenn penaltyphase erreicht & team & exact
    scorer: je +1 für ein tor des getippten Torschützen
```