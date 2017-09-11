CREATE TABLE Baugruppen (
  Bezeichnung TEXT,
  Baugruppennummer TEXT,
  Artikelnummer TEXT,
  CADDatei BLOB,
  PRIMARY KEY (Baugruppennummer)
);

CREATE TABLE Teile (
  Bezeichnung TEXT,
  Teilnummer TEXT,
  Artikelnummer TEXT,
  CADDatei BLOB,
  PRIMARY KEY (Teilnummer)
);

CREATE TABLE TeileEinbau (
  Teil TEXT REFERENCES Teile(Teilnummer),
  Baugruppe TEXT REFERENCES Baugruppen(Baugruppennummer),
  Einbauanweisung TEXT
);

CREATE TABLE BaugruppenEinbau (
  Unterbaugruppe TEXT REFERENCES Baugruppen(Baugruppennummer),
  UEberbaugruppe TEXT REFERENCES Baugruppen(Baugruppennummer),
  Einbauanweisung TEXT
);

CREATE TABLE Fertigungsdaten (
  Artikelnummer TEXT,
  Bearbeitungsdauer NUMERIC,
  Zeitstempel DATETIME
);

INSERT INTO Teile (Teilnummer, Artikelnummer, Bezeichnung) VALUES 
('Teil_0222/A', '0222', 'Motorhalter Y-Achse Ausfuehrung 2'),
('Teil_0221/A', '0221', 'Blechfaehnchen Z-Achse justierbarer Endstop'),
('Teil_0220/A', '0220', 'Flachkopfschraube Schlitz M3x30mm'),
('Teil_0219/A', '0219', 'Justierbarer Endstophalter Platinenhalterung'),
('Teil_0218/A', '0218', 'Justierbarer Enstophalter Klemmteil'),
('Teil_0217/A', '0217', 'Filamentrollenhalter Klemmverschluss'),
('Teil_0216/A', '0216', 'Filamentrollenhalter Bolzen'),
('Teil_0215/A', '0215', 'Filamentrollenhalter Winkel'),
('Teil_0214/A', '0214', 'JHead_Nozzle Part2'),
('Teil_0213/A', '0213', 'JHead_Nozzle Part1'),
('Teil_0212/A', '0212', 'ventola_2'),
('Teil_0211/A', '0211', 'ventola_1'),
('Teil_0210/A', '0210', 'Einschalter'),
('Teil_0209/A', '0209', 'Luefter Netzteil'),
('Teil_0208/A', '0208', 'AC Power outlet connector'),
('Teil_0207/A', '0207', 'Netzteil Gehaeuse'),
('Teil_0206/A', '0206', 'TCST2103 Endstop_Opto_TCST2103'),
('Teil_0205/A', '0205', 'PCB Endstop_Opto_TCST2103'),
('Teil_0204/A', '0204', 'Connector Endstop_Opto_TCST2103'),
('Teil_0202/B', '0202', 'Teil_0202'),
('Teil_0201/B', '0201', 'Teil_0201'),
('Teil_0200/A', '0200', 'CAPSMD6_3x3_9_CAP003'),
('Teil_0199/A', '0199', 'CAPSMD6_3x3_9_CAP002'),
('Teil_0198/A', '0198', 'CAPSMD6_3x3_9_CAP001'),
('Teil_0197/A', '0197', 'pin_header_aw254-dg-g06d'),
('Teil_0196/A', '0196', 'PCB'),
('Teil_0195/A', '0195', 'female_header_a-bl254-eg-g08d'),
('Teil_0193/A', '0193', 'microchip_28'),
('Teil_0192/A', '0192', 'CAPSMD4x3_9_CAPSMD4x3_9'),
('Teil_0191/A', '0191', 'terminal_blocks_a-tb508-oq04ch'),
('Teil_0190/A', '0190', 'MF-R500___ _________'),
('Teil_0189/A', '0189', 'pin_header_aw140-eg-g08d'),
('Teil_0187/A', '0187', 'pin_header_aw140-eg-g06d'),
('Teil_0185/A', '0185', 'pin_header_aw140-eg-g04d'),
('Teil_0184/A', '0184', 'CAPSMD6_3x3_9_CAP'),
('Teil_0183/A', '0183', 'pin_header_aw140-eg-g03d'),
('Teil_0182/A', '0182', 'CAPSMD4x3_9_CAPSMD4x3_9004'),
('Teil_0181/A', '0181', 'CAPSMD4x3_9_CAPSMD4x3_9003'),
('Teil_0180/A', '0180', 'CAPSMD4x3_9_CAPSMD4x3_9002'),
('Teil_0179/A', '0179', 'CAPSMD4x3_9_CAPSMD4x3_9001'),
('Teil_0178/A', '0178', 'APA3010GCCK_RED'),
('Teil_0177/A', '0177', 'pin_header_aw140-eg-g02d'),
('Teil_0176/A', '0176', 'SWITCH, TACTILE, RIGHT ANGLE, 12VDC, 50MA, 6_85MM ACTUATOR, WEALTH METAL TC-0244Z'),
('Teil_0175/A', '0175', 'Heat_Sink'),
('Teil_0174/A', '0174', 'MF-R1100___ _________'),
('Teil_0173/A', '0173', 'RAMPS1_4_1'),
('Teil_0172/A', '0172', 'pin_header_aw254-dg-g36d'),
('Teil_0171/A', '0171', 'APA3010GCCK_GREEN'),
('Teil_0170/A', '0170', 'SIL_Male_8Pin'),
('Teil_0169/A', '0169', 'pin_header_aw140-eg-g18d'),
('Teil_0168/A', '0168', 'terminal_blocks_a-tb500-to06'),
('Teil_0167/A', '0167', 'pin_header_aw254-dg-g10d'),
('Teil_0166/A', '0166', 'pin_header_aw254-dg-g08d'),
('Teil_0165/A', '0165', 'DI_S1BB-13_Varsay__lan58524'),
('Teil_0164/A', '0164', 'SAMTEC_SSQ-106-01-G-S_Varsay__lan1053947'),
('Teil_0163/A', '0163', 'YAGEO_TC164-JR-071KL_Varsay__lan1180157'),
('Teil_0162/A', '0162', 'SAMTEC_SSQ-118-01-G-D_Varsay__lan1206538'),
('Teil_0161/A', '0161', 'CUI_PJ-102A1165735'),
('Teil_0160/A', '0160', 'ARDUINO_MEGA2560_REF_PCB_MECHANICAL_Varsay__lan610049'),
('Teil_0159/A', '0159', 'LUMEX_SML-LXT0805GW-TR_Varsay__lan72273'),
('Teil_0158/A', '0158', 'ARDUINO_MEGA2560_REF_PCB_TOP_OVERLAY_Varsay__lan216337'),
('Teil_0157/A', '0157', 'ARDUINO_MEGA2560_REF_PCB_BOTTOM_LAYER_Varsay__lan437426'),
('Teil_0156/A', '0156', 'TE_FSM1LPATR_Varsay__lan67891'),
('Teil_0155/A', '0155', 'ATMEGA16U2-MUR_Varsay__lan13227'),
('Teil_0154/A', '0154', 'INDC2012x10H1175883'),
('Teil_0153/A', '0153', 'TI_LP2985-33DBVR_Varsay__lan1170195'),
('Teil_0152/A', '0152', 'FAIRCHILD_FDN340P_Varsay__lan6960'),
('Teil_0150/A', '0150', 'ABRACON_ABL-16.000MHZ-B2_Varsay__lan1188778'),
('Teil_0149/A', '0149', 'YAGEO_TC164-JR-0710KL_Varsay__lan1045031'),
('Teil_0148/A', '0148', 'ARDUINO_MEGA2560_REF_PCB_BOTTOM_OVERLAY_Varsay__lan94128'),
('Teil_0147/A', '0147', 'ATMEGA2560-16AUR_Varsay__lan1069171'),
('Teil_0146/A', '0146', 'MURATA_CSTCE16M0V53-R0_Varsay__lan1177340'),
('Teil_0145/A', '0145', 'ARDUINO_MEGA2560_REF_PCB_BOTTOM_SOLDER_Varsay__lan192242'),
('Teil_0144/A', '0144', 'PANASONIC_EEE-1EA470WP_Varsay__lan75625'),
('Teil_0143/A', '0143', 'ARDUINO_MEGA2560_REF_PCB_TOP_SOLDER_Varsay__lan633196'),
('Teil_0142/A', '0142', 'LUMEX_SML-LXT0805SYW-TR_Varsay__lan90789'),
('Teil_0140/A', '0140', 'SAMTEC_SSQ-108-01-G-S_Varsay__lan47194'),
('Teil_0139/A', '0139', 'CAPC1608x08H4079'),
('Teil_0138/A', '0138', 'ON_NCP1117ST50T3G_Varsay__lan82402'),
('Teil_0137/A', '0137', 'YAGEO_TC164-JR-0722RL_Varsay__lan1197654'),
('Teil_0136/A', '0136', 'MOLEX_0010897061_Varsay__lan1062431'),
('Teil_0135/A', '0135', 'RESC1608x55H12018'),
('Teil_0134/A', '0134', 'ARDUINO_MEGA2560_REF_PCB_ML_Varsay__lan705008'),
('Teil_0133/A', '0133', 'ARDUINO_MEGA2560_REF_PCB_TOP_LAYER_Varsay__lan746915'),
('Teil_0132/A', '0132', 'LMV358IDGKR_Varsay__lan1129524'),
('Teil_0131/A', '0131', 'BOURNS_MF-MSMF050-224'),
('Teil_0130/A', '0130', 'WURTH_61400416121_Varsay__lan1138352'),
('Teil_0129/A', '0129', 'Zahnriemenspanner klein'),
('Teil_0128/A', '0128', 'Zahnriemenspanner klein X-Achse'),
('Teil_0127/A', '0127', 'Zahnriemenspanner gross'),
('Teil_0126/A', '0126', 'Zahnriemenspanner gross X-Achse'),
('Teil_0125/A', '0125', 'Zahnriemen Y-Achse'),
('Teil_0124/A', '0124', 'Zahnriemen X-Achse'),
('Teil_0123/A', '0123', 'Scheibe M8'),
('Teil_0122/A', '0122', 'Scheibe M8 gross'),
('Teil_0121/A', '0121', 'Scheibe M5'),
('Teil_0120/A', '0120', 'Unterlegscheibe M4'),
('Teil_0119/A', '0119', 'Scheibe M3'),
('Teil_0118/A', '0118', 'Unterer rechter Rahmenverbinder'),
('Teil_0117/A', '0117', 'Unterer linker Rahmenverbinder'),
('Teil_0116/A', '0116', 'Strangpressprofil 420mm'),
('Teil_0115/A', '0115', 'Strangpressprofil 420mm gebohrt'),
('Teil_0114/A', '0114', 'Strangpressprofil 340mm'),
('Teil_0113/A', '0113', 'Strangpressprofil 300mm'),
('Teil_0112/A', '0112', 'Stange 8mm x 20mm'),
('Teil_0111/A', '0111', 'Spannrollenhalter Y-Achse'),
('Teil_0110/A', '0110', 'Sechskantmutter M8'),
('Teil_0109/A', '0109', 'Sechskantmutter M5 flach'),
('Teil_0108/A', '0108', 'Sechskantmutter M4'),
('Teil_0107/A', '0107', 'Sechskantmutter M3'),
('Teil_0106/A', '0106', 'Rahmenverbinder Z-Achse'),
('Teil_0105/A', '0105', 'Radialrillenkugellager 608ZZ'),
('Teil_0104/A', '0104', 'Praezisionswelle 8mm x 420mm'),
('Teil_0103/A', '0103', 'Praezisionswelle 8mm x 350mm'),
('Teil_0102/A', '0102', 'Praezisionswelle 8mm x 450mm'),
('Teil_0101/A', '0101', 'Oberer Rahmenverbinder'),
('Teil_0099/A', '0099', 'Nutenstein M5'),
('Teil_0098/A', '0098', 'Netzteil-Halterung'),
('Teil_0097/A', '0097', 'NEMA 17 Schrittmotor'),
('Teil_0096/A', '0096', 'Motorritzel T2,5'),
('Teil_0095/A', '0095', 'Motorkupplung Z-Achse'),
('Teil_0094/A', '0094', 'Motorhalter Z-Achse'),
('Teil_0093/A', '0093', 'Motorhalter Y-Achse'),
('Teil_0092/A', '0092', 'Motorhalter X-Achse'),
('Teil_0091/A', '0091', 'Mikrocontroller Halterung'),
('Teil_0090/A', '0090', 'MDF-Platte klein'),
('Teil_0089/A', '0089', 'MDF-Platte gross'),
('Teil_0088/A', '0088', 'Elektronik-Luefter Halterung'),
('Teil_0087/A', '0087', 'Luefter Halterung X-Achse'),
('Teil_0086/A', '0086', 'Schlitten X-Achse (Linearkugellageraufnahme X-Achse)'),
('Teil_0085/A', '0085', 'Linearkugellager LM8UU'),
('Teil_0084/A', '0084', 'Lageraufnahme LM8UU'),
('Teil_0083/A', '0083', 'Klemmvorrichtung'),
('Teil_0082/A', '0082', 'Kabelbinder Netzteil'),
('Teil_0081/A', '0081', 'Kabelbinder Lageraufnahme'),
('Teil_0080/A', '0080', 'Kabelabdeckung'),
('Teil_0079/A', '0079', 'Innensechskantschraube M5x10mm'),
('Teil_0078/A', '0078', 'Innensechskantschraube M4x20mm'),
('Teil_0077/A', '0077', 'Innensechskantschraube M3x50mm'),
('Teil_0076/A', '0076', 'Innensechskantschraube M3x40mm'),
('Teil_0075/A', '0075', 'Innensechskantschraube M3x30mm'),
('Teil_0074/A', '0074', 'Innensechskantschraube M3x25mm'),
('Teil_0073/A', '0073', 'Innensechskantschraube M3x20mm'),
('Teil_0072/A', '0072', 'Innensechskantschraube M3x10mm'),
('Teil_0071/A', '0071', 'Innensechskantschraube M3x9mm (gekuerzt)'),
('Teil_0070/A', '0070', 'Heizbett MK2A'),
('Teil_0069/A', '0069', 'Gewindestangenaufnahme X-Achse'),
('Teil_0068/A', '0068', 'Gewindestange M8x325mm'),
('Teil_0067/A', '0067', 'Gewindestange M8x55mm'),
('Teil_0066/A', '0066', 'Foldback Klammer'),
('Teil_0065/A', '0065', 'Flachkopfschraube mit Innensechskant M5x30mm'),
('Teil_0064/A', '0064', 'Filamentschraube M8x50mm'),
('Teil_0063/A', '0063', 'Feder Z-Achse Innendurchmesser 8,2mm x 30mm'),
('Teil_0062/A', '0062', 'Feder Extruder Innendurchmesser 5,3mm x 20mm'),
('Teil_0061/A', '0061', 'Extruder Zahnrad klein'),
('Teil_0060/A', '0060', 'Extruder Zahnrad gross'),
('Teil_0059/A', '0059', 'Extruder Idler'),
('Teil_0058/A', '0058', 'Extruder Body'),
('Teil_0057/A', '0057', 'Endstophalter'),
('Teil_0056/A', '0056', 'Druckbettfeder Innendurchmesser 5,3mm x 30mm'),
('Teil_0055/A', '0055', 'Druckbett'),
('Teil_0054/A', '0054', 'Blechfaehnchen Z-Achse'),
('Teil_0053/A', '0053', 'Blechfaehnchen Y-Achse'),
('Teil_0052/A', '0052', 'Blechfaehnchen X-Achse'),
('Teil_0051/A', '0051', 'Aufnahme 8mm Achsen');


