__LANG = window.__LANG ?? {}
__LANG["de"] = {
    _name: "Deutsch",
    _extends: "en",
    name: "Tippspiel",
    errors: {
        server: {
            0: "Es ist ein unbekannter Fehler aufgetreten",
            1: "Für dies ist eine Anmeldung erforderlich",
            2: "Diese E-Mail wird bereits verwendet",
            3: "Dieser Name wird bereits verwendet",
            4: "Dieser Zugangscode ist unbekannt",
            5: "Dieser Name ist ungültig",
            6: "Es können keine Tipps mehr abgegeben werden",
            7: "Du bist bereits eingeloggt",
            8: "Dieser Prozess läuft bereits.",
            9: "Es existiert keinen Account mit dieser E-Mail",
            10: "Dieser Account wurde gesperrt - Nimm mit uns Kontakt auf",
            11: "Diese Funktion ist nur begrenzt aufrufbar. Versuche es später noch ein Mal.",
            12: "Zu diesem Zugangscode existiert keine Gruppe. Eventuell wurde dieser Zugang zurückgesetzt."
        },
        local: {
            "unknown": "Es ist ein unbekannter Fehler aufgetreten",
            "noconnection": "Feilchen sind blau, Rosen sind rot und der Server ist tot.", // keine Verbindung
        }
    },
    teams: {
        "aut": "Österreich",
        "bel": "Belgien",
        "cro": "Kroatien",
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
        "wal": "Wales",
        "bhr": "Bahrain",
        "aze": "Aserbaidschan",
        "smr": "San Marino",
        "svn": "Slowenien",
        "usa": "USA",
        "nir": "Nordirland",
        "arm": "Armenien",
        "bul": "Bulgarien",
        "lie": "Liechtenstein",
        "mda": "Moldavien",
        "gre": "Griechenland",
        "est": "Estland",
        "cyp": "Zypern",
        "alb": "Albanien",
        "rou": "Rumänien",
        "bih": "Bosnien",
        "lux": "Luxemburg",
        "geo": "Georgien",
        "lva": "Lettland",
        "isl": "Island",
        "irl": "Irland",
        "isr": "Israel"
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
        name: {
            day: "Tag",
            month: "Monat",
            year: "Jahr",
            hour: "Stunde",
            minute: "Minute"
        }
    },
    general: {
        loading: "Laden..."
    },
    notifications: {
        postSignIn: "Du bist jetzt angemeldet",
        postSignUp: "Dein Account wurde erstellt - Schaue in deiner Mailbox nach einer E-Mail von uns.",
        reconnecting: "Verbinden...",
        connecting: "Verbinden...",
        reconnected: "Verbunden",
        connected: "Verbunden",
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
                desc: "Es besteht zurzeit keine Verbindung mit dem Server",
                btn: "Erneut versuchen"
            }
        },
        game: {
            penalty: "Penaltyschiessen",
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
                },
                submit: "Spiel erstellen"
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
                multi: "{n} Tipps",
                list: "Tipps"
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
            },
            report: {
                phase: {
                    name: "Spiel-Ende",
                    0: "Beendet nach 90 Minuten",
                    1: "Beendet nach Verlängerung",
                    2: "Beendet nach Penaltyschiessen"
                },
                result: {
                    normal: "Resultat",
                    penalty: "Resultat des Penaltyschiessens"
                },
                scorers: {
                    name: "Torschützen",
                    hint: "(Chronologisch, ohne Penaltyschiessen)",
                    select: "Wähle eine Spieler"
                },
                submit: "Spiel beenden"
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
            signUpLink: "registriere dich",
            recover: "Falls du deinen Zugangscode verloren hast, kannst du {a}.",
            recoverLink: "einen Neuen anfordern"
        },
        settings: {
            lang: {
                title: "Sprache",
                desc: "Wähle deine gewünschte Sprache"
            },
            theme: {
                title: "Design",
                desc: "Wähle dein gewünschtes Design",
                light: "Hell",
                dark: "Dunkel"
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
                title: "Konsole",
                desc: "Zugriff auf den Server"
            },
            logout: {
                name: "Abmelden",
                desc: "Du benötgst deinen Zuganscode um dich wieder anzumelden"
            }
        },
        profile: {
            newgame: {
                name: "Neues Spiel",
                desc: "Erstelle ein neues Spiel"
            },
            tipps: {
                heading: "Meine Tipps"
            },
        },
        stats: {
            tabs: {
                all: "Alle",
                groups: "Deine Gruppen"
            },
            nogroups: {
                title: "Keine Gruppen ausgewählt",
                meta: "Wähle zuerst deine Gruppen aus"
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
        },
        groups: {
            none: {
                title: "Keine Gruppen",
                meta: "Erstelle eine Gruppe oder trete einer bei"
            },
            new: {
                title: "Neue Gruppe",
                meta: "Erstelle eine neue Gruppe"
            },
            invitation: {
                link: "Einladungslink",
                newlink: "Neuer Einladungslink",
                newlinkmeta: "Erstelle einen neuen Einladungslink"
            },
            more: {
                title: "Weiteres",
                meta: "Umbennen, Neuer Einladungslink, Verlassen"
            },
            members: "Mitglieder",
            header: {
                by: "von {name}",
                members_multi: "{n} Mitglieder",
                members_single: "1 Mitglied"
            },
            create: {
                placeholder: "Gruppenname",
                submit: "Gruppe erstellen"
            },
            leave: "Gruppe verlassen",
            join: "Gruppe beitreten",
            messages: {
                left: "Du hast die Gruppe verlassen",
                invitation_copied: "Der Einladungslink wurde in die Zwischenablage kopiert",
                created: "Die Gruppe wurde erstellt",
                alreadymember: "Du bist bereits Mitglied dieser Gruppe",
                joined: "Du bist der Gruppe beigetreten"
            }
        },
        event: {
            tipp: {
                single: "1 Tipp",
                multi: "{n} Tipps",
                your: "Dein Tipp",
                deadline: "Offen bis {d}"
            },
            addgame: {
                name: "Spiel hinzufügen",
                desc: "Füge dem Event ein neues Spiel hinzu",
            },
            games: {
                heading: "Spiele"
            },
            tile: {
                desc: "Event"
            }
        },
        recover: {
            title: "Zugangscode verloren",
            desc: "Irgendwie deinen Zugansgcode verloren? Git die E-Mail mit der du dich Registriert hast ein und wir senden dir einen Neuen.",
            placeholder: "Deine E-Mail: z.B. max.mustermann@beispiel.de",
            submit: "Senden",
            meta1: "Falls du keinen Zugriff auf deine E-Mail hast oder deine E-Mail nicht mehr weisst, nimm bitte {a}.",
            meta2: "Kontakt mit uns auf"
        }
    },
    pwa_info: {
        ios: '<strong>Tippspiel App</strong><br/>Willst du Tippspiel auf dem Startbildschirm?<br/>- Klicke auf <span class="material-icons">ios_share</span><br/>- Wähle <i>zum Startbildschirm hinzufügen</i> aus<br/>- Fertig!',
        android: '<strong>Tippspiel App</strong><br/>Willst du Tippspiel auf dem Startbildschirm?<br/>- Klicke auf <span class="material-icons">more_vert</span><br/>- Wähle <span class="material-icons">add_to_home_screen</span> <i>Add to Homescreen</i> oder <i>Install</i> aus<br/>- Fertig!',
    }
}