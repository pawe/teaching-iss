-- Platzhalter
--   $svnr, $name, $sprache, $grad

BEGIN;
-- Wenn ein Fehler auftritt (zB. weil die SVNR bereits exisistert soll die 
-- Anweisung ohne Fehlermeldung ignoriert werden) 
INSERT OR IGNORE INTO Mitarbeiter (SVNR, Vorname, Nachname) 
VALUES (
  $svnr, 
  substr($name, 1, instr($name, ' ') - 1),
  substr($name, instr($name, ' ') + 1) 
);

-- Wenn ein Mitarbeiter eine Sprache bereits beherrscht soll die ganze Zeile
-- mit dem neuen Grad ersetzt werden. 
INSERT OR REPLACE INTO SprachFähigkeiten 
VALUES ($svnr, $sprache, $grad);
COMMIT;