SELECT m.Vorname, m.Nachname, COUNT(Sprache) AS anzahlSprachen
FROM Mitarbeiter m 
JOIN SprachFähigkeiten sf ON sf.Mitarbeiter = m.SVNR 
GROUP BY m.SVNR
ORDER BY Nachname, Vorname, anzahlSprachen