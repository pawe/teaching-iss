# Vierte Hausübung

Buchungssatz und Buchungszeile. Einfache SQL Abfrage zur Wiederholung 
und als Vorbereitung für den Übungstest.


## Projektkosten

Sie möchten mit einer Anwendung ihre Projektkosten verwalten. Die Software 
ermöglicht Ausgaben auf Projektkonten zu buchen.

### Anforderungen

  * Ein Konto gehört zu genau einem Projekt. Ein Projekt kann mehrere Konten 
  besitzen.
  * Die Tabelle "Projekte" (siehe [erste Hausübung](/assignments/hw1.md) soll verwendet werden).
  * Eine Buchung auf ein Konto soll an entsprechender Stelle (allgemeines Konto) 
  immer einer Gegenbuchung aufweisen.
  * Kosten können auf mehrere Projektkonten aufgeteilt werden.


### Schema in der Datenbank Hinterlegen

SQL Code um die notwenigen Tabellen zu erstellen bitte in 
`solutions/hw4/migration_up.sql`.

Die Tabelle, die Buchungssätze enthält, soll eine eindeutige Spalte aufweisen,
welche mit 'INTEGER PRIMARY KEY AUTOINCREMENT' deklariert wurde.

### Abfragen
Der Ordner für Ihre Lösungen ist, wie üblich, `solutions/hw4`.

Erstellen Sie SQL Code, mit dem ...

  1. ... ein allgemeines Konto erstellt werden kann.
    * Datei: `account_add.sql`
    * Platzhalter: `$accountName`
    * Rückgabeformat: nicht relevant

  2. ... ein Konto einem Projekt zugewiesen werden kann. 
    * Datei: `project_account_add.sql`
    * Platzhalter: `$accountName`, `$project`
    * Rückgabeformat: nicht relevant

  3. ... alle Projektkonten aufgelistet werden können.
    * Datei: `project_accounts.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(accountName)`  

  4. ... alle Konten aufgelistet werden können. Alphabetisch sortiert.
    * Datei: `accounts.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(accountName)`

  5. ... ein Buchungssatz eingefügen werden kann. 
    * Datei: `accounting_record_add.sql`
    * Platzhalter: `$date`, `$text`
    * Rückgabeformat: nicht relevant

  6. ... eine Buchungszeile hinzugefügt werden kann.
    * Datei: `accounting_entry_line_add.sql`
    * Platzhalter: `$record`, `$accountName`, `$amount`
    * Rückgabeformat: nicht relevant

  7. ... alle Buchungssätze aufgelistet werden können. Sortiert nach der 
  eindeutigen Nummer.
    * Datei: `records.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(record, text, date)`

  8. ... alle Buchugnszeilen für einen Buchungssatz aufgelistet werden können. 
  Aufsteigend nach der Buchungszeilennummer sortiert.
    * Datei: `entry_lines.sql`
    * Platzhalter: `$record`
    * Rückgabeformat: `(number, accountName, amount)`

  9. ... alle Projekte aufgelistet werden können. Die Rückgabe soll 
  Projektbudget, bereits verbuchte Kosten und Restbudget enthalten. Ergebnis
  soll nach dem Restbudget aufsteigend sortiert sein. Falls zwei Projekte 
  dasselbe Restbudget aufweisen, sollen sie nach dem Gesamtbudget absteigend 
  gereiht werden.
    * Datei: `projects_budget_overview.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(projectName, budget, spent, remaining)`


## Projektbericht (JSON Schema)
Sie möchten ein einfaches Formular erstellen um Berichte zu Projekten zu speichern.

### Anforderungen
Der Bericht soll folgende Informationen beinhalten:
- Nummer des Berichts: soll ein Integer sein.
- Art des Berichtes: kann entweder ein Zwischen oder Endbericht sein, es soll keine weitere Auswahl möglich sein.
- Budgetzustand: der Zustand kann entweder: Gut, Schlecht, Neutral sein.
- Beschreibung: maximal 400 Zeichen lang sein dürfen.
- Datum: der Berichtserstellung.
- Projektname: String und mit dem Namen `projectName`
- Personen: Personen können Autoren und Gutachter oder nur Gutachter sein. Personen haben:
    - Vornamen
    - Nachnamen
    - ID im Unternehmen

### JSON Schema in Hinterlegen 
Das JSON schema bitte in `solutions/hw4/schema.json` einfügen.


#### Hinweis zur Abgabe
Sie können die abzugebende Datei mit dem Kommandozeilenbefehl 
`npm run release hw4` erstellen lassen. Eine Zip-Datei zum Hochladen im TUWEL 
finden Sie dann im Ordner `releases`. Kontrollieren Sie den Inhalt der 
Zip-Datei bevor Sie sie hochladen.

#### Hinweis zum Abgabegespräch
Diskussionsgrundlage beim Abgabegespräch ist einer von uns generierter und 
ausgedruckter Bericht. Sie können diesen Bericht zur Vorbereitung auch selbst 
mit `npm run report hw4` erstellen. Nach ausführen des Befehls sollte sich 
ebenfalls im Verzeichnis `releases` eine docx Dokument finden.
