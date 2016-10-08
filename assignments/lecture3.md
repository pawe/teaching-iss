# Rekursive Abfragen

Die hiearchische Struktur lässt sich aus den Tabellen, Abteilung, arbeitet_in 
und Mitarbeiter ableiten. 

Wir gehen davon aus, dass ein Mitarbeiter den Manager der Abteilung als 
Vorgesetzten hat. Ist ein Mitarbeiter einer Abteilung gleichzeitig Manager 
einer eigenen Abteilung ist diese Abteilung der anderen Untergeordnet.

Folgende VIEW bildet das Ganze ab:

```sql
CREATE VIEW Unternehmenshierarchie AS 
  SELECT 
    Leiter.Name AS Boss, 
    Leiter.SVNR AS BossSVNR,
    Mitarbeiter.Name AS Employee,
    Mitarbeiter.SVNR AS EmployeeSVNR
  FROM Mitarbeiter
  LEFT OUTER JOIN arbeitet_in 
    ON Mitarbeiter.SVNR = arbeitet_in.Mitarbeiter
  LEFT OUTER JOIN Abteilung 
    ON arbeitet_in.Abteilung = Abteilung.Name
  LEFT OUTER JOIN Mitarbeiter AS Leiter 
    ON Abteilung.Manager = Leiter.SVNR;
```


```sql
SELECT * FROM Unternehmenshierarchie;
```

<table class="table table-bordered">
  <TR>
    <TH>Boss</TH>
    <TH>BossSVNR</TH>
    <TH>Employee</TH>
    <TH>EmployeeSVNR</TH>
  </TR>
  <TR>
    <TD>Chris</TD>
    <TD>2456</TD>
    <TD>Franz</TD>
    <TD>1234</TD>
  </TR>
  <TR>
    <TD></TD>
    <TD></TD>
    <TD>Josef</TD>
    <TD>1245</TD>
  </TR>
    <TR><TD>Franz</TD>
    <TD>1234</TD>
    <TD>Gunar</TD>
    <TD>1256</TD>
  </TR>
    <TR><TD>Hans</TD>
    <TD>1456</TD>
    <TD>Frederik</TD>
    <TD>1356</TD>
  </TR>
    <TR><TD>Chris</TD>
    <TD>2456</TD>
    <TD>Hans</TD>
    <TD>1456</TD>
  </TR>
    <TR><TD>Hans</TD>
    <TD>1456</TD>
    <TD>Jan</TD>
    <TD>2356</TD>
  </TR>
    <TR><TD>Josef</TD>
    <TD>1245</TD>
    <TD>Chris</TD>
    <TD>2456</TD>
  </TR>
</table>


Beispiel von [https://www.sqlite.org/lang_with.html]()

```sql
WITH RECURSIVE
  under_Josef(name,level) AS (
    VALUES('Josef', 0)
    UNION ALL
    SELECT Unternehmenshierarchie.Employee, under_Josef.level+1
      FROM Unternehmenshierarchie JOIN under_Josef ON Unternehmenshierarchie.boss=under_Josef.name
      ORDER BY 2 DESC
  )
SELECT substr('..........', 1, level*2) || name FROM under_Josef;
```


Was ist wenn der boss nicht mehr josef ist? Gehen wir davon aus, dass der Mitarbeiter
ohne Boss der chef von allen ist.

```sql
WITH RECURSIVE
  hierarchy(svnr,level) AS (
    SELECT EmployeeSVNR, 0 FROM Unternehmenshierarchie WHERE Boss IS NULL
    UNION ALL
    SELECT Unternehmenshierarchie.EmployeeSVNR, hierarchy.level+1
      FROM Unternehmenshierarchie JOIN hierarchy ON Unternehmenshierarchie.bossSVNR=hierarchy.svnr
      ORDER BY 2 DESC
  )
SELECT 
  substr('..........', 1, level*2) || hierarchy.svnr AS level, 
  Mitarbeiter.name, 
  Abteilung.Beschreibung AS Leitet
FROM hierarchy
JOIN Mitarbeiter ON hierarchy.svnr = Mitarbeiter.SVNR
LEFT OUTER JOIN Abteilung ON hierarchy.svnr = Abteilung.Manager;
```
