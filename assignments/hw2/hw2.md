[tuwel_course_address]: https://tuwel.tuwien.ac.at/course/view.php?id=8260

#  Zweite Hausübung

Normalisierung, Tabellen verknüpfen und Aggregieren. [Beispiele aus dem 
Vortrag](/assignments/lectures/lecture2.md).

## Normalisierung
In einem verteilten Fertigungsnetzwerk soll die Verwaltung von 
Rückmeldungen aus der Fertigung über eine Datenbank-Anwendung realisiert 
werden. Dabei sollen folgende Informationen geeignet verwaltet werden: 
Fertigungsrückmeldungsnummer, Datum und Uhrzeit der Fertigungsrückmeldung, 
Maschinennummer, Maschinenbezeichnung, Koordinaten (Breiten- und Längengrad) 
der Maschine bei transportablen Geräten, Werkzeugnummer und -bezeichnung des 
verwendeten Werkzeuges, und die Dauer des rückgemeldeten Fertigungsvorganges. 
Jede Maschine hat einen festgelegten Maschinenbetreuer (Personalnummer, Vor- 
und Nachname). Werkzeuge können an mehreren verschiedenen Maschinen eingesetzt 
werden und besitzen eine Lebensdauer.


#### ER Diagramm
Transformieren Sie die textuelle Beschreibung und Anforderungen in ein 
ER Diagramm. Legen Sie dabei Kardinalitäten für Beziehungstypen und 
Primärschlüssel für Entitätstypen fest. Benutzen sie die [min, max] Notation 
zum Festlegen der Kardinalitäten.


#### Normalisieren
Normalisieren sie folgende Testdaten schrittweise bis zur dritten Normalform. 
Dokumentieren Sie Ihre Vorgehensweise mit Zwischenergebnissen.

Die Testdaten befinden sich im CSV-Format (welche Sie mit dem  
Tabellenkalkulationsprogramm ihrer Wahl öffnen können) in der Datei 
`solutions/hw2/testdata.csv`. Hier ein Auszug:

```
$rueckmeldeNummer,$datum,$uhrzeit,$werkzeugNummer,$maschinenNummer,$vorgangssdauer,$maschinenBezeichnung,$hauptstandort,$maschinenBetreuerSVNR,$maschinenBetreuerVorname,$maschinenBetreuerNachname,$werkzeugBezeichnung,$standzeit,$laengengrad,$breitengrad
1234410,2016-09-18,07:21:25,M-4432,M0201,62,"Bearbeitungszentrum 2",HS08,19,Monika,"Müller","Schrupp Fräser 40/120",15000,,
1234413,2016-09-18,07:21:25,,H0011,,"Mobiler HandlingRoboter ADD 22-1",HS08,21,Siegfried,Stinger,,,16.362252,48.200269
1234414,2016-09-18,07:21:25,,H0012,,"Mobiler HandlingRoboter ADD 22-2",HS02,21,Siegfried,Stinger,,,16.367658,48.199014
...
```


#### Schema
Extrahieren sie aus den Ergebnissen Ihren vorhergehenden Arbeitsschritten ein 
Datenbankschema (ohne Typen).

> Tabellenbezeichnung (**Spalte1**, Spalte2, *Spalte3*, ... SpalteN)

Markieren sie **Primär-** und *Fremdschlüssel*.


#### Hinweise zu Dokumentation
Dokumentieren Sie Ihrer Arbeitsschritte in **EINER** PDF-Datei. Speichern Sie 
diese im Ordner `solutions/hw2`.


#### Datenbanktabellen erstellen
Fügen Sie der Datei `solutions/hw2/migration_up.sql` die SQL-Befehle hinzu um 
Ihre Tabellen zu erstellen. Verwenden sie für die Speicherung der Mitarbeiter 
die Tabelle aus der ersten Hausübung.

Durch klicken auf die Schaltfläche "Tabellen erstellen" wird der SQL-Code in
dieser Datei ausgeführt. Möchten Sie die Tabellen entfernen, ohne die Anwendung 
neu zu starten, können Sie in der Datei `solutions/hw2/migration_down.sql` 
die entsprechenden Befehle hinterlegen (`DROP TABLE`). Zugänglich ist dies über 
die Schaltfläche "Tabellen entfernen". 


#### Datenbank befüllen
Erstellen Sie eine Datenbanktransaktion um die Daten in Ihre Tabellen 
einzufügen. Schreiben sie ihr SQL in die Datei: 
`solutions/hw2/data_intake.sql`. Vergessen Sie nicht auch eventuell neue 
Mitarbeiter in der Datenbank zu hinterlegen und bei einem `INSERT` anzugeben 
was bei einem Konflikt geschehen soll (`INSERT OR IGNORE INTO ...`).

Die Testdaten können dann mit der Schaltfläche 'Daten einlesen' in der 
Datenbank hinzugefügt werden. 


#### Abfragen
Die im Folgenden angegebenen Dateinamen beziehen sich auf den Pfad: 
`solutions/hw2`.

Auf Basis der von Ihnen erstellten Tabellen schreiben Sie eine SQL-Abfrage...

  1. ... mit der alle Maschinen und ihre Betreuer ausgegeben werden können.
    * Datei: `machines_list_person_in_charge.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(machineNumber, machineDescription, forename, surename)`

  2. ... mit der alle Maschinen aufgelistet werden können. Sortiert nach der 
  Maschinennummer.
    * Datei: `machines_all.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(machineNumber, machineDescription)`

  3. ... mit der alle Werkzeuge die auf einer Maschine eingesetzt wurden 
  abgefragt werden kann. Achten Sie darauf, dass keine Ergebniszeilen doppelt 
  vorkommen.
    * Datei: `machines_tools_used.sql`
    * Platzhalter: `$maschineNumber`
    * Rückgabeformat: `(machineDescription, toolDescription)`

  4. ... mit der die Koordinaten der Einsatzorte einer Maschine abgefragt 
  werden können. Das Ergebnis soll nach dem Zeitpunkt der Ortänderungsmeldung 
  sortiert werden. Letzte Änderung zuerst.
    * Datei: `machines_sites.sql`
    * Platzhalter: `$maschineNumber`
    * Rückgabeformat: `(longitude, latitude)`

  5. ... mit der die Anzahl an Bewegungen einer Maschine ausgegeben werden 
  kann. Achten Sie darauf, dass auch Maschinen ohne Bewegung im Ergebnis 
  enthalten sind. Ergebnis absteigend sortiert nach der Anzahl an Bewegungen.
    * Datei: `machine_movements.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(machineNumber, movements)`

  6. ... mit der die Gesamteinsatzzeit pro Werkzeug ausgegeben werden kann. 
  Ergebnis absteigend sortiert nach der Gesamteinsatzzeit.
    * Datei: `tools_operating_time.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(toolNumber, operatingTime)`

  7. ... mit der die **drei** Werkzeuge mit der niedrigsten Restlebensdauer 
  ausgegeben werden können.
    * Datei: `tools_remaining_life.sql`
    * Platzhalter: nicht relevant
    * Rückgabeformat: `(toolNumber, remainingLife)`


#### Hinweis zur Abgabe <a name="abgabe"></a>
Sie können die abzugebende Datei mit dem Kommandozeilenbefehl 
`npm run release hw2` erstellen lassen. Eine ZIP-Datei zum hochladen (im 
[TUWEL][tuwel_course_address]) finden Sie dann im Ordner `releases`. 
Kontrollieren Sie den Inhalt der ZIP-Datei bevor Sie sie hochladen.
