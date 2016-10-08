[tuwel_course_address]: https://tuwel.tuwien.ac.at/course/view.php?id=8260

# Dritte Hausübung

Ansichten und rekursive Abfragen mittels Common Table Expressions. [Dritter 
Vortrag](/assignments/lecture3.md)

## Produktstruktur
Die in der Datenbank gespeicherte Produktstruktur ist auf folgende Tabellen verteilt. 

```sql
CREATE TABLE Baugruppen (
  Bezeichnung TEXT,
  Baugruppennummer NUMERIC,
  Artikelnummer TEXT,
  CADDatei BLOB,
  PRIMARY KEY (Baugruppennummer)
);

CREATE TABLE Teile (
  Bezeichnung TEXT,
  Teilnummer NUMERIC,
  Artikelnummer TEXT,
  CADDatei BLOB,
  PRIMARY KEY (Teilnummer)
);

CREATE TABLE TeileEinbau (
  Teil NUMERIC REFERENCES Teile(Teilnummer),
  Baugruppe NUMERIC REFERENCES Baugruppen(Baugruppennummer),
  Einbauanweisung TEXT
);

CREATE TABLE BaugruppenEinbau (
  Unterbaugruppe NUMERIC REFERENCES Baugruppen(Baugruppennummer),
  Überbaugruppe NUMERIC REFERENCES Baugruppen(Baugruppennummer),
  Einbauanweisung TEXT
);
```

Ist ein Teil oder eine Baugruppe mehrfach in einer anderen Baugruppe verbaut, 
kommen in den Einbautabellen die Teile/Baugruppenkombination mehrfach vor. 
Die gleichen Teile, verbaut in derselben Baugruppe, können unterschiedliche 
Einbauanweisungen besitzen.

Zusätzlich existiert eine Tabelle mit Daten aus der Fertigung:

```sql
CREATE TABLE Fertigungsdaten (
  Artikelnummer TEXT,
  Bearbeitungsdauer NUMERIC,
  Zeitstempel DATETIME
);
```

### Ansichten
  1. Erstellen Sie eine Ansicht (`VIEW`) über die gegebenen Tabellen, in denen die Produktstruktur vereinfacht abgefragt werden kann.
    * Datei: `hw3/migration_up_product_structure.sql`
    * Bezeichnung der Ansicht: `Produktstruktur`
    * Struktur: `(Element, eingebautIn, Menge)`

  2. Erstellen Sie eine Ansicht mit der die Abfrage der durchschnittlichen Bearbeitungsdauern pro Artikelnummer vereinfacht werden kann.
    * Datei: `hw3/migration_up_average_production_time.sql`
    * Bezeichnung der Ansicht: `DurchschnittlicheBearbeitungsdauer`
    * Struktur: `(Artikelnummer, Bearbeitungsdauer)`


### Abfragen
Mit der von Ihnen erstellten Ansichten, erstellen Sie folgende Abfragen. Die Dateien in die Sie Ihre Lösungen einfügen sollen, befinden sich im Ordner 
`solutions/hw3`.

  1. Erstellen Sie eine Strukturstückliste mit Mengen bezogen auf die jeweilig direkt übergeordnete Baugruppe.
    * Datei: `multilevel_bom.sql`
    * Platzhalter: `$assembly`
    * Rückgabeformat: `(level, element, quantity)`
    
  2. Fragen Sie ab in welchen Baugruppen ein Element eingebaut ist: Verwendungsnachweis.
    * Datei: `part_in_assembly.sql`
    * Platzhalter: `$part`
    * Rückgabeformat: `(assembly, quantity)`

  3. Abfrage der Gesamtmenge eines Teils in einer Baugruppe.
    * Datei: `partcount_in_assembly.sql`
    * Platzhalter: `$assembly`, `$part`
    * Rückgabeformat: `(quantity)`

  4. Mengenstückliste: Abfrage der Gesamtmenge aller Elemente in der Hauptbaugruppe. Beschränken Sie das Ergebnis auf 20 Zeilen und sortieren Sie Ihr Ergebnis nach der Gesamtmenge absteigend.
    * Datei: `quantitative_bom.sql`
    * Platzhalter: `$assembly`
    * Rückgabeformat: (element, totalQuantity) 

  5. Abfrage mit der alle Teile und Baugruppe ausgegeben werden können für die 
  Fertigungsdaten existieren. Die Produktstruktur muss für diese Abfrage nicht 
  berücksichtigt werden.
    * Datei: `parts_with_production_data.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(articelNumber)`

  6. Abfrage mit der alle Teile und Baugruppen ausgegeben werden können für die 
  keine Fertigungsdaten existieren. Die Produktstruktur muss für diese Abfrage 
  nicht berücksichtigt werden.
    * Datei: `parts_without_production_data.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(articelNumber)`

  7. Abfrage die die durchschnittliche Bearbeitungszeit eines Artikels 
  zurückgibt. Absteigend sortiert nach der durchschnittlichen Bearbeitungszeit.
    * Datei: `parts_average_production_time.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(partNumber, avgProductionTime)` 


#### Hinweis zur Abgabe <a name="abgabe"></a>
Sie können die abzugebende Datei mit dem Kommandozeilenbefehl 
`npm run release hw3` erstellen lassen. Eine Zip-Datei zum hochladen (im 
[TUWEL][tuwel_course_address]) finden Sie dann im Ordner `releases`. 
Kontrollieren Sie den Inhalt der Zip-Datei bevor Sie sie hochladen.


#### Hinweis zu den Abgabegesprächen
Sie finden potentielle Fragen, die Sie bei den Abgabegesprächen beantworten 
können sollten, [hier](/assignments/hw3_questions.md).