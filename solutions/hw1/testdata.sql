
-- Mitarbeiter werden durch die Anwendung auf anderem Wege (mittels
-- ihrem SQL in eingefügt). Daten dazu finden Sie in testdata.json


-- Abteilungen mit Ihren Managern
INSERT INTO Abteilungen 
  (Name, Beschreibung, Manager)
VALUES
  ('Kon', 'Konstruktion', 1),
  ('Pro', 'Produktion', 2),
  ('GF',  'Geschäftsführung', 3),
  ('Tech', 'Technik', 4),
  ('Mark', 'Marketing', 5),
  ('Ent', 'Entwicklung', 18);

INSERT INTO arbeitet_in 
  (Mitarbeiter, Abteilung)
VALUES
  (1, 'Tech'), -- Manager der Konstruktion is Mitarbeiter in der Abteilung Technik 
  (2, 'Tech'), -- Manager der Prodktion ist Mitarbeiter der Abteilung Technik
  (4, 'GF'),   -- Manager von Tech ist Mitarbeiter der Geschäftsführung
  (5, 'GF'),   -- Manger der Mark ist Mitarbetier der Geschäftsführung
  (6, 'Kon'),
  (7, 'Kon'),
  (8, 'Kon'),
  (9, 'Pro'),
  (10, 'Pro'),
  (11, 'Pro'),
  (12, 'Pro'),
  (13, 'Tech'),
  (14, 'Mark'),
  (15, 'Mark'),
  (16, 'Pro'),
  (17, 'Mark');



INSERT INTO Projekte 
  (Name, Budget)
VALUES
  ('Automation', 150000),
  ('NewNewProdukt', 4000000),
  ('RevolutionaryProduct', 500000000);

-- Tag: YYYY-MM-DD

INSERT INTO arbeitet_an 
  (Mitarbeiter, Projekt, Start, Ende)
VALUES 
  (4, 'RevolutionaryProduct', '2014-12-01', ''),
  (7, 'RevolutionaryProduct', '2014-12-01', ''),
  (8, 'RevolutionaryProduct', '2014-12-01', '2015-02-01'),
  (8, 'RevolutionaryProduct', '2015-09-01', ''),
  (14, 'RevolutionaryProduct', '2014-10-01', ''),
  (2, 'NewNewProduct', '2010-10-01', '');