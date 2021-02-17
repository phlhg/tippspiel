# Console

## Befehle

**Get** Zeigt ein Objekt an
```
access get [object]
```

**Set** Setzt ein Objekt auf einen passenden Wert
```
access set {object} {value}
```

**Emplace** Fügt einer Liste einen Eintrag hinzu
```
access emplace {object} {value}
```

**Erase** Löscht ein Element einer Liste
```
access set {object}
```

**List** Listet elemente eines Listen-Objektes auf
```
access set {object}
```
**Print** Gibt eine Tabelle als .csv auf dem Server aus.
```
access set {object}
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




