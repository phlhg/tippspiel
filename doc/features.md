# Features

(Zeitpunkte und Intervalle werden mit Unix-Timestamps angegeben)

## User

```name```: Jeder Nutzer hat einen lesbaren (kein hash) Namen

```id```: Zur eindeutigen Identifkation des Nutzers

```token```: Zur Authentifikation des Nutzers

```permissions```: Berechtigungen für den Benutzer basierend auf Freigaben als Boolean

```
    invitation: true
    eventAnnounce: false
    eventResult: false
    gameAnnounce: false
    gameResult: true
```

## Group

Gruppen ermöglichen eine Separation von mehrern Nutzern. Dabei werden diesen Nutzern nur Resultate der eigenen Gruppe angezeigt.

```id```: Zur Identifizierung der Gruppe

```name```: Lesbarer Name der Gruppe

```memberids```: Liste von IDs der Mitglieder

```token```: Zur Autorisierung beim Beitreten

```points```: (Nicht physisch vorhanden) Durchschnittliche Anzahl Punkte pro Mitglied

## Event

Ein Anlass ist den Spielen übergeordnet und fasst diese Zusammen. Es können Tipps auf einen gesamten Anlass abgegeben werden.

```id```: Zur Identifizierung des Events

```name```: Lesbarer Name des Events

```description```: Lesbare Beschreibung des Events

```winner```: Name des Gesamtgewinners

```topscorer```: Name des Torschützenkönigs

```deadline```: Deadline für Tippabgaben (int)

```status```: Status des Events

```
0 UPCOMING
1 RUNNING
2 PENDING
3 ENDED
```

## EventTipp

```id```: Zur Identifizierung des Tipps

```eventid```: ID des zugehörigen Events

```userid```: ID des Nutzers, welcher den Tipp abgeben hat

```winner```: Name des getippten Gesamtgewinners

```topscorer```: Name des getippten Torschützenkönigs

```points```: Anzahl Punkte für den Tipp

## Game

```id```: Zur Identifizierung des Spiels

```start```: UNIX Zeitstempel des Spielbeginn

```status```: Momentaner Status des Spiels

```
0 UPCOMING
1 RUNNING
2 PENDING (not used, e.g. Event)
3 ENDED
```

```decisionState```: Maximal erreichter Spielabschnitt

```
0 NORMAL
1 OVERTIME
2 PENALTY
```

```location```: Standort des Spiels z.B. *Bern, Stade de Suisse*

```team1.name```: Name des 1. Teams

```team1.points```: Punkte des 1. Teams

```team1.pointsExt```: Punkte des 1. Teams nach Spielverlängerung (inkl. normaler Spielzeit)

```team1.pointsPenalty```: Punkte des 1. Teams nach Penalty (exkl. vorheriger Spielzeit)

```team1.scorer```: Liste von Id von Torschützen (mit Duplikaten)

```team2.name```: Name des 2. Teams

```team2.points```: Punkte des 2. Teams

```team2.pointsExt```: Punkte des 2. Teams nach Spielverlängerung (inkl. normaler Spielzeit)

```team2.pointsPenalty```: Punkte des 2. Teams nach Penalty (exkl. vorheriger Spielzeit)

```team2.scorer```: Liste von Id von Torschützen (mit Duplikaten)

## GameTipp

```id```: Zur Identifizierung des Tipps

```gameid```: ID des zugehörigen Spiels

```userid```: ID des Nutzers, welcher den Tipp abgeben hat

```team1.points```: Getippte Anzahl Punkte des 1. Teams

```team1.pointsext```: Getippte Anzahl Punkte des 1. Teams nach Spielverlängerung

```team2.points```: Getippte Anzahl Punkte des 2. Teams

```team2.pointsext```: Getippte Anzahl Punkte des 2. Teams nach Spielverlängerung

```scorer```: Ein Torschütze

```points```: Anzahl Punkte für den Tipp

