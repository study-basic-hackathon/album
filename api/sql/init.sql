CREATE TABLE IF NOT EXISTS dog (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  birthday DATE,
  gender VARCHAR(10),
  description TEXT
);
