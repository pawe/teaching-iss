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

Wir möchten nicht dass die Transaktion abbricht, wenn Daten in einer Tabelle schon vorhanden sind, d.h. wir geben zusätlich mit `OR IGNORE` an was passieren soll, wenn ein Konflikt eintritt. Bei unseren Testdaten sollte  nur "unique constraint" Konflikt auftretten können. Dokumentation zur INSERT finden sie auf [www.sqlite.org/lang_insert.html](https://www.sqlite.org/lang_insert.html) 

Wir gehen hier (etwas fragwürdigerweise), davon aus dass eine Name immer aus genau einem Vor- und genau einem Nachnamen bestehen die durch genau ein Leerzeichen getrennte sind. Mittels der Funktion `instr($name, ' ')` finden wird die Position des Leerzeichens, welche dann verwendet wird um mittels `substr()` den Namen aufzuteilen. Einmal den ersten Teil (Vorname) und ein zeitesmal den letzten Teil (Nachname). Dokumentation dieser Zeichenkettenfunktionen für SQLite finden sie [hier](https://www.sqlite.org/lang_corefunc.html).


### Abfragen

#### Tabellen Verknüpfen (JOINS)
Nachdem wir die Daten in zwei Tabellen aufgeteilt haben, verknüpfen wir die 
Tabellen beim Abfragen mit einem `JOIN`. Wie die Tabellen miteinander verbunden 
werden werden mit einer Bedingung bestimmen. Die Bedingung ist: Die Spalte SVNR 
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
-- oder doch projekte?
SELECT SVNR, Vorname, Nachname, Sprache, Grad
FROM Projekte
JOIN Mitarbeiter ON Mitarbeiter.SVNR = SprachFähigkeiten.Mitarbeiter
JOIN arbeitet_in ON Mitarbeiter.SVNR = arbeitet_in.Mitarbeiter
JOIN Abteilung ON arbeitet_in.Abfrage = Abteiung.Name
WHERE Abteilung.Name = 'Kon'
```

Alle mitarbeiter in einem Projekt mit ihrer besten sprache...

```sql
LEFT JOIN...
```

```


##### Ausgabe Sortieren
Das ganze sortiert nach dem Grad die ein Mitarbeiter eine Sprache spricht.

```sql
SELECT SVNR, Vorname, Nachname, Sprache, Grad
FROM SprachFähigkeiten
JOIN Mitarbeiter ON Mitarbeiter.SVNR = SprachFähigkeiten.Mitarbeiter
ORDER BY Grad ASC
```

Möchten wir die Reiehenfolge umkehren... DESC. Im obigen beispiel wurde nichts angegeben...
per default ASC. ASC steht für Ascending (aufsteigend) und DESC für descenting (absteigend).


##### Aggregierungen
Durchschnittsniveau pro Sprache: Nachdem nur französisch von mehreren Personen eingetragen ist...

```sql
SELECT Sprache, AVG(Grad)
FROM SprachFähigkeiten
GROUP BY Sprache
```

Die ausgabe auch nach dem Aggregiertem wert 

```sql
SELECT Sprache, AVG(Grad)
FROM SprachFähigkeiten
GROUP BY Sprache
ORDER BY 2 -- steht für die zweite spalte der obigen abfrage, d.h. AVG(Grad)
```


Wer ist der jeweilige sprachlich begabteste mitarbeiter... 

```sql
SELECT Vorname, Nachname, AVG(Grad)
FROM SprachFähigkeiten
JOIN Mitarbeiter ON Mitarbeiter.SVNR = SprachFähigkeiten.Mitarbeiter
GROUP BY Vorname, Nachname
ORDER BY 3
```

Mitarbeiter mit vielen Sprachen auf niedrigem niveau... Erweitern wir die metric für sprachliche begabung. Nachdem vermutlich personen die mehrere sprachen sprechen...

```sql
SELECT Vorname, Nachname, AVG(Grad), COUNT(*)
FROM SprachFähigkeiten
JOIN Mitarbeiter ON Mitarbeiter.SVNR = SprachFähigkeiten.Mitarbeiter
GROUP BY Vorname, Nachname
ORDER BY 4 DESC, 3
```

Komplexere berechnung der sprachlichen Begabung...

```sql
SELECT Vorname, Nachname, AVG(Grad) * COUNT(*)
FROM SprachFähigkeiten
JOIN Mitarbeiter ON Mitarbeiter.SVNR = SprachFähigkeiten.Mitarbeiter
GROUP BY Vorname, Nachname
ORDER BY 3
```

Haben wir viele Mitarbeiter und wir sind nur an den besten interssiert können wir die Anzahl an Rückgabezeilen beschränken

```sql
LIMIT...

```

Interessieren wir uns nicht für die besten sondern ... Anwendungsfall Pagination dann können wir zusätzlich mit Offset... angeben ab welcher Zeile...

```sql
LIMIT...
OFFSET ..
```



Im ersten Beispiel kam schon ein Max for.. Durchschnittliche Stundensatz über alle mitarbeiter.

```sql
SELECT AVG(Stundensatz)
FROM Mitarbeiter;
```

Möchten wir jetzt die durchschnittlichen Stundensätze per abteilung können wir mit `GROUP BY` angeben, dass die aggregierung (durchschnitt)  sich nur auf die mitarbeiter Mitarbeiter einzelner Abteilungen bezieht.

```sql
SELECT a.Beschreibung, AVG(Stundensatz)
FROM Mitarbeiter m
JOIN arbeitet_in ai ON m.SVNR = ai.Mitarbeiter
JOIN Abteilungen a ON a.Name = ai.Abteilung
GROUP BY a.Beschreibung;
```

Möchten wir auflisten den maximalen Stundensatz pro Abteilugn können wir das AVG durch MAX ersetzen. Wir können die Ausgabe zusätzlich noch mit GROUP BY sortieren. Von groß nach klein...

```sql
SELECT 
  a.Beschreibung, 
  MAX(Stundensatz) AS MaximalerStundensatzProAbteilung
FROM Mitarbeiter m
JOIN arbeitet_in ai ON m.SVNR = ai.Mitarbeiter
JOIN Abteilungen a ON a.Name = ai.Abteilung
GROUP BY a.Beschreibung
ORDER BY MaximalerStundensatzProAbteilung DESC;
```


In welchem Projekt wird am besten englisch gesprochen?

Unter allen französisch sprechenden... (WHERE vs HAVING)
