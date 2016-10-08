-- Erstellen der Tabellen
-- Mitarbeitertabelle existiert bereits aus HÜ 1

CREATE TABLE SprachFähigkeiten (
  Mitarbeiter NUMERIC,
  Sprache TEXT,
  Grad NUMERIC,
  FOREIGN KEY(Mitarbeiter) REFERENCES Mitarbeiter(SVNR)
  PRIMARY KEY (Mitarbeiter, Sprache)
)