INSERT INTO Baugruppen (Baugruppennummer, Artikelnummer, Bezeichnung) VALUES 
('Teil_0203/B', '0203', 'Teil_0203'),
('Teil_0194/A', '0194', 'CAPSMD4x3_9'),
('Teil_0188/A', '0188', 'G3D_A4988'),
('Teil_0186/A', '0186', 'RAMPS1_4'),
('Teil_0141/A', '0141', 'ARDUINO_MEGA2560_REF_PCB_Varsay__lan94120'),
('B0068/A', '0068', 'Motorhalter Y-Achse Ausfuehrung 2 Zusammenbau'),
('B0067/A', '0067', 'Justierbarer Z-Endstop Zusammenbau'),
('B0066/A', '0066', 'Flachkopfschraube Schlitz M3x30mm mit Scheibe'),
('B0065/A', '0065', 'Justierbarer Endstophalter Zusammenbau'),
('B0064/A', '0064', 'Filamentrollenhalter Zusammenbau'),
('B0063/A', '0063', 'Luefter Halterung X-Achse Zusammenbau'),
('B0062/A', '0062', 'ISK-Schraube M3x50mm und Scheibe'),
('B0061/A', '0061', 'Extruder Zusammenbau'),
('B0060/A', '0060', 'Endstophalter Zusammenbau'),
('B0059/A', '0059', 'Luefter Halterung Zusammenbau'),
('B0058/A', '0058', 'Mikrocontroller Halterung Zusammenbau'),
('B0057/A', '0057', 'Arduino Mega 2560 + Ramps 1.4 Zusammenbau'),
('B0056/A', '0056', 'Kabelabdeckung Zusammenbau'),
('B0055/A', '0055', 'Netzteil Halterung Zusammenbau'),
('B0054/A', '0054', 'X-Achse'),
('B0053/A', '0053', 'ISK-Schraube M4x20mm mit Scheibe'),
('B0052/A', '0052', 'Schlitten X-Achse Zusammenbau'),
('B0051/A', '0051', 'B0051'),
('B0050/A', '0050', 'Gewindestangenaufnahme'),
('B0049/A', '0049', 'ISK-Schraube M3x20mm mit Scheibe'),
('B0048/A', '0048', 'Y-Achse'),
('B0047/A', '0047', 'Druckbett Zusammenbau'),
('B0046/A', '0046', 'ISK-Schraube M3x30mm und Scheibe'),
('B0045/A', '0045', 'Sechskantmutter M3 und Scheibe'),
('B0044/A', '0044', 'ISK-Schraube M3x40mm und Scheibe'),
('B0043/A', '0043', 'B0043'),
('B0042/A', '0042', 'Zahnriemenspanner Zusammenbau'),
('B0041/A', '0041', 'ISK-Schraube M3x9mm (gek�rzt) und Scheibe'),
('B0040/A', '0040', 'Lageraufnahme LM8UU Zusammenbau'),
('B0039/A', '0039', 'Aufnahme 8mm-Achsen inkl. Schrauben und Nutensteine'),
('B0038/A', '0038', 'Aufnahme 8mm-Achsen Zusammenbau'),
('B0037/A', '0037', 'Motorhalter Y-Achse Zusammenbau'),
('B0036/A', '0036', 'Spannrollenhalter Y-Achse inkl. Schrauben und Nutensteine'),
('B0035/A', '0035', 'Spannrollenhalter Y-Achse Zusammenbau'),
('B0034/A', '0034', 'ISK-Schraube M3x10 + Scheibe'),
('B0033/A', '0033', 'Motorhalter Z-Achse Zusammenbau'),
('B0032/A', '0032', 'Rahmenverbinder Z-Achse Zusammenbau'),
('B0031/A', '0031', 'Oberer Rahmenverbinder rechts inkl. Schrauben und Nutensteine'),
('B0030/A', '0030', 'Flachkopfschraube M5 und Scheibe'),
('B0029/A', '0029', 'Unterer rechter Rahmenverbinder inkl. Schrauben und Nutensteine'),
('B0028/A', '0028', 'ISK-Schraube M5x10 + Scheibe'),
('B0027/A', '0027', 'Unterer linker Rahmenverbinder inkl. Schrauben und Nutensteine'),
('B0025/A', '0025', 'J-Head Nozzle'),
('B0024/A', '0024', 'Luefter_60x60x25mm'),
('B0023/A', '0023', 'Netzteil 230V MPS-400'),
('B0022/A', '0022', 'Optischer Endstopschalter'),
('B0021/A', '0021', 'Ramps 1.4 inkl. Pololu Stepper Driver A4988'),
('B0020/A', '0020', 'Arduino Mega 2560'),
('3D Drucker', '', 'MendelMax 1.5 komplett'); 


