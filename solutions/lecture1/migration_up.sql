CREATE TABLE users (
  login text PRIMARY KEY,
  hashedpassword text,
  admin BOOLEAN DEFAULT 0
);


-- One does not store passwords in plaintext. That's why it is 
-- cryptographically hashed. The following hash+salt equates to "admin"
-- in plaintext.
INSERT INTO users (login, admin, hashedpassword)
  VALUES ('admin', 1, 'pbkdf2$10000$c131a16168ddbe67af444eb86dd7e059396a0af15cfbdda7384cc7deb2a9cd979f142398bae34b1fb99eddc2238230e1594c112b3386005b8ff54149a948e383$df958fc7f2b9bb28e801cc1f03c22227de30ad6dc6faddc04e5ba02f292cf2e3b2da3dc6be95bc02473508096bb140f0fec0b26a223fcde3b4bbce831030345e');
