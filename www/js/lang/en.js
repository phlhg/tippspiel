__LANG = window.__LANG ?? {}
__LANG["en"] = {
    _name: "English",
    name: "Tippspiel",
    errors: {
        server: {
            0: "An unknown error occured",
            1: "Please sign in",
            2: "This email is already in use",
            3: "This name is already in use",
            4: "This access code is unkown",
            5: "This name is invalid",
            6: "Tipps can't be submitted anymore",
            7: "You are already logged in.",
            8: "This request is already running.",
            9: "There is no account associated with this email",
            10: "This account has been banned - Get in touch with us",
            11: "This Request is disabled for {time}.",
            12: "There is no group corresponding to this access code. The access might have been reset by the group admin."
        },
        local: {
            "unknown": "An unkown error has occored",
            "noconnection": "There is currently no connection to the server"
        }
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
        "wal": "Wales",
        "bhr": "Bahrain",
        "aze": "Azerbaijan",
        "smr": "San Marino",
        "svn": "Slovenia",
        "usa": "USA",
        "nir": "Northern Ireland",
        "arm": "Armenia",
        "bul": "Bulgaria",
        "lie": "Liechtenstein",
        "mda": "Moldova",
        "gre": "Greece",
        "est": "Estonia",
        "cyp": "Cyprus",
        "alb": "Albania",
        "rou": "Romania",
        "bih": "Bosnia and Herzegovina",
        "lux": "Luxembourg",
        "geo": "Georgia",
        "lva": "Latvia",
        "isl": "Iceland",
        "irl": "Ireland",
        "isr": "Israel"
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
        general: "{day}.{month}.{year} {h}:{m}",
        date_only: "{day}.{month}.{year}",
        tomorrow: "Tomorrow",
        today: "Today",
        yesterday: "Yesterday",
        name: {
            day: "Day",
            month: "Month",
            year: "Year",
            hour: "Hour",
            minute: "Minute"
        }
    },
    general: {
        loading: "Loading..."
    },
    notifications: {
        postSignIn: "You're signed in now",
        postSignOut: "You were signed out",
        postSignUp: "Your account was created - Check your inbox for an email by us.",
        postRecover: "We sent you a new access code - Check your inbox",
        postSwitch: "You've switched to a different account",
        reconnecting: "Reconnecting...",
        connecting: "Connecting...",
        reconnected: "Reconnected",
        connected: "Connected",
        linkCopied: "The link was copied to clipboard"
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
                desc: "There is currently no connection to the server",
                btn: "Try again"
            }
        },
        game: {
            penalty: "Penalty shootout",
            tipp: {
                your: "Your bet",
                notyet: "Klick here to make your bet",
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
                },
                submit: "Create game"
            },
            tipps: {
                single: "1 Bet",
                multi: "{n} Bets",
                list: "Bets"
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
                },
                extension: {
                    text: "Please confirm, that the match continues",
                    confirm: "Match continues",
                    deny: "Cancel"
                }
            },
            report: {
                phase: {
                    name: "Game-End",
                    0: "Finished after 90 minutes",
                    1: "Finished after extension",
                    2: "Finished after penalty shootout"
                },
                result: {
                    normal: "Result",
                    penalty: "Result of penalty shootout"
                },
                scorers: {
                    name: "Scorers",
                    hint: "(Chronological, without penalty shootout)",
                    select: "Select a player"
                },
                submit: "End game"
            }
        },
        signUp: {
            email: {
                title: "Sign up",
                desc: "Please provide your email address - We will send your personal access code to this address",
                action: "Continue",
                meta: "Your email address will not be public, will not be passed on and will no be used for advertising by us."
            },
            name: {
                title: "Sign up",
                desc: "Choose your name - This can be your real name, a nickname or something else.",
                action: "Sign up!",
                meta: "Please don't use offensive names - Names are publicly visible."
            },
            welcome: {
                title: "Welcome!",
                desc: "You've successfully created an Account - Please check your inbox for an email by us.",
                action: "Sign in",
                meta: "If you didn't get an email please {a} with us.",
                metaLink: "get in touch" 
            },
            placeholder : {
                name: "Name: e.g. Tom Template",
                email: "E-Mail: e.g. tom.template@example.com"
            },
            errors: {
                nameTooLong: "Please select a shorter name",
                noName: "Please enter a name",
                noEmail: "Please enter an email address"
            },
            signInInstead: "If you already have an account, {a}.",
            signInLink: "sign in instead"
        },
        signIn: {
            title: "Sign in",
            desc: "Please enter your access code from the e-mail we've sent you.",
            placeholder : {
                code: "Access code: e.g. 0-1a2b3c4d5e",
            },
            notAToken: "Please enter a valid access code",
            action: "Sign in",
            signUpInstead: "If you don't have an account yet, {a}",
            signUpLink: "sign up instead",
            recover: "In case you lost your access code you can {a}",
            recoverLink: "get a new one"
        },
        settings: {
            push: {
                title: "Notifications",
                desc: "Get informed about results",
                on: "On",
                off: "Off"
            },
            lang: {
                title: "Language",
                desc: "Choose your prefered language"
            },
            theme: {
                title: "Theme",
                desc: "Choose your prefered theme",
                auto: "Automatic",
                light: "Light",
                dark: "Dark"
            },
            rules: {
                title: "Rules",
                desc: "How the scoring works"
            },
            share: {
                title: "Share",
                desc: "Show Tippspiel to your friends and colleagues"
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
                title: "Console",
                desc: "Access the Server"
            },
            logout: {
                name: "Sign out",
                desc: "Do you really want to sign out? You need your access code to sign in again.",
                confirm: "Sign out",
                deny: "Cancel"
            },
        },
        stats: {
            tabs: {
                all: "All",
                groups: "Your groups"
            },
            nogroups: {
                title: "No groups selected",
                meta: "Select your groups first"
            }
        },
        profile: {
            newgame: {
                name: "New game",
                desc: "Create a new game"
            },
            tipps: {
                heading: "My bets"
            },
            nobets: {
                title: "No bets yet",
                meta: "Make your first bet now!"
            }
        }, 
        tipp: {
            team: {
                name: "Correct team",
                desc: "The betted team won the match."
            },
            delta: {
                name: "Correct goal difference",
                desc: "The difference between the goals is the same as betted."
            },
            exact: {
                name: "Exact result",
                desc: "The exact result of the match was betted."
            },
            scorer: {
                name: "Scorer",
                desc: "The selected scorer scored {n} goal(s)."
            },
            penalty: {
                name: "Penalty shootout",
                desc: "It was betted on a penalty shootout and the betted team won."
            },
            total: {
                name: "Total"
            }
        },
        groups: {
            none: {
                title: "No groups",
                meta: "Create a group or join one"
            },
            new: {
                title: "New Group",
                meta: "Create a new group",
                desc: "Groups let you keep track - Create a group with your friends, with your work colleagues or with whoever you want."
            },
            invitation: {
                link: "Group invitation",
                newlink: "New group inviation",
                newlinkmeta: "Create a new inviation link"
            },
            more: {
                title: "More",
                meta: "Rename, Reset token, Leave group"
            },
            members: "Members",
            header: {
                by: "by {name}",
                members_multi: "{n} Members",
                members_single: "1 Member"
            },
            create: {
                placeholder: "Groupname: e.g. Tom's Group",
                submit: "Create group"
            },
            leave: "Leave group",
            join: "Join group",
            messages: {
                left: "You've left the group",
                created: "The group was created",
                alreadymember: "You're already a member of that group",
                joined: "You've joined the group"
            },
            prompt: {
                newlink: {
                    text: "By creating a new inviation link the <strong>old invitation link gets invalid</strong>",
                    confirm: "Continue",
                    deny: "Cancel"
                },
                leave: {
                    text: "Do you really want to leave the group?",
                    confirm: "Leave",
                    deny: "Cancel"
                }
            },
            share: {
                title: "Group invitation",
                text: "Group invitation to {name}"
            }
        },
        event: {
            tipp: {
                single: "1 bet",
                multi: "{n} bets",
                your: "Your bet",
                deadline: "Open until {d}"
            },
            addgame: {
                name: "Add Game",
                desc: "Add a new game to the event",
            },
            games: {
                heading: "Games"
            },
            tile: {
                desc: "Event"
            }
        },
        recover: {
            title: "Lost access code",
            desc: "Somehow lost your access code? Enter the email you used to signup and we will send you a new one.",
            placeholder: "Your email: e.g. tom.template@example.com",
            submit: "Senden",
            meta1: "If you don't have access to your e-mail or you don't know your email anymore, please {a}.",
            meta2: "get in touch with us"
        },
        createPlayer: {
            title: "Create a player",
            desc: "Add a new / missing player to a team",
            team: {
                name: "Team",
                placeholder: "e.g. England"
            },
            name: {
                name: "Name",
                placeholder: "e.g. Harry Kane"
            },
            action: "Create player",
            missingInfo: "Found a missing player?",
            messages: {
                noTeam: "Please select a team",
                noName: "Please enter a name",
                existing: "This player already exists",
                success: "The player was added"
            },
            prompt: {
                text: "Duplicate players can cause issues in the game evaluation! - Please only add players that are really missing (Pay attention to spelling, alternative names, ordering, team, etc.)",
                confirm: "Add",
                deny: "Cancel"
            }
        }
    },
    pwa_info: {
        ios: '<strong>Tippspiel App</strong><br/>Want Tippspiel on your homescreen?<br/>- Click on <span class="material-icons">ios_share</span><br/>- Select <i>Add to Homescreen</i><br/>- Done!',
        android: '<strong>Tippspiel App</strong><br/>Want Tippspiel on your homescreen?<br/>- Click on <span class="material-icons">more_vert</span><br/>- Select <span class="material-icons">add_to_home_screen</span> <i>Add to Homescreen</i> or <i>Install</i><br/>- Done!',
    }
}