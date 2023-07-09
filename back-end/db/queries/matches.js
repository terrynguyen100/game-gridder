const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
//Get all matches associated with a tournament. Requires tournamentId => return match rows.
const getMatchesByTournament = (tournamentId) => {
  const query = `SELECT * FROM matches 
    WHERE tournament_id = $1;`;

  return db.query(query, [tournamentId])
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

// Get a match from an id. Requires matchId => return match row.
const getMatchById = (matchId) => {
  const query = `SELECT * FROM matches
    WHERE id = $1;`;

  return db.query(query, [matchId])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a new match.
// Requires a match object {tournament_id, start_time, start_date, location, notes}
const addMatch = (match) => {
  const query = `INSERT INTO 
    matches (tournament_id, start_time, start_date, location, notes) 
    VALUES ($1, $2, $3, $4, $5);`;

  return db.query(query, [match.tournamentId, match.startTime, match.startDate, match.location, match.notes])
    .then(() => console.log('Match added'))
    .catch(err => console.log(err.message));
};

//---------------------------------------------Update QUERIES---------------------------------------
// Update a match.
//Requires a match object with any of the following values {tournament_id, start_time, start_date, location, notes}
const updateMatch = (match) => {
  const query = `UPDATE matches 
    SET tournament_id = $2, start_time = $3, start_date = $4, location = $5, notes = $6 
    WHERE id = $1 RETURNING *;`;

  return db.query(query, [match.id, match.tournamentId, match.startTime, match.startDate, match.location, match.notes])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};


//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a match from an id. Requires an id.
const deleteMatch = (matchId) => {
  const query = `DELETE FROM matches WHERE id = $1`;

  return db.query(query, [matchId])
    .then(() => console.log('Match deleted'))
    .catch(err => console.log(err.message));
};

module.exports = {
  getMatchesByTournament,
  getMatchById,
  addMatch,
  updateMatch,
  deleteMatch
};