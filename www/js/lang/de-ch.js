__LANG = window.__LANG ?? {}
__LANG["de-ch"] = {
    _name: "Schwiizer Dütsch",
    _extends: "de",
    name: "Tippspiil",
    errors: {
        server: {
            0: "Es isch en unbekannte Fehler uftrete",
            1: "Für das muesch dich ahmelde",
            2: "Die E-Mail wird scho gnutzt",
            3: "De Name wird scho gnutzt",
            4: "De Zuegangscode isch unbekannt",
            5: "De Name chasch nöd bringe",
            6: "Es chönd kei Tipps meh abgeh werde",
            7: "Du bisch scho aagmolde.",
            8: "Die Aafrag isch scho am laufe.",
            9: "Es git kein account mit de Email {email}",
            10: "Dä Account isch gsperrt worde.",
            11: "Die Funktion isch für {time} gsperrt.",
            12: "Es git kei Gruppe für dä Zuegangscode. Eventuell isch dä Zuegang zrugg gsetzt worde."
        },
        local: {
            "unknown": "Es isch en unbekannte Fehler uftrete",
            "noconnection": "S het momentan kei Verbinding zum Server",
        }
    },
    teams: {
        "aut": "Österich",
        "bel": "Belgie",
        "cro": "Kroazie",
        "cze": "Tschechie",
        "den": "Dänemark",
        "eng": "England",
        "esp": "Spanie",
        "fin": "Finland",
        "fra": "Frankrich",
        "ger": "Dütschland",
        "hun": "Ungarn",
        "ita": "Italie",
        "mkd": "Normazedonie",
        "ned": "Holland",
        "pol": "Pole",
        "por": "Portugal",
        "rus": "Rusland",
        "sco": "Schottland",
        "sui": "Schwiiz",
        "svk": "Slowakei",
        "swe": "Schwede",
        "tur": "Türkei",
        "ukr": "Ukraine",
        "wal": "Wales",
        "bhr": "Bahrain",
        "aze": "Aserbaidschan",
        "smr": "San Marino",
        "svn": "Slowenie",
        "usa": "USA",
        "nir": "Nordirland",
        "arm": "Armenie",
        "bul": "Bulgarie",
        "lie": "Liechtestei",
        "mda": "Moldavie",
        "gre": "Griecheland",
        "est": "Estland",
        "cyp": "Zypere",
        "alb": "Albanie",
        "rou": "Rumänie",
        "bih": "Bosnie",
        "lux": "Luxeburg",
        "geo": "Georgie",
        "lva": "Lettland",
        "isl": "Island",
        "irl": "Irland",
        "isr": "Israel"
    },
    date: {
        days: ["Sunntig","Mentig","Ziistig","Mittwuch","Dunnstig","Friitig","Samstig"],
        past_sec: "Ahgspilt",
        past_min: "Sit {m}'",
        past_today: "Hüt {h}:{m}",
        past_yesterday: "Gester {h}:{m}",
        future_sec: "Ines paar Sekunde!",
        future_min: "Ahspil ih {m}'",
        future_today: "Hüt {h}:{m}",
        future_tomorrow: "Morn {h}:{m}",
        future_day: "{d} {h}:{m}",
        general: "{day}.{month}.{year} {h}:{m}",
        tomorrow: "Morn",
        today: "Hüt",
        yesterday: "Gester",
        name: {
            day: "Tag",
            month: "Monet",
            year: "Jahr",
            hour: "Stund",
            minute: "Minute"
        }
    },
    general: {
        loading: "Lade..."
    },
    notifications: {
        postSignIn: "Du bisch jetzt ahgmeldet",
        postSignOut: "Du bisch abgemeldet worde",
        postSignUp: "Din Account isch erstellt worde - Lueg ih dinere Mailbox nach eme Mail vo eus.",
        postRecover: "Mer hend der en neue Zuegangscode gschickt - Lueg ih dini Mailbox",
        postSwitch: "Du hesch zu eme andere Account gwechslet",
        reconnecting: "Verbinde...",
        connecting: "Verbinde...",
        reconnected: "Verbunde",
        connected: "Verbunde",
    },
    section: {
        home: {
            pastgames: "Beändet"
        },
        errors: {
            notfound: {
                title: "Hoppla...",
                desc: "Da het leider epis ned richtig funktioniert",
                btn: "Zrugg zu Start"
            },
            noconnection: {
                title: "Hoppla...",
                desc: "S het momentan kei Verbindig mit em Server",
                btn: "Numal probiere"
            }
        },
        game: {
            create: {
                team1: {
                    name: "Team 1",
                    placeholder: "Wähl es Team us"
                },
                team2: {
                    name: "Team 2",
                    placeholder: "Wähl es wiiters Team us"
                },
                kickoff: "Ahspil",
                location: {
                    name: "Standort",
                    placeholder: "Stadt & Stadion wo s Spil stattfindet",
                },
                errors: {
                    missingteam: "Bitte wähl zwei Mannschafte us",
                    invaliddate: "Bitte gib es gültigs Datum & e gültigi Ziit ih",
                    missinglocation: "Bitte wähl en Standort für s Spiel",
                    notcreated: "S'Spiel het ned chene erstellt werde - Versuechs spöter numal"
                },
                submit: "Spiil erstelle"
            },
            tipp: {
                your: "Din Tipp",
                notyet: "Klick da zum tippe",
                none: "Du hesch ned tippt",
                form: {
                    result: "Resultat",
                    winner: "Gwünner",
                    winner_notice: "(bim ne Penaltyschüsse)",
                    topscorer: "Torschütz",
                    search: "Suech nach eme spiler",
                    submit: "Tippe"
                }
            },
            tipps: {
                single: "1 Tipp",
                multi: "{n} Tipps",
                list: "Tipps"
            },
            prompt: {
                ended: {
                    name: "S'Spiil beände?",
                    desc: "Meld s resultat"
                },
                continues: {
                    name: "S'Spil gaht wiiter?",
                    extension: "Spiil-Verlängerig melden",
                    penalty: "Penaltyschüsse melde"
                },
                extension: {
                    text: "Bitte duen bestätige, dass s'Spiil wiiter gaht",
                    confirm: "Spiil gaht wiiter",
                    deny: "Abbreche"
                }
            },
            report: {
                phase: {
                    name: "Spiil-Endi",
                    0: "Beändet nach 90 Minute",
                    1: "Beändet nach Verlängerig",
                    2: "Beändet nach Penaltyschüsse"
                },
                result: {
                    normal: "Resultat",
                    penalty: "Resultat vom Penaltyschüsse"
                },
                scorers: {
                    name: "Torschütz",
                    hint: "(Chronologisch, ohni Penaltyschüsse)",
                    select: "Wähl en Spieler"
                },
                submit: "Spiel beände"
            }
        },
        signUp: {
            title: "Registriere",
            desc: "Bitte gib din Name und dini E-Mail ih - Mer sendet dir denn en Zugangscode",
            placeholder : {
                name: "Name: z.B. Max Mustermann",
                email: "E-Mail: z.B. max.mustermann@beispiel.ch"
            },
            action: "Registriere",
            signInInstead: "Falls du scho en Account hesch, {a}",
            signInLink: "meld dich ah",
            nameTooLong: "Bitte nimm en chürzere Name"
        },
        signIn: {
            title: "Ahmelde",
            desc: "Gib din Zugangscode us de E-Mail, wo mer dir gschickt hend, ih.",
            placeholder : {
                code: "Zugangscode: z.B. 0-1a2b3c4d5e",
            },
            notAToken: "Bitte gib en richtige Zuegangscode ih",
            action: "Ahmelde",
            signUpInstead: "Falls du no kein Account hesch, {a}",
            signUpLink: "registrier dich",
            recover: "Falls du din Zugangscode verlore hesch, chasch {a}.",
            recoverLink: "en Neue ahfordere"
        },
        settings: {
            lang: {
                title: "Sprach",
                desc: "Wähl dini gwünschti Sprach"
            },
            theme: {
                title: "Design",
                desc: "Wähl dis gwünschte Design",
                auto: "Automatisch",
                light: "Hell",
                dark: "Dunkel"
            },
            report: {
                title: "Fehler melde",
                desc: "Epis funktioniert ned? Melds eus!"
            },
            idea: {
                title: "Idee vorschlah",
                desc: "Hesch en Idee fürs Tippspiel? Zeig sie eus!"
            },
            console: {
                title: "Konsole"
            },
            logout: {
                name: "Abmelde",
                desc: "Wetsch dich wük abmelde? Du bruchsch din Zuegangscode zum dich wieder ahmelde",
                confirm: "Abmelde",
                deny: "Abbreche"
            }
        },
        profile: {
            newgame: {
                name: "Neus Spiil",
                desc: "Erstell es neus Spiil"
            },
            tipps: {
                heading: "Mini Tipps"
            },
            nobets: {
                title: "No Kei Tipps",
                meta: "Mach jetzt din erste Tipp!"
            }
        },
        stats: {
            tabs: {
                all: "Alli",
                groups: "Dini Gruppe"
            },
            nogroups: {
                title: "Kei Gruppe usgwählt",
                meta: "Wähl zerst dini Gruppe us"
            }
        },
        tipp: {
            team: {
                name: "Richtigs Team",
                desc: "S'tippte Team het s'Spil gwunne."
            },
            delta: {
                name: "Richtigi Tordifferenz",
                desc: "Differenz vode Tor isch so wie tippt."
            },
            exact: {
                name: "Exakts Resultat",
                desc: "Es isch exkate Resultat vom Spiil tippt worde."
            },
            scorer: {
                name: "Torschütz",
                desc: "De gewählti Torschütz het {n} Tor gschosse."
            },
            penalty: {
                name: "Penaltyschüsse",
                desc: "Es isch uf es Penaltyschüsse tippt worde unds tippte Team het gwunne."
            },
            total: {
                name: "Total"
            }
        },
        groups: {
            none: {
                title: "Kei Gruppe",
                meta: "Erstell e Gruppe oder tritt einere bii"
            },
            new: {
                title: "Neui Gruppe",
                meta: "Erstell e neui Gruppe",
                desc: "Mit Gruppe bhaltisch de Überblick - Erstell e Gruppe mit Fründe, Arbeitskollege oder mit wem immer du wetsch!"
            },
            invitation: {
                link: "Gruppe-Ihladig",
                newlink: "Neui Gruppe-Ihaldig",
                newlinkmeta: "Erstell en neue Ihladigslink"
            },
            more: {
                title: "Meh",
                meta: "Umbenenne, Neue Ihladigslink, Verlah"
            },
            members: "Mitglieder",
            header: {
                by: "von {name}",
                members_multi: "{n} Mitglieder",
                members_single: "1 Mitglied"
            },
            create: {
                placeholder: "Gruppename: z.B. Gruppe vom Max",
                submit: "Gruppe erstelle"
            },
            leave: "Gruppe verlah",
            join: "Gruppe biitrete",
            messages: {
                left: "Du hesch d Gruppe verlah",
                invitation_copied: "De Ihladigslink isch id Zwüscheablag kopiert worde",
                created: "D'Gruppe isch erstellt worde",
                alreadymember: "Du bisch scho Mitglied vo dere Gruppe",
                joined: "Du bisch de Gruppe biitrete"
            },
            prompt: {
                newlink: {
                    text: "Mit em Erstelle vo eme neue Ihladigslink wird de <strong>alti Ihladigslink ungültig</strong>",
                    confirm: "Fortfahre",
                    deny: "Abbreche"
                },
                leave: {
                    text: "Wetsch du die Gruppe wük verlah?",
                    confirm: "Verlah",
                    deny: "Abbreche"
                }
            }
        },
        event: {
            tipp: {
                single: "1 Tipp",
                multi: "{n} Tipps",
                your: "Diin Tipp",
                deadline: "Offe bis {d}"
            },
            addgame: {
                name: "Spiil hinzuefüege",
                desc: "Füeg em Event es neues Spiil hinzue",
            },
            games: {
                heading: "Spiil"
            },
            tile: {
                desc: "Event"
            }
        },
        recover: {
            title: "Zuegangscode verlore",
            desc: "Irgendwie diin Zuegangscode verlore? Gib d'E-Mail wo dich regstriert hesch ih und mer sendet dir en Neue.",
            placeholder: "Dini E-Mail: z.B. max.mustermah@bispiil.ch",
            submit: "Sende",
            meta1: "Falls kei Zuegriff uf dini E-Mail hesch oder dini E-Mail nüme weisch, nimm bitte {a}.",
            meta2: "Kontakt mit eus uuf"
        }
    },
    pwa_info: {
        ios: '<strong>Tippspiel App</strong><br/>Wetsch s\'Tippspiel uf em Startbildschirm?<br/>- Klick uf <span class="material-icons">ios_share</span><br/>- Wähl <i>zum Startbildschirm hinzufügen</i> us<br/>- Fertig!',
        android: '<strong>Tippspiel App</strong><br/>>Wetsch s\'Tippspiel uf em Startbildschirm?<br/>- Klick uf <span class="material-icons">more_vert</span><br/>- Wähl <span class="material-icons">add_to_home_screen</span> <i>Zum Startbildschirm hinzufügen</i> oder <i>Installieren</i> us<br/>- Fertig!',
    }
}