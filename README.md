[tuwel_course_address]: https://tuwel.tuwien.ac.at/course/view.php?id=12259
[repository]: https://bitbucket.org/mivp/iis
[tiss_course_address]: https://tiss.tuwien.ac.at/course/courseDetails.xhtml?courseNr=307421&semester=2017W

# Übung: Industrielle Informationssysteme (2017W)
Diese Webanwendung ist Teil der Übung Industrielle Informationssysteme (307.421)
in welcher Grundlagen relationaler Datenbanken, Datenmodellierung und SQL vermittelt
werden. Diese Anwendung dient zur Illustration und als Kontext für Hausübungen 
und ist keinesfalls für einen produktiven Einsatz geeignet.

Informationen zur Durchführung der Lehrveranstaltung finden sich in
[TUWEL][tuwel_course_address] und [TISS][tiss_course_address].

#### Zu den Aufgaben
  * [Erste Hausübung](/assignments/hw1/hw1.md)
  * [Zweite Hausübung](/assignments/hw2/hw2.md)
  * [Dritte Hausübung](/assignments/hw3/hw3.md)
  * [Vierte Hausübung](/assignments/hw4/hw4.md)

#### Beispiele aus den Vorträgen
  * [Zur ersten Hausübung](/assignments/lectures/lecture1.md)
  * [Zur zweiten Hausübung](/assignments/lecture/lecture2.md)
  * [Zur dritten Hausübung](/assignments/lecture/lecture3.md)


#### Hinweis zur Bewertung
Wir erwarten von Ihnen keinen auf Performance optimierten SQL Code. Wenn Ihre 
SQL Abfragen funktionieren haben Sie Ihr Ziel erreicht.

## Installation

#### Installation NodeJS 
Um die Anwendung auszuführen ist die Runtime NodeJS notwendig. NodeJS können 
Sie auf [nodejs.org](http://nodejs.org) herunterladen. Wählen sie die LTS (long 
time support) Option und folgen Sie dort den Anweisungen.

#### Installation Anwendung und benötige Module
Laden Sie die Zip-Datei entweder aus dem [TUWEL Kurs][tuwel_course_address] 
oder von dem [Sourcecode Repository][repository].

Entpacken sie gegebenfalls die heruntergeladene Datei und öffnen sie den Ordner 
[im Terminal/in der Kommandozeile](https://de.wikipedia.org/wiki/Kommandozeile).

```bash
cd iis
```

Mit `cd` (change directory) können Sie das Verzeichnis wechseln. Befindet sich 
die entpackte Hausübung beispielsweise im Verzeichnis `\Users\pawe\Desktop\iis` 
können Sie mittels `cd \Users\pawe\Desktop\iis` dorthin wechseln.

Mittels `dir` können Sie sich in der Windowskommandozeilenanwendung den Inhalt 
eines Verzeichnisses auflisten lassen. Gleiches erreichen Sie mit `ls` auf 
Unix basierenden Systemen (macOS, Linux oder in der Windows PowerShell).


Die Anwendung benötigt Module. Diese können mit folgendem Befehl in der 
Kommandozeile installiert werden. Npm (node package manager) wird mit nodejs
mitinstalliert.

```bash
npm install
```

Die Datenbank (in unserem Fall [SQLite3](https://www.sqlite.org/)) wird als
eines dieser Module mitinstalliert. Wir verwenden SQLite um Ihnen das Leben 
etwas zu erleichtern. SQLite ist nicht vergleichbar mit client/server 
Datenbanken, wie MySQL, Oracle, PostgreSQL, etc. die üblicherweise in 
industriellen Informationssystemen als geteilte Datenablage dienen. Mehr 
Informationen zu geeigneten Einsatzmöglichen finden sie 
[hier](https://www.sqlite.org/whentouse.html).

Die Installation sollte auf den meisten Systemen fehlerfrei durchlaufen.
Sollten Sie eine Plattform verwenden, für die das SQLite Modul kein 
kompiliertes Binary mitliefert melden Sie sich bitte unter 
paul.weissenbach@tuwien.ac.at.


## Starten und Stoppen der Anwendung
Wurde die Anwendung fehlerfrei installiert, kann sie mittels folgendem Befehl 
im Terminal/in der Kommandozeile gestartet werden:

```bash
npm start
```

Wenn nichts Anderes konfiguriert wurde, können Sie im Browser unter
[http://localhost:3000](http://localhost:3000) auf die Anwendung zugreifen.

Beendet werden kann die Anwendung mit der Tastenkombination: 
<kbd><kbd>Strg</kbd> + <kbd>C</kbd></kbd> in der Kommandozeile.

![Start Stop](/public/images/run-app.gif)

## Testen der SQL-Abfragen
Beim Testen werden Funktionen der Anwendung automatisch ausgeführt um
sicherzustellen, dass diese die erwarteten Rückgaben liefern. Möchten Sie
Ihre erste Hausübung überprüfen, führen sie folgenden Befehl aus:

```bash
npm run test hw1
```

Eine fehlerloser durchlauf der Tests sieht aus wie im folgendem Bild 
dargestellt.
![Testen der ersten Hausübung](/public/images/run-script-test-hw1.gif)

Gleiches gilt für die anderen Hausübungen: `npm run test hw2`,
`npm run test hw3`, `npm run test hw4`.

Wir führen denselben Code aus um Ihre Abgabe auf Funktionstüchtigkeit zu
überprüfen. Beachten Sie bitte, dass Sie Ihre Abfragen bei den Abgabegesprächen
erklären müssen, d.h. ein erfolgreicher Durchlauf der Tests garantiert Ihnen 
noch keine Punkte. Solche Tests können im Allgemeinen auch nur Fehler 
aufzeigen, nicht die Abwesenheit Fehlern garantieren.


## Abgeben

```bash
npm run release hw1
```

Dieser Befehl erstellt eine Zip-Datei (im Ordner `releases`), welche Sie 
im TUWEL hochladen sollen. Kontrollieren Sie den Inhalt bevor sie die Datei 
hochladen, es sollten alle Dateien aus dem Ordner `solutions/hw1` enthalten 
sein. Gleiches gilt für die anderen Hausübungen `npm run release hw2`, 
`npm run release hw3` und `npm run release hw4`.

![Release Homework](/public/images/run-release.gif)


## Abgabedokument

```bash
npm run report hw1
```

Nach der Abgabe führen wir Ihre Lösungen aus und erstellen Berichte, die dann 
als Gesprächsgrundlage beim Abgabegespräch dienen. Diese Berichte können Sie 
auch mit obigem Befehl selbst erstellen. Im Ordner `releases` sollten Sie dann
ein Worddokument finden.

![Start Stop](/public/images/run-report.gif)

## Warnung
Diese Anwendung ist __nicht__ für einen produktiven Einsatz geeignet. 
Beispielsweise sind SQL Abfragen in einzelne Dateien abgelegt, die bei jeder 
Anfrage erneut vom Dateisystem gelesen werden.
Grundsätzlich wurden keine Überlegungen bezüglich Performance oder Security
angestellt. Die Tests sind für die Überprüfung der Aufgaben ausgelegt.


## Kontakt
Fragen und Anregungen bitte an paul.weissenbach@tuwien.ac.at. Studenten können 
auch in den Tutorien Fragen stellen. Die Tutorienterminen sind im 
[TISS][tiss_course_address] eingetragen.


# Lizenz
MIT
