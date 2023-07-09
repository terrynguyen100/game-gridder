const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get all tournaments
const getTournaments = () => {
  const query = `SELECT * FROM tournaments;`;

  return db.query(query)
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

//Get a tournament from tournamentId. Requires tournamentId => return tournament row.
const getTournamentById = (tournamentId) => {
  const query = `SELECT * FROM tournaments 
     WHERE id = $1;`;

  return db.query(query, [tournamentId])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//Get all tournaments that match a category. Requires tournamentCategory => return tournament row.
const getTournamentsByCategory = (tournamentCategory) => {
  const query = `SELECT tournaments.* FROM tournaments 
    JOIN categories ON categories.id = tournaments.category_id 
    WHERE lower(categories.name) = lower($1);`;

  return db.query(query, [tournamentCategory])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//Get all tournaments that are like a name. Requires tournamentName => return tournament row.
const getTournamentsByName = (tournamentName) => {
  const query = `SELECT * FROM tournaments 
    WHERE lower(name) Like lower('%$1%');`;

  return db.query(query, [tournamentName])
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

//Get all tournaments that are like a name OR category. Requires tournament object => returns tournaments rows.
// Requires a tournament object {name, category}
const getTournamentsByNameOrCategory = (tournament) => {
  const query = `SELECT tournaments.*, categories.name AS category_name FROM tournaments 
    JOIN categories ON categories.id = tournaments.category_id 
    WHERE lower(tournaments.name) LIKE lower('%$1%') OR lower(categories.name) LIKE lower('%$2%');`;

  return db.query(query, [tournament.name, tournament.category])
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a new tournament.
// Requires a tournament object {organizer_id, category_id, name, start_date, status, description, private}
const addTournament = (tournament) => {
  const query = `INSERT INTO 
    tournaments (organizer_id, category_id, name, start_date, status, description, private) 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  return db.query(query, [tournament.organizerId, tournament.categoryId, tournament.name, tournament.startDate, tournament.status, tournament.description, tournament.private])
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

//---------------------------------------------Update QUERIES---------------------------------------
// Update a tournament.
const updateTournament = (tournament) => {
  const query = `UPDATE tournaments 
    SET organizer_id = $2, category_id = $3, name = $4, start_date = $5, status = $6, description = $7, private = $8
    WHERE id = $1 RETURNING *;`;

  return db.query(query, [tournament.id, tournament.organizerId, tournament.categoryId, tournament.name, tournament.startDate, tournament.status, tournament.description, tournament.private])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};


//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a tournament from an id. Requires an id.
const deleteTournament = (tournamentId) => {
  const query = `DELETE FROM tournaments WHERE id = $1;`;

  return db.query(query, [tournamentId])
    .then(() => console.log('Tournament deleted'))
    .catch(err => console.log(err.message));
};

module.exports = {
  getTournaments,
  getTournamentById,
  getTournamentsByCategory,
  getTournamentsByName,
  getTournamentsByNameOrCategory,
  addTournament,
  updateTournament,
  deleteTournament,
};