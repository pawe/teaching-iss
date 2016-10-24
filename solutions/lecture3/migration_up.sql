-- Erstellen Sie hier die VIEW für dien ersten Punkt der Hausübung.

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