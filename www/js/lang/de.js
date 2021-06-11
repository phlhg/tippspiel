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
            11: "Diese Funktion ist für {time} gesperrt.",
            12: "Zu diesem Zugangscode existiert keine Gruppe. Eventuell wurde dieser Zugang zurückgesetzt.",
            13: "Auf diesen Anlass kann nicht mehr getippt werden."
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
        date_only: "{day}.{month}.{year}",
        tomorrow: "Morgen",
        today: "Heute",
        yesterday: "Gestern",
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
        postSignOut: "Du wurdest abgemeldet",
        postSignUp: "Dein Account wurde erstellt - Schau in deiner Mailbox nach einer E-Mail von uns.",
        postRecover: "Wir haben dir einen neuen Zugangscode gesendet - Schau in deine Mailbox",
        postSwitch: "Du hast zu einem anderen Account gewechselt",
        reconnecting: "Verbinden...",
        connecting: "Verbinden...",
        reconnected: "Verbunden",
        connected: "Verbunden",
        linkCopied: "Der Link wurde in die Zwischenablage kopiert"
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
                notyet: "Klicke hier um zu tippen",
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
                },
                extension: {
                    text: "Bitte bestätige, dass das Spiel weiter geht",
                    confirm: "Spiel geht weiter",
                    deny: "Abbrechen"
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
            email: {
                title: "Registrieren",
                desc: "Bitte gib deine E-Mail-Adresse an - An diese werden wir deinen persönlichen Zugangscode senden.",
                action: "Weiter",
                meta: "Die E-Mail-Adresse ist nicht öffentlich, wird nicht weitergegeben und nicht für Werbung genutzt."
            },
            name: {
                title: "Registrieren",
                desc: "Wähle deinen Namen - Dies kann dein richtiger Name, ein Spitzname oder etwas anders sein.",
                action: "Registrieren!",
                meta: "Bitte benutze keine anstössigen Namen - Namen sind öffentlich sichtbar."
            },
            welcome: {
                title: "Willkommen!",
                desc: "Du hast erfolgreich einen Account erstellt - Bitte schaue in deiner Mailbox nach einer E-Mail von uns.",
                action: "Anmelden",
                meta: "Falls du keine E-Mail erhalten hast, nimm bitte {a}.",
                metaLink: "Kontakt mit uns auf" 
            },
            placeholder : {
                name: "Name: e.g. Max Mustermann",
                email: "E-Mail: e.g. max.mustermann@beispiel.de"
            },
            errors: {
                nameTooLong: "Bitte wähle einen kürzeren Namen",
                noName: "Bitte gib einen Namen ein",
                noEmail: "Bitte gib eine E-Mail-Addresse ein"
            },
            signInInstead: "Falls du schon einen Account hast, {a}",
            signInLink: "melde dich an",
        },
        signIn: {
            title: "Anmelden",
            desc: "Gib deinen Zugangscode aus der E-Mail, die wir dir gesendet haben, ein.",
            placeholder : {
                code: "Zugangscode: z.B. 0-1a2b3c4d5e",
            },
            notAToken: "Bitte gib einen korrekten Zuganscode ein",
            action: "Anmelden",
            signUpInstead: "Falls du noch keinen Account hast, {a}",
            signUpLink: "registriere dich",
            recover: "Falls du deinen Zugangscode verloren hast, kannst du {a}.",
            recoverLink: "einen Neuen anfordern"
        },
        settings: {
            push: {
                title: "Benachrichtigungen",
                desc: "Werde über Spiele und Resultate informiert",
                on: "An",
                off: "Aus"
            },
            lang: {
                title: "Sprache",
                desc: "Wähle deine gewünschte Sprache"
            },
            theme: {
                title: "Design",
                desc: "Wähle dein gewünschtes Design",
                auto: "Automatisch",
                light: "Hell",
                dark: "Dunkel"
            },
            rules: {
                title: "Regeln",
                desc: "Wie die Punktevergabe funktioniert"
            },
            share: {
                title: "Teilen",
                desc: "Zeige Tippspiel deinen Freunden & Bekannten",
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
                desc: "Möchtest du dich wirklich abmelden? Du benötgst deinen Zuganscode um dich wieder anzumelden.",
                confirm: "Abmelden",
                deny: "Abbrechen"
            }
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
        profile: {
            newgame: {
                name: "Neues Spiel",
                desc: "Erstelle ein neues Spiel"
            },
            tipps: {
                heading: "Deine Tipps"
            },
            nobets: {
                title: "Noch keine Tipps",
                meta: "Mach jetzt deinen ersten Tipp!"
            }
        },
        groups: {
            none: {
                title: "Keine Gruppen",
                meta: "Erstelle eine Gruppe oder trete einer bei"
            },
            new: {
                title: "Neue Gruppe",
                meta: "Erstelle eine neue Gruppe",
                desc: "Mit Gruppen behältst du den Überblick - Erstelle eine Gruppe mit deinen Freunden, mit deinen Arbeitskollegen oder mit wem immer du willst!"
            },
            invitation: {
                link: "Gruppen-Einladung",
                newlink: "Neue Gruppen-Einladung",
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
                placeholder: "Gruppenname: z.B. Gruppe von Max",
                submit: "Gruppe erstellen"
            },
            leave: "Gruppe verlassen",
            join: "Gruppe beitreten",
            messages: {
                left: "Du hast die Gruppe verlassen",
                created: "Die Gruppe wurde erstellt",
                alreadymember: "Du bist bereits Mitglied dieser Gruppe",
                joined: "Du bist der Gruppe beigetreten"
            },
            prompt: {
                newlink: {
                    text: "Durch Erstellen eines neuen Einladungslinks wird der <strong>alte Einladungslink ungültig</strong>",
                    confirm: "Fortfahren",
                    deny: "Abbrechen"
                },
                leave: {
                    text: "Möchtest du die Gruppe wirklich verlassen?",
                    confirm: "Verlassen",
                    deny: "Abbrechen"
                }
            },
            share: {
                title: "Gruppen-Einladung",
                text: "Gruppen-Einladung zu {name}"
            }
        },
        event: {
            tipp: {
                single: "1 Tipp",
                multi: "{n} Tipps",
                your: "Dein Tipp",
                deadline: "(Tippen möglich bis {d})",
                form: {
                    winner: "Gewinner",
                    phWinner: "Gewinner: z.B. Deutschland",
                    topscorer: "Torschützenkönig",
                    phTopscorer1: "Team: z.B. Deutschland",
                    phTopscorer2: "Spieler: z.B. Manuel Neuer",
                    action: "Tippen"
                },
                message: {
                    "noWinner": "Bitte wähle einen Gewinner aus",
                }
            },
            tipps: {
                name: "Tipps",
                desc: "Alle tipps auf dieses Event",
            },
            mytipp: {
                nobet: "Du hast nicht getippt",
                notyet: "Klicke hier um zu tippen"
            },
            addgame: {
                name: "Spiel hinzufügen",
                desc: "Füge dem Event ein neues Spiel hinzu",
            },
            games: {
                heading: "Spiele"
            },
            tile: {
                desc: "Event",
                and: "{team} & {player}"
            }
        },
        recover: {
            title: "Zugangscode verloren",
            desc: "Irgendwie deinen Zugansgcode verloren? Gib die E-Mail mit der du dich Registriert hast ein und wir senden dir einen Neuen.",
            placeholder: "Deine E-Mail: z.B. max.mustermann@beispiel.de",
            submit: "Senden",
            meta1: "Falls du keinen Zugriff auf deine E-Mail hast oder deine E-Mail nicht mehr weisst, nimm bitte {a}.",
            meta2: "Kontakt mit uns auf"
        },
        createPlayer: {
            title: "Erstelle einen Spieler",
            desc: "Füge einem Team einen neuen / fehlenden Spieler hinzu.",
            team: {
                name: "Team",
                placeholder: "z.B. Deutschland"
            },
            name: {
                name: "Name",
                placeholder: "z.B. Manuel Neuer"
            },
            action: "Spieler erstellen",
            missingInfo: "Fehlenden Spieler gefunden?",
            messages: {
                noTeam: "Bitte wähle ein Team aus",
                noName: "Bitte gib einen Namen ein",
                existing: "Dieser Spieler existiert bereits",
                success: "Der Spieler wurde hinzugefügt"
            },
            prompt: {
                text: "Doppelte Spieler können Probleme bei der Spielauswertung verursachen! - Bitte füge nur Spieler hinzu, welche wirklich fehlen (Achte auf die Schreibweise, Alternative Namen, Reihenfolge, Team, etc.)",
                confirm: "Hinzufügen",
                deny: "Abbrechen"
            }
        },
        tipps: {
            game: {
                team: {
                    name: "Richtiges Team",
                    desc: "Das getippte Team hat das Spiel gewonnen."
                },
                diff: {
                    name: "Richtige Tordifferenz",
                    desc: "Die Differenz der Tore (ohne Penalyschiessen) ist gleich wie getippt."
                },
                exact: {
                    name: "Exaktes Resultat",
                    desc: "Es wurde das exakte Resultat des Spiels (ohne Penalyschiessen) getippt."
                },
                scorer: {
                    name: "Torschütze",
                    desc: "Der gewählte Torschütze hat {n} Tor(e) geschossen."
                },
                penalty: {
                    name: "Penalty-Bonus",
                    desc: "Es wurde Unentschieden getippt und das Spiel wurde mit einem Penaltyschiessen beendet, welches das getippte Team gewonnen hat."
                },
                total: {
                    name: "Total"
                }
            },
            event: {
                team: {
                    name: "Richtiges Team",
                    desc: "Das getippte Team hat das Event gewonnen."
                },
                topscorer: {
                    name: "Torschützenkönig",
                    desc: "Der gewählte Spieler hat während des Events die meisten Tore geschossen"
                },
                total: {
                    name: "Total"
                }
            }
        }
    },
    pwa_info: {
        ios: '<strong>Willst du Tippspiel als App?</strong><br/>Klicke auf <span class="material-icons">ios_share</span> und wähle <u>zum Startbildschirm hinzufügen</u> aus.',
        android: '<strong>Willst du Tippspiel als App?</strong><br/>Klicke auf <span class="material-icons">more_vert</span> und wähle <u>Zum Startbildschirm hinzufügen</u> oder <u>Installieren</u> aus.',
    }
}