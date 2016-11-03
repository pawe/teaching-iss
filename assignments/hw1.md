# Erste Hausübung

Erste Schritte mit Modellierung und einfache Datenbankabfragen. 
[Beispiele aus dem Vortrag](/assignments/lecture1.md). 

## Konzeptioneller Datenbankentwurf
Sie arbeiten in einer Produktentwicklungsabteilung und möchten Informationen 
zur ihren und den Produkten ihrer Mitbewerber verwalten. Sie beauftragen ein 
Softwareunternehmen um die von Ihnen gewünschten Funktionen umzusetzen. Um mit 
dem Softwarehersteller eine erfolgreiche Zusammenarbeit zu garantieren, 
erstellen sie ein Entity Relationship (ER) Diagramm. Konkret soll die Software 
das Speichern von Produkten, Produktfamilien, Produkten vom Mitbewerbern, 
sowie die Mitbewerbern selbst ermöglichen. Die Datenbank soll folgende 
Anforderungen erfüllen.


### Anforderungen
  * Zu einem Produkt sollen die interne Artikelnummer, die EAN (European 
    Article Number) und eine Produktbezeichnung gespeichert werden.
  * Ein Produkt hat genau einen verantwortlichen Produktmanager.
  * Eine Produktfamilie hat eine Bezeichnung, sowie genau einen 
    verantwortlichen Produktmanager für die Produktfamilie.
  * Ein Produktmanager kann für mehrere Produkte und Produktfamilien 
    verantwortlich sein.
  * Ein Produkt gehört zu genau einer Produktfamilie. Einer Produktfamilie 
    können mehrere Produkte zugehörig sein.
  * Eigene Produkte können mit mehreren Produkten vom Mitbewerber konkurrieren 
    und Produkte vom Mitbewerber können mit mehreren eigenen Produkten 
    konkurrieren.
  * Ein Mitbewerberprodukt hat eine EAN und ein Beschreibung.
  * Ein Mitbewerber kann mehrere Konkurenzprodukte herstellen. Ein 
    Konkurrenzprodukt wird von einem Mitbewerber hergestellt.
  * Ein Mitbwerber hat einen eindeutigen Namen.


### ER Diagramm
Transformieren Sie die textuelle Beschreibung und Anforderungen in ein 
ER Diagramm. Legen Sie dabei Kardinalitäten für Beziehungstypen und 
Primärschlüssel für Entitätstypen fest. 


### Schema
Leiten Sie aus ihrem ER Diagramm ein Datenbankschema ab. Verlangt wird hier 
noch kein SQL. Folgende Form ist für diese Aufgabe ausreichend:

> Tabellenbezeichnung (**Spalte1**, Spalte2, *Spalte3*, ... SpalteN)

Markieren sie **Primär-** und *Fremdschlüssel*.


