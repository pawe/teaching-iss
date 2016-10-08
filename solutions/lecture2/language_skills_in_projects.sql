SELECT SVNR, Vorname, Nachname, Sprache, Grad
FROM Projekte
JOIN arbeitet_an ON Mitarbeiter.SVNR = arbeitet_in.Mitarbeiter

JOIN Mitarbeiter ON Mitarbeiter.SVNR = SprachFähigkeiten.Mitarbeiter

JOIN Abteilung ON arbeitet_in.Abfrage = Abteiung.Name
WHERE Abteilung.Name = 'Kon'