-- Rückgabeformat:
--   (level, boss, employee)

WITH RECURSIVE
  under_Kamilla(name,level) AS (
    VALUES('Kamilla', 0)
    UNION ALL
    SELECT Unternehmenshierarchie.Employee, under_Kamilla.level+1
      FROM Unternehmenshierarchie JOIN under_Kamilla ON Unternehmenshierarchie.boss=under_Kamilla.name
      ORDER BY 2 DESC
  )
SELECT substr('..........', 1, level*2) || name AS line FROM under_Kamilla;