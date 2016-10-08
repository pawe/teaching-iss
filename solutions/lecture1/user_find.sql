-- Platzhalter:
--   $login
-- Rückgabeformat:
--   (login, admin)
SELECT login, admin 
  FROM users 
  WHERE login = $login;
