-- Platzhalter:
--   $login
UPDATE users SET admin = 1 WHERE login = $login;
