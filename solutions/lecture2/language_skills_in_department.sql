SELECT SVNR, Vorname, Nachname, Sprache, Grad
FROM arbeitet_in
JOIN Mitarbeiter ON Mitarbeiter.SVNR = arbeitet_in.Mitarbeiter
JOIN SprachFähigkeiten ON SprachFähigkeiten.Mitarbeiter = arbeitet_in.Mitarbeiter
WHERE Abteilung = $deptShort