[tuwel_course_address]: https://tuwel.tuwien.ac.at/course/view.php?id=8260

# Vierte Hausübung

Buchungssatz und Buchungszeile. Viele einfache SQL Abfrage zur Wiederholung 
und als Vorbereitung für den Übungstest.


## Projektkosten

Sie möchten mit einer Anwendung ihre Projektkosten verwalten. Die Software 
ermöglicht Ausgaben auf Projektkonten zu buchen.

### Anforderungen

  * Ein Konto gehört zu genau einem Projekt. Ein Projekt kann mehrere Konten 
  besitzen.
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

  7. ... alle Buchungensätze aufgelistet werden können. Sortiert nach der 
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
  soll nach dem Restbudget aufsteigend sortiert sein. Falls die zwei Projekte
  dasselbe Restbudget aufweisen, soll sie dem Gesamtbudget gereiht werden.
    * Datei: `projects_budget_overview.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(projectName, budget, spent, remaining)`



#### Hinweis zur Abgabe <a name="abgabe"></a>
Sie können die abzugebende Datei mit dem Kommandozeilenbefehl 
`npm run release hw4` erstellen lassen. Eine Zip-Datei zum hochladen (im 
[TUWEL][tuwel_course_address]) finden Sie dann im Ordner `releases`. 
Kontrollieren Sie den Inhalt der Zip-Datei bevor Sie sie hochladen.


#### Hinweis zu den Abgabegesprächen
Sie finden potentielle Fragen, die Sie bei den Abgabegesprächen beantworten 
können sollten, [hier](/assignments/hw4_questions.md).