SELECT Sprache, AVG(Grad)
FROM SprachFähigkeiten
GROUP BY Sprache
ORDER BY 2, 1;