#### Hinweis zur Erstellung des ER-Diagramms
Wir lassen Ihnen frei mit welchen Programm Sie das ER Diagramm zeichnen. Eine 
Möglichkeit ist [Dia](http://dia-installer.de/).

#### Hinweis zur Dokumentation
Speichern Sie Ihr ER Diagramm und Ihre Schemadefinition in einer PDF-Datei im 
Verzeichnis `solutions/hw1`. Wie Sie die Hausübung abgeben können, ist 
[hier](#abgabe) beschrieben.


## Mitarbeiterverwaltung
Ihre Aufgabe ist es einfache SQL <a href="#abfragen">Abfragen</a> zu erstellen. 
Basis ist dieses ER Diagramm aus dem Vortrag zur Hausübung.

![Users](/public/images/org.png)

Aus dem ER Modell wurde folgenden Tabellendefinition erstellt. Dieselbe 
Tabellendefinition finden sie in der Datei `solutions/hw1/migration_up.sql`. 

```sql
CREATE TABLE Mitarbeiter (
	SVNR INTEGER PRIMARY KEY,
	Vorname TEXT,
	Nachname TEXT,
	Stundensatz NUMERIC
);


-- 1:1 Abteilung wird von einem Mitarbeiter gemanagt
--     Mitarbeiter managt genau eine Abteilung
CREATE TABLE Abteilungen (
	Name TEXT PRIMARY KEY,
	Beschreibung TEXT,
	Manager INTEGER UNIQUE,
	FOREIGN KEY(Manager) REFERENCES Mitarbeiter(SVNR)
);


-- 1:N Mitarbeiter gehört zu genau einer Abteilung
--     einer Abteilung können mehrere Mitarbeiter zugehörig sein
CREATE TABLE arbeitet_in (
	Mitarbeiter INTEGER UNIQUE,
	Abteilung TEXT,
	FOREIGN KEY(Mitarbeiter) REFERENCES Mitarbeiter(SVNR),
	FOREIGN KEY(Abteilung) REFERENCES Abteilungen(Name)
);


-- M:N Mitarbeiter arbeitet an mehreren Projekten
--     in Projekten arbeiten mehrere Mitarbeiter
CREATE TABLE Projekte (
	Name TEXT PRIMARY KEY,
	Budget NUMBER
);

CREATE TABLE arbeitet_an (
	Mitarbeiter INTEGER,
	Projekt TEXT,
	Start DATE,
	Ende DATE,
	FOREIGN KEY(Mitarbeiter) REFERENCES Mitarbeiter(SVNR),
	FOREIGN KEY(Projekt) REFERENCES Projekte(Name)
);
```

Die Tabellen werden beim Start der Anwendung erstellt. D.h. für Ihre 
Beispielanfragen können Sie davon ausgehen, dass die Tabellen existieren.

Um Testdaten einzufügen könne Sie im Administrationsbereich die Schaltfläche 
`Testdaten einfügen` verwenden. Dafür ist es jedoch notwendig, dass Sie die 
erste Abfrage bereits richtig erstellt haben.



#### Hinweis zur Erstellung der Abfragen
Sie finden die Dateien in denen Sie ihre SQL-Abfragen speichern im Ordner 
`solutions/hw1`. Falls sie Anwendung nicht verwenden, erstellen Sie die 
entsprechenden Dateien (Textdateien mit der Endung ".sql") selbst. Anstatt 
Werte direkt einzugeben, verwenden sie bitte Platzhalter, welche mit einem 
`$` Zeichen beginnen. 

Beispielsweise anstatt:

```sql
SELECT hashedpassword FROM Users WHERE login = 'admin';
```

schreiben sie:

```sql
SELECT hashedpassword FROM Users WHERE login = $login;
```

Der Platzhalter `$login` wird dann von der Anwendung mit dem eigentlichen Wert 
ersetzt. Also mit `'admin'`, sollte sich der Administrator anmelden.
Dieses und weitere Beispiele finden Sie im Ordner `solutions/lecture1` mit 
einer kurzen Erklärung [hier](/assignments/lecture1.md)


#### Hinweis zum Testen
Sie können die von Ihnen erstellten Abfragen mit dem Kommandozeilenbefehl 
`npm run test-hw1` automatisch überprüfen. Dazu müssen Sie natürlich 
die Anwendung installiert haben. Beschrieben in der [README](/).


### Abfragen <a name="abfragen"></a>
Ihre Abfragen sollen Funktionen zur Mitarbeiterverwaltung unterstützen. Die 
Oberfläche ist nur Administratoren zugänglich. Melden Sie sich als `admin` 
(Passwort: `admin`) an. Um sich anzumelden, finden sie in der rechten oberen 
Ecke der Anwendung einen Link "Login (HÜ1)". Wenn Sie sich angemeldet haben, 
sehen sie ebenfalls in der rechten oberen Ecke der Anwendung einen Link 
"Org (HÜ1)".

Die Dateien in der Sie Ihre Abfragen schreiben können, finden sie im Ordner 
`solutions/hw1`.


Auf Basis der gegebenen Tabellen erstellen Sie eine SQL-Abfrage...

 1. ... mit der ein Mitarbeiter hinzugefügt werden kann. 
    * Datei: `employee_add.sql` 
    * Platzhalter: `$surename`, `$forename`, `$ssn`, `$rate` 
    * Rückgabeformat: nicht relevant
    
 2. ... mit der die Namen und Stundensätze aller Mitarbeiter abgefragt werden 
 können. Beachten Sie, dass die Bezeichnungen im Rückgabeformat nicht mit den 
 Spaltennamen in den vorhandenen Tabellen übereinstimmen. Sie können mit `AS`
 die Spalten für die Rückgabe umbenennen.
    * Datei: `employees_all.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(ssn, surename, forename, rate)`

 3. ... mit der ein Stundensatz eines Mitarbeiters um einen bestimmten Betrag 
 erhöht werden kann.
    * Datei: `employee_increase_rate.sql`
    * Platzhalter: `$ssn`, `$rateIncrement`
    * Rückgabeformat: nicht relevant

 4. ... mit der ein Mitarbeiter einer Abteilung zugewiesen werden kann.
    * Datei: `employee_add_to_department.sql`
    * Platzhalter: `$ssn`, `$departmentShort`
    * Rückgabeformat: nicht relevant

 5. ... mit der die Sozialversicherungsnummeren aller Mitarbeiter in einer 
 Abteilung abgefragt werden können.
    * Datei: `employees_in_department.sql`
    * Platzhalter: `$departmentShort`
    * Rückgabeformat: `(ssn)`

 6. ... mit der der Manager einer Abteilung geändert werden kann.
    * Datei: `department_set_manager.sql`
    * Platzhalter: `$departmentShort`, `$ssn`
    * Rückgabeformat: nicht relevant

 7. ... mit der eine Abteilung aus der Datenbank entfernt werden kann.
    * Datei: `department_remove.sql`
    * Platzhalter: `$departmentShort`
    * Rückgabeformat: nicht relevant

 8. ... mit der der Mitarbeiter mit dem höchsten Stundensatz ausgegeben 
 wird.
    * Datei: `employee_max_rate.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(ssn, rate)`

 9. ... mit der alle Mitarbeiter, die jemals in einem Projekt gearbeitet haben, 
 abgefragt werden können. Achten Sie darauf, dass Mitarbeiter nicht doppelt im 
 Ergebnis vorkommen.
    * Datei: `employees_in_project.sql`
    * Platzhalter: `$projectName`
    * Rückgabeformat: `(ssn)`


#### Hinweis zur Abgabe <a name="abgabe"></a>
Sie können die abzugebende Datei mit dem Kommandozeilenbefehl 
`npm run release hw1` erstellen lassen. Eine Zip-Datei zum hochladen im TUWEL 
finden Sie dann im Ordner `releases`. Kontrollieren Sie den Inhalt der 
Zip-Datei bevor Sie sie hochladen.

Falls Sie die Vorgabeanwendung nicht nutzen, speichern Sie alle 
Abfragen in einzelnen Dateien und achten Sie darauf, dass die Dateinamen 
stimmen, die Dateien UTF-8 codiert sind, Sie die entsprechenden Platzhalter 
verwenden und die Rückgabeformate einhalten. Verpacken Sie ihre Dateien als 
Zip mit der Bezeichnung `hw1.zip`. Achten Sie auch darauf, dass das Zip-Archiv 
selbst keine Ordner enthält. Laden Sie die Datei dann in TUWEL hoch. 

Sollten sie die Anwendung nicht verwenden, stellen Sie auch sicher, dass Ihre 
Abfragen mit aktivierter Fremdschlüsselüberprüfung funktionieren. In dem von 
Ihnen verwendetem Werkzeug können Sie diese mit folgendem Befehl aktivieren:

```sql
PRAGMA foreign_keys = ON;
```
Bei Verwendung der Vorgabeanwendung ist dies bereits vorkonfiguriert.


#### Hinweis zu den Abgabegesprächen
Sie finden potentielle Fragen, die Sie bei den Abgabegesprächen beantworten 
können sollten, [hier](/assignments/hw1_questions.md).


#### Probleme, Unklarheiten
Kommen Sie zu den Tutorien, schreiben Sie Ihre Fragen ins TISS Forum.

Wir sind sehr bemüht Ihnen eine fehlerfreie Anwendung und Tests 
bereitzustellen, leider können sich trotzdem Fehler einschleichen. Falls Sie 
einen gefunden haben, bitte wir Sie um Kontaktaufnahme unter 
paul.weissenbach@tuwien.ac.at.