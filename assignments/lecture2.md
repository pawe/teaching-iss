# Beispiel aus dem Vortrag zur zweiten HÜ

## Normalisierung

SVNR, Name, Sprache, Grad

Testdaten: `solutions/lecture2/testdata_lang.csv`


```
$svnr,$name,$sprache,$grad
105,Monika Müller,englisch,2
325,Siegfried Stinger,französisch,3
325,Siegfried Stinger,portugisisch,2
2345,Anita Almer,polnisch,3
105,Monika Müller,russisch,3
234,Hugo Hundt,französisch,1
325,Siegfried Stinger,spanisch,3
```


### ER Diagramm
Das erweiterte und angepasste sieht mit  [min, max] Notation für die Kardinalitäten folgendermaßen aus:

![Organisation with Skills](/public/images/org_with_skills.png)


#### Schema

> Mitarbeiter (**SVNR**, Nachname, Vorname, Stundensatz) 

> SprachFähigkeiten (_**Mitarbeiter**_, **Sprache**, Grad)

**Spalte** ... ist Primärschlüssel

_Spalte_ ... ist Fremdschlüssel



### Tabelle(n) erstellen
Schema erweitern `solutions/lecture2/migration_up.sql`

```sql
-- für die Mitarbeiterdaten verwenden wir die Mitarbeitertabelle erstellt in 
-- der ersten Hausübung

CREATE TABLE SprachFähigkeiten (
  Mitarbeiter NUMERIC,
  Sprache TEXT,
  Grad NUMERIC
  FOREIGN KEY(Mitarbeiter) REFERENCES Mitarbeiter(SVNR)
  PRIMARY KEY (Mitarbeiter, Sprache)
)
```


### Daten einfügen
Daten einfügen erweitern wir den ... `solutions/lecture2/data_intake.sql`.

```sql
-- Platzhalter
--   $svnr, $name, $sprache, $grad

-- Leitet eine Transaktion ein
BEGIN;

-- Wenn ein Fehler auftritt (zB. weil die SVNR bereits exisistert soll die 
-- Anweisung ohne Fehlermeldung ignoriert werden) 
INSERT OR IGNORE INTO Mitarbeiter (SVNR, Vorname, Nachname) 
VALUES (
  $svnr, 
  substr($name, 1, instr($name, ' ') - 1),
  substr($name, instr($name, ' ') + 1) 
);

-- Wenn ein Mitarbeiter eine Sprache bereits beherrscht soll die ganze Zeile
-- mit dem neuen Grad ersetzt werden. 
INSERT OR REPLACE INTO SprachFähigkeiten 
VALUES ($svnr, $sprache, $grad);

-- Beendet die Transaktion
COMMIT;
```

`BEGIN` bis `COMMIT` bildet die Transaktion. Das bedeutet: entweder werden die Änderungen aller Befehle wirksam oder keine. Mehr Informationen finden Sie [hier](https://www.sqlite.org/lang_transaction.html). 

Wir möchten nicht dass die Transaktion abbricht, wenn Daten in einer Tabelle schon vorhanden sind, d.h. wir geben zusätzlich mit `OR IGNORE` an was passieren soll, wenn ein Konflikt eintritt. Bei unseren Testdaten sollte  nur "unique constraint" Konflikt auftretten können. Dokumentation zur INSERT finden sie auf [www.sqlite.org/lang_insert.html](https://www.sqlite.org/lang_insert.html) 

Wir gehen hier (etwas fragwürdiger Weise), davon aus dass eine Name immer aus genau einem Vor- und genau einem Nachnamen bestehen die durch genau ein Leerzeichen getrennte sind. Mittels der Funktion `instr($name, ' ')` finden wird die Position des Leerzeichens, welche dann verwendet wird um mittels `substr()` den Namen aufzuteilen. Einmal den ersten Teil (Vorname) und ein zweites Mal den letzten Teil (Nachname). Dokumentation dieser Zeichenkettenfunktionen für SQLite finden sie [hier](https://www.sqlite.org/lang_corefunc.html).


### Abfragen

#### Tabellen Verknüpfen (JOINS)
Nachdem wir die Daten in zwei Tabellen aufgeteilt haben, verknüpfen wir die 
Tabellen beim Abfragen mit einem `JOIN`. Wie die Tabellen miteinander verbunden 
werden, wird mit einer Bedingung bestimmt. Die Bedingung ist: Die Spalte SVNR 
der Tabelle Mitarbeiter soll mit den Werten in der Spalte Mitarbeiter der Tabelle 
SprachFähigkeiten übereinstimmen.

```sql
SELECT SVNR, Vorname, Nachname, Sprache, Grad
FROM SprachFähigkeiten
JOIN Mitarbeiter ON Mitarbeiter.SVNR = SprachFähigkeiten.Mitarbeiter
```

Weitere Tabellen können mit weiteren JOINs verknüpft werden. Beispielsweise,
wenn wir nur die Sprachfähigkeiten der Mitarbeiter in einem Projekt abfragen möchten.

```sql
SELECT SVNR, Vorname, Nachname, Sprache, Grad
FROM arbeitet_in
JOIN Mitarbeiter ON Mitarbeiter.SVNR = arbeitet_in.Mitarbeiter
JOIN SprachFähigkeiten ON SprachFähigkeiten.Mitarbeiter = arbeitet_in.Mitarbeiter
WHERE Abteilung = $deptShort
```


##### Ausgabe Sortieren
Das ganze sortiert nach dem Grad die ein Mitarbeiter eine Sprache spricht.

```sql
SELECT SVNR, Vorname, Nachname, Sprache, Grad
FROM SprachFähigkeiten
JOIN Mitarbeiter ON Mitarbeiter.SVNR = SprachFähigkeiten.Mitarbeiter
ORDER BY Grad ASC
```

Die Reihenfolge kann mit `DESC` umgekehrt werden. `ASC` steht für ascending 
(aufsteigend) und `DESC` für descenting (absteigend). Wird weder `ASC` noch 
`DESC` angegeben, wird aufsteigend (`ASC`) sortiert.


##### Aggregierungen
Durchschnittsniveau pro Sprache: Nachdem nur französisch von mehreren Personen eingetragen ist...

```sql
SELECT Sprache, AVG(Grad)
FROM SprachFähigkeiten
GROUP BY Sprache
```

Die Ausgabe kann auch nach dem aggregierten Wert sortiert werden. Im folgendem 
Beispiel wird (mit `2`) angegeben nach der wievielten Spalte der Rückgabe 
sortiert werden soll.

```sql
SELECT Sprache, AVG(Grad)
FROM SprachFähigkeiten
GROUP BY Sprache
ORDER BY 2 -- steht für die zweite spalte der obigen Abfrage, d.h. AVG(Grad)
```


`COUNT` ist ebenfalls eine Aggregierung, hier wird sie verwendet um abzufragen,
welcher Mitarbeiter wie viele Sprachen spricht. Zum Unterschied zu vorher, wird 
hier die umbenannte Spaltenbezeichnung bei der Sortierung angegeben.

```sql
SELECT m.Vorname, m.Nachname, COUNT(Sprache) AS anzahlSprachen
FROM Mitarbeiter m 
JOIN SprachFähigkeiten sf ON sf.Mitarbeiter = m.SVNR 
GROUP BY m.SVNR
ORDER BY Nachname, Vorname, anzahlSprachen
```
