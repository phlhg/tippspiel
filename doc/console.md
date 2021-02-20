# Console

## Befehle

**Get** Zeigt ein Objekt an
```
access get {object}
```

**Set** Setzt ein Objekt auf einen passenden Wert
```
access set {object} {value}
```

**Emplace** Fügt einer Liste einen Eintrag hinzu
```
access emplace {list}
```

**Erase** Löscht ein Element einer Liste
```
access set {list}
```

**List** Listet elemente eines Listen-Objektes auf
```
access list {list}
```
**Print** Gibt eine Tabelle als .csv auf dem Server aus.
```
print {table}
```

**cache** zugriff auf den Synchronisations-cache
```
cache stats                        // zugriffsstatistik
cache newstats                     // statistik zurücksetzen
cache find {table} {index}         // einträge suchen
cache clear                        // cache leeren
cache update {table} {index} [urgency: optional] // eintrag aktualisieren
```

## Objekte

[Objekte der Datenbank](./database.md) können, wie folgt identifiziert werden:

### Allgemein

```
access get Object.id.property...
```

`Object` Typ des Objekts z.B. `User`

`id` Id des Objekts z.B. `5`

`property` Eigenschaft des Objekts z.B. `name`

Also als Beispiel:

```
access get User.5.name
```

### Listen

Um auf Listen zuzugreifen muss `access list` oder `access get` mit einer `id` verwendet werden. z.B:

```
access list User.1.groups
```` 

```
access get User.1.group.1.name
```` 




