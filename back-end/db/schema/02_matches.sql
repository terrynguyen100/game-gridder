DROP TABLE IF EXISTS matches CASCADE;

CREATE TABLE matches (
  id SERIAL PRIMARY KEY NOT NULL
  tournament_id REFERENCES tournament(id) ON DELETE CASCADE
  start_time TIME
  start_date DATE
  location VARCHAR(50)
  notes VARCHAR
);