INSERT INTO TeileEinbau (Teil, Baugruppe) VALUES 
('Teil_0222/A', 'B0068/A'),
('Teil_0221/A', '3D Drucker'),
('Teil_0220/A', 'B0066/A'),
('Teil_0219/A', 'B0065/A'),
('Teil_0218/A', 'B0065/A'),
('Teil_0217/A', '3D Drucker'),
('Teil_0216/A', '3D Drucker'),
('Teil_0215/A', 'B0064/A'),
('Teil_0214/A', 'B0025/A'),
('Teil_0213/A', 'B0025/A'),
('Teil_0212/A', 'B0024/A'),
('Teil_0211/A', 'B0024/A'),
('Teil_0210/A', 'B0023/A'),
('Teil_0209/A', 'B0023/A'),
('Teil_0208/A', 'B0023/A'),
('Teil_0207/A', 'B0023/A'),
('Teil_0206/A', 'B0022/A'),
('Teil_0205/A', 'B0022/A'),
('Teil_0204/A', 'B0022/A'),
('Teil_0202/B', 'Teil_0186/A'),
('Teil_0202/B', 'Teil_0186/A'),
('Teil_0202/B', 'Teil_0186/A'),
('Teil_0201/B', 'Teil_0203/B'),
('Teil_0200/A', 'Teil_0203/B'),
('Teil_0199/A', 'Teil_0203/B'),
('Teil_0198/A', 'Teil_0203/B'),
('Teil_0197/A', 'Teil_0186/A'),
('Teil_0197/A', 'Teil_0186/A'),
('Teil_0197/A', 'Teil_0186/A'),
('Teil_0197/A', 'Teil_0186/A'),
('Teil_0197/A', 'Teil_0186/A'),
('Teil_0196/A', 'Teil_0188/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0195/A', 'Teil_0186/A'),
('Teil_0193/A', 'Teil_0188/A'),
('Teil_0192/A', 'Teil_0194/A'),
('Teil_0191/A', 'Teil_0186/A'),
('Teil_0190/A', 'Teil_0186/A'),
('Teil_0189/A', 'Teil_0186/A'),
('Teil_0189/A', 'Teil_0186/A'),
('Teil_0189/A', 'Teil_0186/A'),
('Teil_0189/A', 'Teil_0186/A'),
('Teil_0189/A', 'Teil_0186/A'),
('Teil_0187/A', 'Teil_0186/A'),
('Teil_0187/A', 'Teil_0186/A'),
('Teil_0187/A', 'Teil_0186/A'),
('Teil_0187/A', 'Teil_0186/A'),
('Teil_0187/A', 'Teil_0186/A'),
('Teil_0185/A', 'Teil_0186/A'),
('Teil_0185/A', 'Teil_0186/A'),
('Teil_0185/A', 'Teil_0186/A'),
('Teil_0185/A', 'Teil_0186/A'),
('Teil_0185/A', 'Teil_0186/A'),
('Teil_0185/A', 'Teil_0186/A'),
('Teil_0184/A', 'Teil_0203/B'),
('Teil_0183/A', 'Teil_0186/A'),
('Teil_0182/A', 'Teil_0194/A'),
('Teil_0181/A', 'Teil_0194/A'),
('Teil_0180/A', 'Teil_0194/A'),
('Teil_0179/A', 'Teil_0194/A'),
('Teil_0178/A', 'Teil_0186/A'),
('Teil_0178/A', 'Teil_0186/A'),
('Teil_0178/A', 'Teil_0186/A'),
('Teil_0177/A', 'Teil_0186/A'),
('Teil_0176/A', 'Teil_0186/A'),
('Teil_0175/A', 'Teil_0188/A'),
('Teil_0174/A', 'Teil_0186/A'),
('Teil_0173/A', 'Teil_0186/A'),
('Teil_0172/A', 'Teil_0186/A'),
('Teil_0171/A', 'Teil_0186/A'),
('Teil_0170/A', 'Teil_0188/A'),
('Teil_0170/A', 'Teil_0188/A'),
('Teil_0169/A', 'Teil_0186/A'),
('Teil_0168/A', 'Teil_0186/A'),
('Teil_0167/A', 'Teil_0186/A'),
('Teil_0166/A', 'Teil_0186/A'),
('Teil_0166/A', 'Teil_0186/A'),
('Teil_0166/A', 'Teil_0186/A'),
('Teil_0166/A', 'B0021/A'),
('Teil_0165/A', 'B0020/A'),
('Teil_0164/A', 'B0020/A'),
('Teil_0163/A', 'B0020/A'),
('Teil_0163/A', 'B0020/A'),
('Teil_0162/A', 'B0020/A'),
('Teil_0161/A', 'B0020/A'),
('Teil_0160/A', 'Teil_0141/A'),
('Teil_0159/A', 'B0020/A'),
('Teil_0158/A', 'Teil_0141/A'),
('Teil_0157/A', 'Teil_0141/A'),
('Teil_0156/A', 'B0020/A'),
('Teil_0155/A', 'B0020/A'),
('Teil_0154/A', 'B0020/A'),
('Teil_0153/A', 'B0020/A'),
('Teil_0152/A', 'B0020/A'),
('Teil_0150/A', 'B0020/A'),
('Teil_0149/A', 'B0020/A'),
('Teil_0149/A', 'B0020/A'),
('Teil_0148/A', 'Teil_0141/A'),
('Teil_0147/A', 'B0020/A'),
('Teil_0146/A', 'B0020/A'),
('Teil_0145/A', 'Teil_0141/A'),
('Teil_0144/A', 'B0020/A'),
('Teil_0144/A', 'B0020/A'),
('Teil_0143/A', 'Teil_0141/A'),
('Teil_0142/A', 'B0020/A'),
('Teil_0142/A', 'B0020/A'),
('Teil_0142/A', 'B0020/A'),
('Teil_0140/A', 'B0020/A'),
('Teil_0140/A', 'B0020/A'),
('Teil_0140/A', 'B0020/A'),
('Teil_0140/A', 'B0020/A'),
('Teil_0140/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0139/A', 'B0020/A'),
('Teil_0138/A', 'B0020/A'),
('Teil_0137/A', 'B0020/A'),
('Teil_0136/A', 'B0020/A'),
('Teil_0136/A', 'B0020/A'),
('Teil_0135/A', 'B0020/A'),
('Teil_0135/A', 'B0020/A'),
('Teil_0135/A', 'B0020/A'),
('Teil_0135/A', 'B0020/A'),
('Teil_0135/A', 'B0020/A'),
('Teil_0135/A', 'B0020/A'),
('Teil_0134/A', 'Teil_0141/A'),
('Teil_0133/A', 'Teil_0141/A'),
('Teil_0132/A', 'B0020/A'),
('Teil_0131/A', 'B0020/A'),
('Teil_0130/A', 'B0020/A'),
('Teil_0129/A', 'B0042/A'),
('Teil_0128/A', 'B0052/A'),
('Teil_0128/A', 'B0052/A'),
('Teil_0127/A', 'B0042/A'),
('Teil_0126/A', 'B0052/A'),
('Teil_0125/A', '3D Drucker'),
('Teil_0124/A', 'B0054/A'),
('Teil_0123/A', 'B0061/A'),
('Teil_0123/A', 'B0061/A'),
('Teil_0123/A', 'B0061/A'),
('Teil_0123/A', 'B0061/A'),
('Teil_0123/A', 'B0061/A'),
('Teil_0123/A', 'B0061/A'),
('Teil_0123/A', 'B0050/A'),
('Teil_0123/A', 'B0050/A'),
('Teil_0122/A', 'B0050/A'),
('Teil_0122/A', 'B0050/A'),
('Teil_0122/A', 'B0035/A'),
('Teil_0122/A', 'B0035/A'),
('Teil_0121/A', 'B0030/A'),
('Teil_0121/A', 'B0028/A'),
('Teil_0120/A', 'B0053/A'),
('Teil_0119/A', 'B0066/A'),
('Teil_0119/A', 'B0062/A'),
('Teil_0119/A', 'B0061/A'),
('Teil_0119/A', 'B0061/A'),
('Teil_0119/A', 'B0049/A'),
('Teil_0119/A', 'B0046/A'),
('Teil_0119/A', 'B0045/A'),
('Teil_0119/A', 'B0044/A'),
('Teil_0119/A', 'B0043/A'),
('Teil_0119/A', 'B0042/A'),
('Teil_0119/A', 'B0042/A'),
('Teil_0119/A', 'B0041/A'),
('Teil_0119/A', 'B0034/A'),
('Teil_0118/A', 'B0029/A'),
('Teil_0117/A', 'B0027/A'),
('Teil_0116/A', '3D Drucker'),
('Teil_0116/A', '3D Drucker'),
('Teil_0116/A', '3D Drucker'),
('Teil_0116/A', '3D Drucker'),
('Teil_0115/A', '3D Drucker'),
('Teil_0115/A', '3D Drucker'),
('Teil_0114/A', '3D Drucker'),
('Teil_0114/A', '3D Drucker'),
('Teil_0114/A', '3D Drucker'),
('Teil_0114/A', '3D Drucker'),
('Teil_0113/A', '3D Drucker'),
('Teil_0113/A', '3D Drucker'),
('Teil_0113/A', '3D Drucker'),
('Teil_0113/A', '3D Drucker'),
('Teil_0112/A', 'B0061/A'),
('Teil_0111/A', 'B0036/A'),
('Teil_0110/A', 'B0061/A'),
('Teil_0110/A', 'B0051/A'),
('Teil_0110/A', 'B0051/A'),
('Teil_0110/A', 'B0050/A'),
('Teil_0110/A', 'B0050/A'),
('Teil_0110/A', 'B0050/A'),
('Teil_0110/A', 'B0050/A'),
('Teil_0110/A', 'B0035/A'),
('Teil_0110/A', 'B0035/A'),
('Teil_0110/A', 'B0032/A'),
('Teil_0110/A', 'B0032/A'),
('Teil_0109/A', 'B0033/A'),
('Teil_0109/A', 'B0033/A'),
('Teil_0108/A', 'B0061/A'),
('Teil_0108/A', 'B0061/A'),
('Teil_0107/A', 'B0065/A'),
('Teil_0107/A', 'B0065/A'),
('Teil_0107/A', 'B0065/A'),
('Teil_0107/A', 'B0065/A'),
('Teil_0107/A', 'B0065/A'),
('Teil_0107/A', 'B0065/A'),
('Teil_0107/A', 'B0063/A'),
('Teil_0107/A', 'B0063/A'),
('Teil_0107/A', 'B0061/A'),
('Teil_0107/A', 'B0061/A'),
('Teil_0107/A', 'B0061/A'),
('Teil_0107/A', 'B0061/A'),
('Teil_0107/A', 'B0061/A'),
('Teil_0107/A', 'B0052/A'),
('Teil_0107/A', 'B0052/A'),
('Teil_0107/A', 'B0052/A'),
('Teil_0107/A', 'B0052/A'),
('Teil_0107/A', 'B0052/A'),
('Teil_0107/A', 'B0051/A'),
('Teil_0107/A', 'B0051/A'),
('Teil_0107/A', 'B0051/A'),
('Teil_0107/A', 'B0051/A'),
('Teil_0107/A', 'B0050/A'),
('Teil_0107/A', 'B0050/A'),
('Teil_0107/A', 'B0050/A'),
('Teil_0107/A', 'B0050/A'),
('Teil_0107/A', 'B0045/A'),
('Teil_0107/A', 'B0042/A'),
('Teil_0107/A', 'B0042/A'),
('Teil_0107/A', 'B0042/A'),
('Teil_0107/A', 'B0040/A'),
('Teil_0107/A', 'B0039/A'),
('Teil_0107/A', 'B0039/A'),
('Teil_0106/A', 'B0032/A'),
('Teil_0105/A', 'B0061/A'),
('Teil_0105/A', 'B0061/A'),
('Teil_0105/A', 'B0061/A'),
('Teil_0105/A', 'B0050/A'),
('Teil_0105/A', 'B0050/A'),
('Teil_0105/A', 'B0035/A'),
('Teil_0105/A', 'B0035/A'),
('Teil_0105/A', 'B0032/A'),
('Teil_0104/A', 'B0038/A'),
('Teil_0104/A', 'B0038/A'),
('Teil_0103/A', '3D Drucker'),
('Teil_0103/A', '3D Drucker'),
('Teil_0102/A', 'B0054/A'),
('Teil_0102/A', 'B0054/A'),
('Teil_0101/A', 'B0031/A'),
('Teil_0099/A', 'B0068/A'),
('Teil_0099/A', 'B0068/A'),
('Teil_0099/A', 'B0064/A'),
('Teil_0099/A', 'B0059/A'),
('Teil_0099/A', 'B0059/A'),
('Teil_0099/A', 'B0058/A'),
('Teil_0099/A', 'B0058/A'),
('Teil_0099/A', 'B0058/A'),
('Teil_0099/A', 'B0056/A'),
('Teil_0099/A', 'B0056/A'),
('Teil_0099/A', 'B0056/A'),
('Teil_0099/A', 'B0055/A'),
('Teil_0099/A', 'B0055/A'),
('Teil_0099/A', 'B0055/A'),
('Teil_0099/A', 'B0039/A'),
('Teil_0099/A', 'B0039/A'),
('Teil_0099/A', 'B0037/A'),
('Teil_0099/A', 'B0037/A'),
('Teil_0099/A', 'B0036/A'),
('Teil_0099/A', 'B0036/A'),
('Teil_0099/A', 'B0033/A'),
('Teil_0099/A', 'B0033/A'),
('Teil_0099/A', 'B0033/A'),
('Teil_0099/A', 'B0033/A'),
('Teil_0099/A', 'B0032/A'),
('Teil_0099/A', 'B0032/A'),
('Teil_0099/A', 'B0031/A'),
('Teil_0099/A', 'B0031/A'),
('Teil_0099/A', 'B0031/A'),
('Teil_0099/A', 'B0031/A'),
('Teil_0099/A', 'B0029/A'),
('Teil_0099/A', 'B0029/A'),
('Teil_0099/A', 'B0029/A'),
('Teil_0099/A', 'B0029/A'),
('Teil_0099/A', 'B0029/A'),
('Teil_0099/A', 'B0029/A'),
('Teil_0099/A', 'B0029/A'),
('Teil_0099/A', 'B0029/A'),
('Teil_0099/A', 'B0027/A'),
('Teil_0099/A', 'B0027/A'),
('Teil_0099/A', 'B0027/A'),
('Teil_0099/A', 'B0027/A'),
('Teil_0099/A', 'B0027/A'),
('Teil_0099/A', 'B0027/A'),
('Teil_0099/A', 'B0027/A'),
('Teil_0099/A', 'B0027/A'),
('Teil_0098/A', 'B0055/A'),
('Teil_0097/A', 'B0068/A'),
('Teil_0097/A', 'B0061/A'),
('Teil_0097/A', 'B0051/A'),
('Teil_0097/A', 'B0037/A'),
('Teil_0097/A', 'B0033/A'),
('Teil_0096/A', 'B0068/A'),
('Teil_0096/A', 'B0051/A'),
('Teil_0096/A', 'B0037/A'),
('Teil_0095/A', 'B0033/A'),
('Teil_0094/A', 'B0033/A'),
('Teil_0093/A', 'B0037/A'),
('Teil_0092/A', 'B0051/A'),
('Teil_0091/A', 'B0058/A'),
('Teil_0090/A', 'B0047/A'),
('Teil_0089/A', 'B0047/A'),
('Teil_0088/A', 'B0059/A'),
('Teil_0087/A', 'B0063/A'),
('Teil_0086/A', 'B0052/A'),
('Teil_0085/A', 'B0052/A'),
('Teil_0085/A', 'B0052/A'),
('Teil_0085/A', 'B0052/A'),
('Teil_0085/A', 'B0052/A'),
('Teil_0085/A', 'B0051/A'),
('Teil_0085/A', 'B0051/A'),
('Teil_0085/A', 'B0050/A'),
('Teil_0085/A', 'B0050/A'),
('Teil_0085/A', 'B0040/A'),
('Teil_0084/A', 'B0040/A'),
('Teil_0083/A', 'B0033/A'),
('Teil_0082/A', 'B0055/A'),
('Teil_0082/A', 'B0055/A'),
('Teil_0081/A', 'B0040/A'),
('Teil_0081/A', 'B0040/A'),
('Teil_0080/A', 'B0056/A'),
('Teil_0079/A', 'B0064/A'),
('Teil_0079/A', 'B0037/A'),
('Teil_0079/A', 'B0037/A'),
('Teil_0079/A', 'B0033/A'),
('Teil_0079/A', 'B0033/A'),
('Teil_0079/A', 'B0028/A'),
('Teil_0078/A', 'B0053/A'),
('Teil_0077/A', 'B0062/A'),
('Teil_0076/A', 'B0044/A'),
('Teil_0075/A', 'B0046/A'),
('Teil_0074/A', 'B0058/A'),
('Teil_0074/A', 'B0058/A'),
('Teil_0074/A', 'B0058/A'),
('Teil_0074/A', 'B0043/A'),
('Teil_0073/A', 'B0052/A'),
('Teil_0073/A', 'B0052/A'),
('Teil_0073/A', 'B0052/A'),
('Teil_0073/A', 'B0052/A'),
('Teil_0073/A', 'B0052/A'),
('Teil_0073/A', 'B0051/A'),
('Teil_0073/A', 'B0051/A'),
('Teil_0073/A', 'B0050/A'),
('Teil_0073/A', 'B0050/A'),
('Teil_0073/A', 'B0049/A'),
('Teil_0073/A', 'B0042/A'),
('Teil_0073/A', 'B0039/A'),
('Teil_0073/A', 'B0039/A'),
('Teil_0072/A', 'B0061/A'),
('Teil_0072/A', 'B0061/A'),
('Teil_0072/A', 'B0061/A'),
('Teil_0072/A', 'B0052/A'),
('Teil_0072/A', 'B0051/A'),
('Teil_0072/A', 'B0051/A'),
('Teil_0072/A', 'B0051/A'),
('Teil_0072/A', 'B0034/A'),
('Teil_0071/A', 'B0041/A'),
('Teil_0070/A', 'B0047/A'),
('Teil_0069/A', 'B0050/A'),
('Teil_0068/A', '3D Drucker'),
('Teil_0068/A', '3D Drucker'),
('Teil_0067/A', 'B0050/A'),
('Teil_0067/A', 'B0035/A'),
('Teil_0066/A', 'B0047/A'),
('Teil_0066/A', 'B0047/A'),
('Teil_0066/A', 'B0047/A'),
('Teil_0066/A', 'B0047/A'),
('Teil_0065/A', 'B0030/A'),
('Teil_0064/A', 'B0061/A'),
('Teil_0063/A', 'B0051/A'),
('Teil_0063/A', 'B0050/A'),
('Teil_0062/A', 'B0061/A'),
('Teil_0062/A', 'B0061/A'),
('Teil_0061/A', 'B0061/A'),
('Teil_0060/A', 'B0061/A'),
('Teil_0059/A', 'B0061/A'),
('Teil_0058/A', 'B0061/A'),
('Teil_0057/A', 'B0060/A'),
('Teil_0056/A', 'B0047/A'),
('Teil_0056/A', 'B0047/A'),
('Teil_0056/A', 'B0047/A'),
('Teil_0056/A', 'B0047/A'),
('Teil_0055/A', 'B0047/A'),
('Teil_0054/A', 'B0051/A'),
('Teil_0053/A', 'B0047/A'),
('Teil_0052/A', 'B0052/A'),
('Teil_0051/A', 'B0039/A'); 

