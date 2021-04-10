__LANG = window.__LANG ?? {}
__LANG["en"] = {
    _name: "English",
    name: "Tippspiel",
    errors: {
        '-1': "There is currently no connection to the server",
        0: "An unknown error occured",
        1: "Please sign in",
        2: "This E-Mail is already in use",
        3: "This name is already in use",
        4: "This accesscode is unkown",
        5: "This name is invalid",
        6: "Tipps can't be submitted anymore",
        7: "You are already logged in.",
        8: "This request is already running.",
        9: "There is no account with the email {email}"
    },
    teams: {
        "aut": "Austria",
        "bel": "Belgium",
        "cro": "Croatia",
        "cze": "Czech Republic",
        "den": "Denmark",
        "eng": "England",
        "esp": "Spain",
        "fin": "Finland",
        "fra": "France",
        "ger": "Germany",
        "hun": "Hungary",
        "ita": "Italy",
        "mkd": "North Macedonia",
        "ned": "Netherlands",
        "pol": "Poland",
        "por": "Portugal",
        "rus": "Russia",
        "sco": "Scotland",
        "sui": "Switzerland",
        "svk": "Slovakia",
        "swe": "Sweden",
        "tur": "Turkey",
        "ukr": "Ukraine",
        "wal": "Wales"
    },
    date: {
        days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        past_sec: "Kickoff!",
        past_min: "Since {m}'",
        past_today: "Today {h}:{m}",
        past_yesterday: "Yesterday {h}:{m}",
        future_sec: "About to start",
        future_min: "Kickoff in {m}'",
        future_today: "Today {h}:{m}",
        future_tomorrow: "Tomorrow {h}:{m}",
        future_day: "{d} {h}:{m}",
        general: "{day}/{month}/{year} {h}:{m}",
    },
    general: {
        loading: "Loading..."
    },
    section: {
        home: {
            pastgames: "Finished"
        },
        errors: {
            notfound: {
                title: "Whoops...",
                desc: "Something didn't work as expected here",
                btn: "Back to Home"
            },
            noconnection: {
                title: "Whoops...",
                desc: "There is currently no connection to the server"
            }
        },
        game: {
            tipp: {
                your: "Your bet",
                notyet: "You haven't betted yet",
                none: "You haven't betted",
                form: {
                    result: "Result",
                    winner: "Winner",
                    winner_notice: "(in case of a penalty shootout)",
                    topscorer: "Topscorer",
                    search: "Search for a player",
                    submit: "Bet now"
                }
            },
            create: {
                team1: {
                    name: "Team 1",
                    placeholder: "Select a team"
                },
                team2: {
                    name: "Team 2",
                    placeholder: "Select another team"
                },
                kickoff: "Kickoff",
                location: {
                    name: "Location",
                    placeholder: "City & Stadium where the match takes place",
                },
                errors: {
                    missingteam: "Please select two teams",
                    invaliddate: "Plase enter a valid date & time",
                    missinglocation: "Please select a location",
                    notcreated: "Match could not be created - Try again later"
                }
            },
            tipps: {
                single: "1 Bet",
                multi: "{n} Bets"
            },
            prompt: {
                ended: {
                    name: "Match ended?",
                    desc: "Report the result"
                },
                continues: {
                    name: "Match continues?",
                    extension: "Report match extension",
                    penalty: "Report penalty shootout"
                }
            }
        },
        signUp: {
            title: "Sign up",
            desc: "Please enter your Name and your E-Mail. We will then send you an accesscode",
            placeholder : {
                name: "Name: e.g. Tom Template",
                email: "E-Mail: e.g. tom.template@example.com"
            },
            action: "Sign up",
            signInInstead: "If you already have an account: {a}",
            signInLink: "Sign in instead"
        },
        signIn: {
            title: "Sign in",
            desc: "Please enter your accesscode or the link, <i>from the e-mail</i> we sent you.",
            placeholder : {
                code: "Accesscode: e.g. 0-1a2b3c4d5e",
            },
            action: "Sign in",
            signUpInstead: "If you don't have an account yet, {a}",
            signUpLink: "sign up instead"
        },
        settings: {
            lang: {
                title: "Language",
                desc: "Changes the language of Tippspiel"
            },
            report: {
                title: "Report an error",
                desc: "Something doesn't work? Report it to us!"
            },
            idea: {
                title: "Suggest a feature",
                desc: "Got an idea for Tippspiel? Show it to us!"
            },
            console: {
                title: "Console"
            }
        },
        profile: {
            newgame: {
                name: "New game",
                desc: "Create a new game"
            },
            tipps: {
                heading: "My bets"
            }
        }, 
        tipp: {
            team: {
                name: "Correct team",
                desc: "The betted team won the match"
            },
            delta: {
                name: "Correct goal difference",
                desc: "The difference between the goals is same as betted"
            },
            exact: {
                name: "Exact result",
                desc: "The exact result of the match was betted"
            },
            scorer: {
                name: "Scorer",
                desc: "The selected scorer scored {n} goal(s)"
            },
            penalty: {
                name: "Penalty shootout",
                desc: "It was betted on a penalty shootout and the betted team won"
            },
            total: {
                name: "Total"
            }
        }
    }
}