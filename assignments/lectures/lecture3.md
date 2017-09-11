# Rekursive Abfragen

Die hierarchische Struktur lässt sich aus den Tabellen, Abteilung, arbeitet_in 
und Mitarbeiter ableiten. 

Wir gehen davon aus, dass ein Mitarbeiter den Manager der Abteilung als 
Vorgesetzten hat. Ist ein Mitarbeiter einer Abteilung gleichzeitig Manager 
einer eigenen Abteilung ist diese Abteilung der anderen Untergeordnet.

Folgende VIEW bildet das Ganze ab:

```sql
CREATE VIEW Unternehmenshierarchie AS 
  SELECT 
    Leiter.Vorname AS Boss, 
    Leiter.SVNR AS BossSVNR,
    Mitarbeiter.Vorname AS Employee,
    Mitarbeiter.SVNR AS EmployeeSVNR
  FROM Mitarbeiter
  LEFT OUTER JOIN arbeitet_in 
    ON Mitarbeiter.SVNR = arbeitet_in.Mitarbeiter
  LEFT OUTER JOIN Abteilungen
    ON arbeitet_in.Abteilung = Abteilungen.Name
  LEFT OUTER JOIN Mitarbeiter AS Leiter 
    ON Abteilungen.Manager = Leiter.SVNR;
```


```sql
SELECT * FROM Unternehmenshierarchie LIMIT 10;
```

<table class="table table-bordered">
  <TR><TH>Boss</TH>
  <TH>BossSVNR</TH>
  <TH>Employee</TH>
  <TH>EmployeeSVNR</TH>
  </TR>
  <TR><TD>Rolph</TD>
  <TD>4</TD>
  <TD>Heimo</TD>
  <TD>1</TD>
  </TR>
  <TR><TD>Rolph</TD>
  <TD>4</TD>
  <TD>Arnold</TD>
  <TD>2</TD>
  </TR>
  <TR><TD></TD>
  <TD></TD>
  <TD>Kamilla</TD>
  <TD>3</TD>
  </TR>
  <TR><TD>Kamilla</TD>
  <TD>3</TD>
  <TD>Rolph</TD>
  <TD>4</TD>
  </TR>
  <TR><TD>Kamilla</TD>
  <TD>3</TD>
  <TD>Gondolin</TD>
  <TD>5</TD>
  </TR>
  <TR><TD>Heimo</TD>
  <TD>1</TD>
  <TD>Holger</TD>
  <TD>6</TD>
  </TR>
  <TR><TD>Heimo</TD>
  <TD>1</TD>
  <TD>Isabella</TD>
  <TD>7</TD>
  </TR>
  <TR><TD>Heimo</TD>
  <TD>1</TD>
  <TD>Mario</TD>
  <TD>8</TD>
  </TR>
  <TR><TD>Arnold</TD>
  <TD>2</TD>
  <TD>Liebhart</TD>
  <TD>9</TD>
  </TR>
  <TR><TD>Arnold</TD>
  <TD>2</TD>
  <TD>Christina</TD>
  <TD>10</TD>
  </TR>
</table>


Beispiel angelehnt an [https://www.sqlite.org/lang_with.html]()

```sql
-- Rückgabeformat:
--   (level, boss, employee)

WITH RECURSIVE
  under_Kamilla(name,level) AS (
    VALUES('Kamilla', 0)
    UNION ALL
    SELECT Unternehmenshierarchie.Employee, under_Kamilla.level+1
      FROM Unternehmenshierarchie JOIN under_Kamilla ON Unternehmenshierarchie.boss=under_Kamilla.name
      ORDER BY 2 DESC
  )
SELECT substr('..........', 1, level*2) || name AS line FROM under_Kamilla;
```
