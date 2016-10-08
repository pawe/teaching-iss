-- kein Platzhalter
--   direkt 
-- Rückgabeformat:
--   (level, boss, employee)

WITH RECURSIVE
  under_Josef(name,level) AS (
    VALUES('Josef', 0)
    UNION ALL
    SELECT Unternehmenshierarchie.Employee, under_Josef.level+1
      FROM Unternehmenshierarchie JOIN under_Josef ON Unternehmenshierarchie.boss=under_Josef.name
      ORDER BY 2 DESC
  )
SELECT substr('..........', 1, level*2) || name FROM under_Josef;