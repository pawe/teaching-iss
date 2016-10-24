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
  Abteilungen.Beschreibung AS Leitet
FROM hierarchy
JOIN Mitarbeiter ON hierarchy.svnr = Mitarbeiter.SVNR
LEFT OUTER JOIN Abteilungen ON hierarchy.svnr = Abteilungen.Manager;