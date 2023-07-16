const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
//Get all matches associated with a tournament. Requires tournamentId => return match rows.
const getMatchesByTournamentId = (tournament_id) => {
  const query = `SELECT * FROM matches 
    WHERE tournament_id = $1 
    ORDER BY id;`;

  return db.query(query, [tournament_id])
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

// Get a match from an id. Requires matchId => return match row.
const getMatchById = (match_id) => {
  const query = `SELECT * FROM matches
    WHERE id = $1;`;

  return db.query(query, [match_id])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a new match.
// Requires a match object {tournament_id, start_time, start_date, location, notes}
const addMatch = (match) => {
  const query = `INSERT INTO 
    matches (tournament_id, start_time, start_date, location, notes) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;

  return db.query(query, [match.tournament_id, match.start_time, match.start_date, match.location, match.notes])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------Update QUERIES---------------------------------------
// Update a match.
// Requires a match object with any of the following values {tournament_id, start_time, start_date, location, notes}
const updateMatch = (match) => {
  const query = `UPDATE matches 
    SET tournament_id = $2, start_time = $3, start_date = $4, location = $5, notes = $6 
    WHERE id = $1 
    RETURNING *;`;

  return db.query(query, [match.id, match.tournament_id, match.start_time, match.start_date, match.location, match.notes])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};


//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a match from an id. Requires an id.
const deleteMatch = (match_id) => {
  const query = `DELETE FROM matches WHERE id = $1;`;

  return db.query(query, [match_id])
    .then(() => 'Match deleted')
    .catch(err => console.log(err.message));
};

module.exports = {
  getMatchesByTournamentId,
  getMatchById,
  addMatch,
  updateMatch,
  deleteMatch
};