INSERT INTO BaugruppenEinbau (Unterbaugruppe, UEberbaugruppe) VALUES 
('Teil_0203/B', 'Teil_0186/A'),
('Teil_0203/B', 'Teil_0186/A'),
('Teil_0203/B', 'Teil_0186/A'),
('Teil_0203/B', 'Teil_0186/A'),
('Teil_0203/B', 'Teil_0186/A'),
('Teil_0203/B', 'Teil_0186/A'),
('Teil_0194/A', 'Teil_0186/A'),
('Teil_0194/A', 'Teil_0186/A'),
('Teil_0194/A', 'Teil_0186/A'),
('Teil_0188/A', 'B0021/A'),
('Teil_0188/A', 'B0021/A'),
('Teil_0188/A', 'B0021/A'),
('Teil_0188/A', 'B0021/A'),
('Teil_0188/A', 'B0021/A'),
('Teil_0186/A', 'B0021/A'),
('Teil_0141/A', 'B0020/A'),
('B0068/A', '3D Drucker'),
('B0067/A', '3D Drucker'),
('B0066/A', 'B0065/A'),
('B0066/A', 'B0065/A'),
('B0065/A', 'B0067/A'),
('B0064/A', '3D Drucker'),
('B0064/A', '3D Drucker'),
('B0063/A', '3D Drucker'),
('B0062/A', 'B0061/A'),
('B0062/A', 'B0061/A'),
('B0061/A', '3D Drucker'),
('B0060/A', '3D Drucker'),
('B0060/A', '3D Drucker'),
('B0060/A', '3D Drucker'),
('B0059/A', '3D Drucker'),
('B0058/A', '3D Drucker'),
('B0057/A', 'B0058/A'),
('B0056/A', '3D Drucker'),
('B0056/A', '3D Drucker'),
('B0055/A', '3D Drucker'),
('B0054/A', '3D Drucker'),
('B0053/A', 'B0052/A'),
('B0053/A', 'B0052/A'),
('B0052/A', 'B0054/A'),
('B0051/A', 'B0054/A'),
('B0050/A', 'B0054/A'),
('B0049/A', 'B0060/A'),
('B0049/A', 'B0060/A'),
('B0049/A', 'B0060/A'),
('B0049/A', 'B0059/A'),
('B0049/A', 'B0059/A'),
('B0049/A', 'B0052/A'),
('B0049/A', 'B0051/A'),
('B0049/A', 'B0051/A'),
('B0049/A', 'B0050/A'),
('B0049/A', 'B0050/A'),
('B0048/A', '3D Drucker'),
('B0047/A', 'B0048/A'),
('B0046/A', 'B0047/A'),
('B0046/A', 'B0047/A'),
('B0046/A', 'B0047/A'),
('B0046/A', 'B0047/A'),
('B0045/A', 'B0067/A'),
('B0045/A', 'B0067/A'),
('B0045/A', 'B0065/A'),
('B0045/A', 'B0065/A'),
('B0045/A', 'B0063/A'),
('B0045/A', 'B0060/A'),
('B0045/A', 'B0060/A'),
('B0045/A', 'B0060/A'),
('B0045/A', 'B0059/A'),
('B0045/A', 'B0059/A'),
('B0045/A', 'B0059/A'),
('B0045/A', 'B0059/A'),
('B0045/A', 'B0058/A'),
('B0045/A', 'B0058/A'),
('B0045/A', 'B0058/A'),
('B0045/A', 'B0052/A'),
('B0045/A', 'B0052/A'),
('B0045/A', 'B0052/A'),
('B0045/A', 'B0052/A'),
('B0045/A', 'B0052/A'),
('B0045/A', 'B0051/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0045/A', 'B0047/A'),
('B0044/A', 'B0063/A'),
('B0044/A', 'B0063/A'),
('B0044/A', 'B0047/A'),
('B0044/A', 'B0047/A'),
('B0044/A', 'B0047/A'),
('B0044/A', 'B0047/A'),
('B0043/A', 'B0067/A'),
('B0043/A', 'B0067/A'),
('B0043/A', 'B0065/A'),
('B0043/A', 'B0065/A'),
('B0043/A', 'B0061/A'),
('B0043/A', 'B0061/A'),
('B0043/A', 'B0061/A'),
('B0043/A', 'B0052/A'),
('B0043/A', 'B0052/A'),
('B0043/A', 'B0052/A'),
('B0043/A', 'B0052/A'),
('B0043/A', 'B0042/A'),
('B0043/A', 'B0042/A'),
('B0043/A', '3D Drucker'),
('B0042/A', 'B0047/A'),
('B0042/A', 'B0047/A'),
('B0041/A', 'B0040/A'),
('B0040/A', 'B0047/A'),
('B0040/A', 'B0047/A'),
('B0040/A', 'B0047/A'),
('B0040/A', 'B0047/A'),
('B0039/A', 'B0038/A'),
('B0039/A', 'B0038/A'),
('B0038/A', 'B0048/A'),
('B0037/A', '3D Drucker'),
('B0036/A', 'B0035/A'),
('B0036/A', 'B0035/A'),
('B0035/A', '3D Drucker'),
('B0034/A', 'B0068/A'),
('B0034/A', 'B0068/A'),
('B0034/A', 'B0068/A'),
('B0034/A', 'B0068/A'),
('B0034/A', 'B0047/A'),
('B0034/A', 'B0037/A'),
('B0034/A', 'B0037/A'),
('B0034/A', 'B0033/A'),
('B0034/A', 'B0033/A'),
('B0034/A', 'B0033/A'),
('B0034/A', 'B0033/A'),
('B0033/A', '3D Drucker'),
('B0033/A', '3D Drucker'),
('B0032/A', '3D Drucker'),
('B0032/A', '3D Drucker'),
('B0031/A', '3D Drucker'),
('B0031/A', '3D Drucker'),
('B0031/A', '3D Drucker'),
('B0031/A', '3D Drucker'),
('B0030/A', '3D Drucker'),
('B0030/A', '3D Drucker'),
('B0030/A', '3D Drucker'),
('B0030/A', '3D Drucker'),
('B0029/A', '3D Drucker'),
('B0029/A', '3D Drucker'),
('B0028/A', 'B0068/A'),
('B0028/A', 'B0068/A'),
('B0028/A', 'B0059/A'),
('B0028/A', 'B0059/A'),
('B0028/A', 'B0058/A'),
('B0028/A', 'B0058/A'),
('B0028/A', 'B0058/A'),
('B0028/A', 'B0056/A'),
('B0028/A', 'B0056/A'),
('B0028/A', 'B0056/A'),
('B0028/A', 'B0055/A'),
('B0028/A', 'B0055/A'),
('B0028/A', 'B0055/A'),
('B0028/A', 'B0039/A'),
('B0028/A', 'B0039/A'),
('B0028/A', 'B0036/A'),
('B0028/A', 'B0036/A'),
('B0028/A', 'B0033/A'),
('B0028/A', 'B0033/A'),
('B0028/A', 'B0033/A'),
('B0028/A', 'B0033/A'),
('B0028/A', 'B0032/A'),
('B0028/A', 'B0032/A'),
('B0028/A', 'B0031/A'),
('B0028/A', 'B0031/A'),
('B0028/A', 'B0031/A'),
('B0028/A', 'B0031/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0029/A'),
('B0028/A', 'B0027/A'),
('B0028/A', 'B0027/A'),
('B0028/A', 'B0027/A'),
('B0028/A', 'B0027/A'),
('B0028/A', 'B0027/A'),
('B0028/A', 'B0027/A'),
('B0028/A', 'B0027/A'),
('B0028/A', 'B0027/A'),
('B0028/A', 'B0027/A'),
('B0028/A', 'B0027/A'),
('B0027/A', '3D Drucker'),
('B0027/A', '3D Drucker'),
('B0025/A', 'B0061/A'),
('B0024/A', 'B0063/A'),
('B0024/A', 'B0059/A'),
('B0023/A', 'B0055/A'),
('B0022/A', 'B0067/A'),
('B0022/A', 'B0060/A'),
('B0021/A', 'B0057/A'),
('B0020/A', 'B0057/A');


