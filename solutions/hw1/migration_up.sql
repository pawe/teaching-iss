CREATE TABLE Mitarbeiter (
	SVNR INTEGER PRIMARY KEY,
	Vorname TEXT,
	Nachname TEXT,
	Stundensatz NUMERIC
);


-- 1:1 Abteilung wird von einem Mitarbeiter gemanagt
--     Mitarbeiter managt genau eine Abteilung
CREATE TABLE Abteilungen (
	Name TEXT PRIMARY KEY,
	Beschreibung TEXT,
	Manager INTEGER UNIQUE,
	FOREIGN KEY(Manager) REFERENCES Mitarbeiter(SVNR)
);


-- 1:N Mitarbeiter gehört zu genau einer Abteilung
--     einer Abteilung können mehrere Mitarbeiter zugehörig sein
CREATE TABLE arbeitet_in (
	Mitarbeiter INTEGER UNIQUE,
	Abteilung TEXT,
	FOREIGN KEY(Mitarbeiter) REFERENCES Mitarbeiter(SVNR),
	FOREIGN KEY(Abteilung) REFERENCES Abteilungen(Name)
);


-- M:N Mitarbeiter arbeitet an mehreren Projekten
--     in Projekten arbeiten mehrere Mitarbeiter
CREATE TABLE Projekte (
	Name TEXT PRIMARY KEY,
	Budget NUMBER
);

CREATE TABLE arbeitet_an (
	Mitarbeiter INTEGER,
	Projekt TEXT,
	Start DATE,
	Ende DATE,
	FOREIGN KEY(Mitarbeiter) REFERENCES Mitarbeiter(SVNR),
	FOREIGN KEY(Projekt) REFERENCES Projekte(Name)
);
