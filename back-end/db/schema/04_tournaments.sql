DROP TABLE IF EXISTS tournaments CASCADE;

CREATE TABLE tournaments (
  id SERIAL PRIMARY KEY NOT NULL
  organizer_id REFERENCES users(id) ON DELETE CASCADE
  category_id REFERENCES categories(id) ON DELETE CASCADE
  name VARCHAR(50) NOT NULL
  start_date DATE NOT NULL
  status VARCHAR(50) NOT NULL
  description VARCHAR
  private BOOLEAN NOT NULL
);