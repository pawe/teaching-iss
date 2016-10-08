CREATE TABLE Baugruppen (
  Bezeichnung TEXT,
  Baugruppennummer NUMERIC,
  Artikelnummer TEXT,
  CADDatei BLOB,
  PRIMARY KEY (Baugruppennummer)
);

CREATE TABLE Teile (
  Bezeichnung TEXT,
  Teilnummer NUMERIC,
  Artikelnummer TEXT,
  CADDatei BLOB,
  PRIMARY KEY (Teilnummer)
);

CREATE TABLE TeileEinbau (
  Teil NUMERIC REFERENCES Teile(Teilnummer),
  Baugruppe NUMERIC REFERENCES Baugruppen(Baugruppennummer),
  Einbauanweisung TEXT
);

CREATE TABLE BaugruppenEinbau (
  Unterbaugruppe NUMERIC REFERENCES Baugruppen(Baugruppennummer),
  Überbaugruppe NUMERIC REFERENCES Baugruppen(Baugruppennummer),
  Einbauanweisung TEXT
);

CREATE TABLE Fertigungsdaten (
  Artikelnummer TEXT,
  Bearbeitungsdauer NUMERIC,
  Zeitstempel DATETIME
);


INSERT INTO Baugruppen 
VALUES 
  ('BG1', 1, '244222', null),
  ('BG2', 2, '488222', null),
  ('BG3', 3, '567622', null),
  ('BG4', 4, '645512', null);

INSERT INTO Teile 
VALUES 
  ('Tl1', 10, 'foo', null),
  ('Tl2', 11, 'fooy', null),
  ('Tl3', 12, 'foox', null),
  ('Tl4', 13, 'fooz', null),
  ('Tl5', 14, 'bar', null),
  ('Tl6', 15, 'barx', null),
  ('Tl7', 16, 'bary', null);


INSERT INTO TeileEinbau (Teil, Baugruppe)
VALUES 
  (10, 1), (11, 1), (12, 2), (13, 3), (14, 4), (15, 2), (15, 3),
  (10, 1), (11, 3), (12, 2), (12, 2), (12, 2), (13, 4), (14, 4), 
  (15, 2), (15, 3);

INSERT INTO BaugruppenEinbau (Unterbaugruppe, Überbaugruppe)
VALUES 
  (2, 1), (2, 1), (3, 2), (4, 3), (4, 3);


INSERT INTO Fertigungsdaten (Artikelnummer, Bearbeitungsdauer)
VALUES 
  ('foo', 123), ('foox', 23), ('fooy', 500), ('fooz', 341), ('bar', 845), ('barx', 34), ('bary', 9), ('244222', 50), ('488222', 10933), ('567622', 894), 
  ('foo', 150), ('foox', 24), ('fooy', 505), ('fooz', 340), ('bar', 850), ('barx', 32), ('bary', 10), ('244222', 51), ('488222', 11001), ('567622', 902),
  ('foo', 130), ('foox', 23), ('fooy', 500), ('fooz', 342), ('bar', 840), ('barx', 34), ('bary', 8), ('244222', 52), ('488222', 10901), ('567622', 891), 
  ('foo', 105), ('foox', 23), ('fooy', 501), ('fooz', 340), ('bar', 843), ('barx', 34), ('bary', 9), ('244222', 53), ('488222', 10980), ('567622', 899), 
  ('foo', 180), ('foox', 25), ('fooy', 497), ('fooz', 341), ('bar', 851), ('barx', 32), ('bary', 8), ('244222', 54), ('488222', 10979), ('567622', 898), 
  ('foo', 145), ('foox', 23), ('fooy', 502), ('fooz', 339), ('bar', 848), ('barx', 34), ('bary', 9), ('244222', 50), ('488222', 10945), ('567622', 882), 
  ('foo', 124), ('foox', 22), ('fooy', 492), ('fooz', 348), ('bar', 847), ('barx', 32), ('bary', 10), ('244222', 51), ('488222', 10873), ('567622', 899);
  