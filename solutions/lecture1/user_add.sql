-- Platzhalter:
--   $login
--   $hashedpassword
INSERT INTO users(login, hashedpassword) 
    VALUES ($login, $hashedpassword);
