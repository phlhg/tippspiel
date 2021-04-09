# Synchronisation

Beschreibt das Format in welchem Daten zwischen Client und Server synchronisiert werden.

(Zeitpunkte und Intervalle werden mit Unix-Timestamps angegeben)

## User

```js
User {
    name: String,
    id: Int,
    points: Int
}
```

## Group

```js
Group {
    id: int,
    name: String(100),
    owner: User
    users: [ User, ... ]
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
    games: [ Game , ... ]
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
    teams: [ Team, ...]
    games: [ Game, ... ],
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
    reward: int,
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
}
```

## GameTipp

```js
GameTipp {
    id: int,
    game: Game,
    user: User,
    bet1: int,
    bet2: int,
    winner: Team,
    topscorer: Player,
    reward: int,
    tippkat: enum, // Preiskategorie
    goals: int, // der Torschütze hat so viel getroffen
    bonus: bool // Bonus für korrektes Penaltyschiessen (+1)
}
```

`tipkat`: Preiskategorie des Tipps
```js
0 TIPPKAT.WRONG // Komplett falsch getippt (+0)
1 TIPPKAT.TEAM // Auf richtiges Team getippt (+1)
2 TIPPKAT.DIFF // Richtige Tordifferenz (+2)
3 TIPPKAT.EXACT // Exaktes Resulat (+4)
```