INSERT INTO Fertigungsdaten (Artikelnummer, Bearbeitungsdauer)
VALUES 
  ('0131', 123), ('0183', 23), ('0103', 500), ('0130', 341), ('0133', 845), ('0160', 34), ('0188', 9), ('0022', 50), ('0025', 10933), ('0030', 894), 
  ('0131', 150), ('0183', 24), ('0103', 505), ('0130', 340), ('0133', 850), ('0160', 32), ('0188', 10), ('0022', 51), ('0025', 11001), ('0030', 902),
  ('0131', 130), ('0183', 23), ('0103', 500), ('0130', 342), ('0133', 840), ('0160', 34), ('0188', 8), ('0022', 52), ('0025', 10901), ('0030', 891), 
  ('0131', 105), ('0183', 23), ('0103', 501), ('0130', 340), ('0133', 843), ('0160', 34), ('0188', 9), ('0022', 53), ('0025', 10980), ('0030', 899), 
  ('0131', 180), ('0183', 25), ('0103', 497), ('0130', 341), ('0133', 851), ('0160', 32), ('0188', 8), ('0022', 54), ('0025', 10979), ('0030', 898), 
  ('0131', 145), ('0183', 23), ('0103', 502), ('0130', 339), ('0133', 848), ('0160', 34), ('0188', 9), ('0022', 50), ('0025', 10945), ('0030', 882), 
  ('0131', 124), ('0183', 22), ('0103', 492), ('0130', 348), ('0133', 847), ('0160', 32), ('0188', 10), ('0022', 51), ('0025', 10873), ('0030', 899);
  