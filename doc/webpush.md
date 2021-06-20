# Web Push

## Notifications

### GameStart

```js

    {
        subscription: {}, // provided by browser
        type: "GameStart",
        data: {
            "lang": String // Preferred language
            "name1": String // Short of the first team
            "name2": String // Short of the second team
            "location": String // Laction of the match
            "tipped": Boolean // User has tipped on the game
            "id": int // Id of the game
        }
    }

```

### GameEnd

```js

    {
        subscription: {}, // provided by browser
        type: "GameEnd",
        data: {
            "lang": String // Preferred language
            "name1": String // Short of the first team
            "name2": String // Short of the second team
            "score1": Int // Goals scored by the first team
            "score2": Int // Goals scored by the second team
            "penalty1": Int // Goals scored in pentaly by first team
            "penalty2": Int // Goals scored in pentaly by second team
            "phase": Int // Latest phase of the game
            "points": int // Points received by the user
            "id": int // Id of the game
        }
    }

```

### EventStart

This Push signals the deadline of the eventtipp. Not the start of the event itself!

```js

    {
        subscription: {}, //provided by browser
        type: "EventStart",
        data: {
            "lang": String // Preferred language
            "name": String // name of the event
            "id": int // Id of the event
            "tipped": Boolean // Whether the user has already tipped
        }
    }

```

### EventEnd

```js

    {
        subscription: {}, //provided by browser
        type: "EventEnd",
        data: {
            "lang": String // Preferred language
            "name": String // name of the event
            "id": int // Id of the event
            "winner": String // short of the winner team
            "topscorer": String // name of the topscorer
            "points": Int // points earned by the tipp
        }
    }

```