-- Platzhalter:
--   $login
-- Rückgabgeformat
--   (hashedpassword)
SELECT hashedpassword 
  FROM users 
  WHERE login = $login;
