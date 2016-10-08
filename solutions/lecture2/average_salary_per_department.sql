SELECT Abeteilung, AVG(salary)
FROM Mitarbeiter m
JOIN arbeitet_in ai ON m.SVNR = ai.Mitarbeiter
JOIN Abteilungen a ON a.Name = ai.Abteilung
GROUP BY a.Abteiltung;
