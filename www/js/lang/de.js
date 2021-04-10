__LANG = window.__LANG ?? {}
__LANG["de"] = {
    _name: "Deutsch",
    _extends: "en",
    name: "Tippspiel",
    errors: {
        '-1': "Feilchen sind blau, Rosen sind rot und der Server ist tot.", // keine Verbindung
        0: "Es ist ein unbekannter Fehler aufgetreten",
        1: "Für dies ist eine Anmeldung erforderlich",
        2: "Diese E-Mail wird bereits verwendet",
        3: "Dieser Name wird bereits verwendet",
        4: "Dieser Zugangscode ist unbekannt",
        5: "Dieser Name ist ungültig",
        6: "Es können keine Tipps mehr abgegeben werden",
        7: "Du bist bereits eingeloggt",
        8: "Dieser Prozess läuft bereits.",
        9: "Es gibt keinen Account mit der Email {email}"
    },
    teams: {
        "aut": "Österreich",
        "bel": "Belgien",
        "cro": "Krotatien",
        "cze": "Tschechien",
        "den": "Dänemark",
        "eng": "England",
        "esp": "Spanien",
        "fin": "Finland",
        "fra": "Frankreich",
        "ger": "Deutschland",
        "hun": "Ungarn",
        "ita": "Italien",
        "mkd": "Nordmazedonien",
        "ned": "Niederlande",
        "pol": "Polen",
        "por": "Portugal",
        "rus": "Russland",
        "sco": "Schottland",
        "sui": "Schweiz",
        "svk": "Slowakei",
        "swe": "Schweden",
        "tur": "Türkei",
        "ukr": "Ukraine",
        "wal": "Wales"
    },
    date: {
        days: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
        past_sec: "Angespielt",
        past_min: "Seit {m}'",
        past_today: "Heute {h}:{m}",
        past_yesterday: "Gestern {h}:{m}",
        future_sec: "In einigen Sekunden!",
        future_min: "Anspiel in {m}'",
        future_today: "Heute {h}:{m}",
        future_tomorrow: "Morgen {h}:{m}",
        future_day: "{d} {h}:{m}",
        general: "{day}.{month}.{year} {h}:{m}",
    },
    general: {
        loading: "Laden..."
    },
    section: {
        home: {
            pastgames: "Beendet"
        },
        errors: {
            notfound: {
                title: "Hoppla...",
                desc: "Hier hat leider etwas nicht richtig funktioniert",
                btn: "Zurück zu Start"
            },
            noconnection: {
                title: "Hoppla...",
                desc: "Es besteht zurzeit keine Verbindung mit dem Server"
            }
        },
        game: {
            create: {
                team1: {
                    name: "Team 1",
                    placeholder: "Wähle ein Team aus"
                },
                team2: {
                    name: "Team 2",
                    placeholder: "Wähle ein weiteres Team aus"
                },
                kickoff: "Anspiel",
                location: {
                    name: "Standort",
                    placeholder: "Stadt & Stadion in dem das Spiel stattfindet",
                },
                errors: {
                    missingteam: "Bitte wähle zwei Mannschaften aus",
                    invaliddate: "Bitte gib ein gültiges Datum & eine gültige Zeit ein",
                    missinglocation: "Bitte wähle einen Standort für das Spiel",
                    notcreated: "Das Spiel konnte nicht erstellt werden - Versuche es später erneut"
                }
            },
            tipp: {
                your: "Dein Tipp",
                notyet: "Du hast noch nicht getippt",
                none: "Du hast nicht getippt",
                form: {
                    result: "Resultat",
                    winner: "Gewinner",
                    winner_notice: "(bei möglichem Penaltyschiessen)",
                    topscorer: "Torschütze",
                    search: "Suche nach einem Spieler",
                    submit: "Tippen"
                }
            },
            tipps: {
                single: "1 Tipp",
                multi: "{n} Tipps"
            },
            prompt: {
                ended: {
                    name: "Spiel beendet?",
                    desc: "Melde das Resultat"
                },
                continues: {
                    name: "Spiel geht weiter?",
                    extension: "Spiel-Verlängerung melden",
                    penalty: "Penaltyschiessens melden"
                }
            }
        },
        signUp: {
            title: "Registrieren",
            desc: "Gib deinen Namen und deine E-Mail ein und erhalte von uns einen Zugangscode",
            placeholder : {
                name: "Name: z.B. Max Mustermann",
                email: "E-Mail: z.B. max.mustermann@beispiel.de"
            },
            action: "Registrieren",
            signInInstead: "Falls du schon einen Account hast, {a}",
            signInLink: "melde dich an"
        },
        signIn: {
            title: "Anmelden",
            desc: "Gib deinen Zugangscode oder den Link <i>aus der E-Mail</i>, die wir dir gesendet haben, ein.",
            placeholder : {
                code: "Zugangscode: z.B. 0-1a2b3c4d5e",
            },
            action: "Anmelden",
            signUpInstead: "Falls du noch keinen Account hast, {a}",
            signUpLink: "registriere dich"
        },
        settings: {
            lang: {
                title: "Sprache",
                desc: "Ändert die Sprache des Tippspiels"
            },
            report: {
                title: "Fehler melden",
                desc: "Etwas funktioniert nicht? Melde es uns"
            },
            idea: {
                title: "Idee vorschlagen",
                desc: "Du hast eine Idee fürs Tippspiel? Zeige sie uns!"
            },
            console: {
                title: "Konsole"
            }
        },
        profile: {
            tipps: {
                heading: "Meine Tipps"
            }
        },
        tipp: {
            team: {
                name: "Richtiges Team",
                desc: "Das getippte Team hat das Spiel gewonnen."
            },
            delta: {
                name: "Richtige Tordifferenz",
                desc: "Die Differenz der Tore ist gleich wie getippt."
            },
            exact: {
                name: "Exaktes Resultat",
                desc: "Es wurde das exakte Resultat des Spiels getippt."
            },
            scorer: {
                name: "Torschütze",
                desc: "Der gewählte Torschütze hat {n} Tor(e) geschossen."
            },
            penalty: {
                name: "Penaltyschiessen",
                desc: "Es wurde auf ein Penaltyschiessen getippt und das getippte Team hat gewonnen."
            },
            total: {
                name: "Total"
            }
        }
    }
}