# Web Push

## Notifications

### GameStart

```js

    {
        subscription: {}, // provided by browser
        type: "GameStart",
        data: {
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