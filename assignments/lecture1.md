# Beispiele aus dem Vortrag zur ersten HÜ
Die Anwendung verwendet [SQLite3](https://www.sqlite.org/). Die Datenbank wird 
mit der Anwendung (als Modul) mitinstalliert. Falls Sie die Anwendung nicht 
verwenden, können Sie sich SQLite [hier](https://www.sqlite.org/download.html) 
herunterladen. Alternativ können Sie auch ein Datenbankmanagementtool, wie 
[SQL Browser for sqlite](http://sqlitebrowser.org/), verwenden. 

Die Datenbankdatei finden Sie im Ordner `database_backups`. Es wird für jeden 
Start eine neue Datei angelegt. Sie können diese mit dem SQLite CLI Tool 
oder einen Datenbankmanagementtool öffnen. 


## Beispiel mit nur einer Tabelle
Die Anwendung erlaub es Benutzern sich mit einem Login und Passwort anzumelden, 
dazu müssen wir die Logins und Passwörter in der Datenbank ablegen können. Wir 
speichern zu jedem Benutzer, ob es sich um einen Administrator handelt. Dies 
entspricht folgendem ER-Diagramm:

![Users](/public/images/users.png)

Über alle Benutzer soll das Login eindeutig sein, deswegen ist das Attribut 
`login` als Primärschlüssel markiert (unterstrichen).


### Tabelle Anlegen
Die Anwendung selbst führt den SQL Befehl in der Datei 
`solutions/lecture1/migration_up.sql` aus. Dieser erstellt eine Tabelle mit der 
Bezeichnung "users". Die Tabelle hat drei Spalten, eine Spalte `login` für die 
Benutzerkennung, eine Spalte `hashedpassword` für ein 
[kryptographisch gehashed](https://de.wikipedia.org/wiki/Kryptologische_Hashfunktion) 
Passwort und eine dritte Spalte `admin`, um zu hinterlegen, ob es sich bei 
einem Benutzer um einen Administrator handelt. Per default ist ein neuer 
Benutzer kein Administrator.

```sql
CREATE TABLE users (
  login TEXT PRIMARY KEY,
  hashedpassword TEXT,
  admin BOOLEAN DEFAULT 0
);
```

Zusätlich legen wir einen 'admin' Benutzer an. Die Zeichen `--` leiten ein 
einzeiliges Kommentar ein, d.h. der nachfolgende Text in der selben Zeile 
wird von der Datenbank ignoriert.

```sql
-- We don't store passwords in plaintext. That's why it is cryptographically
-- hashed. The following equates to "admin" in plaintext.
INSERT INTO users (login, admin, hashedpassword)
  VALUES ('admin', 1, 'pbkdf2$10000$c131a16168ddbe67af444eb86dd7e059396a0af15cfbdda7384cc7deb2a9cd979f142398bae34b1fb99eddc2238230e1594c112b3386005b8ff54149a948e383$df958fc7f2b9bb28e801cc1f03c22227de30ad6dc6faddc04e5ba02f292cf2e3b2da3dc6be95bc02473508096bb140f0fec0b26a223fcde3b4bbce831030345e');
```


### Abfragen

#### `INSERT INTO`
Weitere Benutzer können mit folgedem SQL-Befehl angelegt werden. Wir können 
hier auch die `admin` Spalte weglassen, da es per default 0 ist. Müssen dafür
jedoch explizit angeben auf welche Spalten die Werte beziehen.

```sql
INSERT INTO users (login, hashedpassword) 
    VALUES ('paul', 'pbkdf2$10000$f78b825761dcfe0e651e293d332bbfc3610f63bbc58513b6874efe53d45e0992f6e66a5797b83902b33cd18f2d7d737570510d921ffb735a270af646e52f8b34$5de8e15d4c98269cf48129f15accff00dbc88aecb81b191a929aa463c0ceca9a263c374b752b2fffeebca55ff876221058af5651d64c0c0fb35e013e81528527');
```

Nachdem wir aber nicht immer das selbe Passwort verwenden möchten und den Hash 
nicht von Hand berechnen möchten lassen wir das von der Anwendung berechnen. 
Wenn sich ein Benuter registiert. Dazu führen wir Platzhalter (beginnen mit 
`$`) ein, diese werden dann von der Anwendung, bevor die Abfrage an die 
Datenbank gesendet wird, durch die eigentlichen Werte ersetzt.

SQL um Benutzer in der Datenbank zu hinterlegen (aus `solutions/lecture1/user_add.sql`). 

```sql
-- Platzhalter:
--   $login
--   $hashedpassword
INSERT INTO users (login, hashedpassword) 
    VALUES ($login, $hashedpassword);
```


#### `SELECT`
Will sich ein Benutzer bei der Anwendung anmelden benötigt die Anwendung den 
Passworthash aus der Datenbank, um es mit dem Passworthash, der aus der 
Benutzereingabe berechnet zu vergleichen.

```sql
-- Platzhalter:
--   $login
-- Rückgabgeformat
--   (hashedpassword)
SELECT hashedpassword 
  FROM users 
  WHERE login = $login;
```

Die ersten vier Zeilen sind wieder Kommentare, die von der Datenbank ignoriert 
werden. Mit `SELECT` leiten wir eine Abfrage mit Rückgabewerten ein. 
Rückgegeben soll in diesem Beispiel nur die Werte in der Spalte 
`hashedpassword`. `FROM` gibt an von welcher Tabelle abgefragt werden soll. In 
unserem Fall natürlich `users`, die einzige Tabelle.

Es handelt sich bei Datenbankabfragen um Mengenoperationen, deswegen 
spezifizieren wir mit `WHERE` welche Zeilen zurückgegenen sollen. Da `login` 
der Primärschlüssel der Tabelle `users` ist und dementsprechend eindeutig sein 
muss, gibt die Abfrage entweder keine Zeile zurück oder genau eine.

Die selbe Abfrage finden Sie in der Datei `solutions/lecture1/user_auth.sql`, 
welche bei der Anmeldung von Benutzern ausgeführt wird.


#### `AS` Rückgabespalten umbenennen
```sql
-- Platzhalter:
--   $login
-- Rückgabgeformat
--   (Passworthash)
SELECT hashedpassword AS Passworthash
  FROM users 
  WHERE login = $login;
```

#### `SELECT login, admin`
Gleiches gilt für die Abfrage von Benutzerinformationen, beispielsweise um sie 
darzustellen oder herauszufinden ob es sich ein Benutzer um einen Administrator 
handelt. (In der Datei `solutions/lecture1/user_find.sql`).

```sql
-- Platzhalter:
--   $login
-- Rückgabeformat:
--   (login, admin)
SELECT login, admin -- enspricht exakt dem Rückgabeformat
  FROM users 
  WHERE login = $login;
```

Die Abfrage unterscheidet sich von der vorherigen nur durch das Rückgabeformat. 
Also welche Spalten ausgewählt wurden. Mehrere Werte werden mit einem Komma 
getrennt.


#### `UPDATE`
Will man einen bestehenden Benutzer Administratorestatus geben, muss natürlich 
keine neue Zeile eingefügt werde, sondern kann angepasst werden. 
(In `solutions/lecture1/user_make_admin.sql`).

```sql
-- Platzhalter:
--   $login
UPDATE users SET admin = 1 WHERE login = $login;
```


#### `DELETE`
Auch soll es möglich sein Benutzer wieder aus dem System zu entfernen (in 
`solutions/lecture1/user_remove.sql`).

```sql
-- Platzhalter:
--   $login
DELETE FROM users WHERE login = $login;
```



## Komplexeres Beispiel: Mitarbeiter, Abteilungen und Projekte

### ER Diagramm

![Users](/public/images/org.png)

Unterschied zum ersten Beispiel ist, dass wir jetzt mehrere Tabellen erstellen 
werden und die Beziehungen zwischen den Tabellen definieren können. Genauer, 
wir legen zusätzlich zu den Primärschlusseln Fremdschlüssel fest. D.h. welche 
Spalte in einer Tabelle sich auf ein Spalte in einer anderen Bezieht. Die 
Fremdschlüssel sind nicht Teil des ER Diagramm, sondern können aus den 
Beziehung angrenzenden Entitäten abgeleitet werden.

### Schema
Es gibt mehrere Möglichkeiten obiges ER Diagramm in ein Datenbankschema zu 
übersetzen. Hier ein davon:


> Mitarbeiter (	**SVNR**,	Name, Stundensatz )

> Abteilung ( **Name**, Beschreibung, *Manager* )

> arbeitet_in (	*Mitarbeiter*, 	*Abteilung* )

> Projekt ( **Name**, Budget )

> arbeitet_an (	*Mitarbeiter*, *Projekt*, Start, Ende )

**Primärschlüssel**, *Fremdschlüssel*


### SQL - Data Definition Language (DDL)
Das SQL um die Tabelen zu erstellen finden sich in der Datei 
`solutions/lecture1/setup-org.sql`. 

```sql
CREATE TABLE Mitarbeiter (
	SVNR INTEGER PRIMARY KEY,
	Name TEXT,
	Stundensatz NUMERIC
);

-- 1:1 Abteilung wird von einem Mitarbeiter gemanagt
--     Mitarbeiter managt genau eine Abteilung
CREATE TABLE Abteilung (
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
	FOREIGN KEY(Abteilung) REFERENCES Abteilung(Name)
);


-- M:N Mitarbeiter arbeitet an mehreren Projekten
--     in Projekten arbeiten mehrere Mitarbeiter
CREATE TABLE Projekt (
	Name TEXT PRIMARY KEY,
	Budget NUMBER
);

CREATE TABLE arbeitet_an (
	Mitarbeiter INTEGER,
	Projekt TEXT,
	Start DATE,
	Ende DATE,
	FOREIGN KEY(Mitarbeiter) REFERENCES Mitarbeiter(SVNR),
	FOREIGN KEY(Projekt) REFERENCES Projekt(Name)
);
```


### Einfügen von Daten mit Fremdschlüsseln
Die Datenbank kann beim Einfügen von Daten prüfen, ob die entsprechend referenzierten Datensätze aus anderen Tabelle vorhanden sind. Dieses Verhalten ist bei Verwendung dieser Übungsanwendung aktiviert, sollten sie mit anderen Tools arbeiten achten Sie bitte darauf, dass sie mit

```sql
PRAGMA foreign_keys = ON;
```

die Überpfüung von Fremdschlüsselbeziehungen aktivieren.
