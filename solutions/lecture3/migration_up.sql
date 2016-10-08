-- Erstellen Sie hier die VIEW für dien ersten Punkt der Hausübung.

CREATE VIEW Unternehmenshierarchie AS 
  SELECT 
    Leiter.SVNR AS boss,
    Mitarbeiter.SVNR AS employee
  FROM Mitarbeiter
  LEFT OUTER JOIN arbeitet_in 
    ON Mitarbeiter.SVNR = arbeitet_in.Mitarbeiter
  LEFT OUTER JOIN Abteilung 
    ON arbeitet_in.Abteilung = Abteilung.Name
  LEFT OUTER JOIN Mitarbeiter Leiter 
    ON Abteilung.Manager = Leiter.SVNR;