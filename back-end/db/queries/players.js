const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
//Get all players associated with a match. Requires matchId => returns player rows.
const getPlayersByMatchId = (matchId) => {
  const query = `SELECT * FROM players 
    WHERE match_id = $1;`;

  return db.query(query, [matchId])
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

const getPlayerByUserId = (userId) => {
  const query = `SELECT * FROM players 
    WHERE user_id = $1;`;

  return db.query(query, [userId])
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a new player.
// Requires a player object {user_id, match_id, player_name, score}
const addplayer = (player) => {
  const query = `INSERT INTO 
  players (user_id, match_id, player_name, score)
  VALUES ($1, $2, $3, $4);`;

  return db.query(query, [player.userId, player.matchId, player.playerName, player.score])
    .then(() => console.log("Player added"))
    .catch(err => console.log(err.message));

};

//---------------------------------------------Update QUERIES---------------------------------------
// Update a player.
// Requires a match object with any of the following values {user_id, match_id, player_name, score}.
const updatePlayer = (player) => {
  const query = `UPDATE players 
    SET user_id = $2, match_id = $3, player_name = $4, score = $5
    WHERE id = $1 RETURNING *;`;

  return db.query(query, [player.userId, player.matchId, player.playerName, player.score])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a player from an id. Requires an id.
const deletePlayer = (playerId) => {
  const query = `DELETE FROM players WHERE id = $1;`;

  return db.query(query, [playerId])
    .then(() => console.log('player deleted'))
    .catch(err => console.log(err.message));
};


module.exports = {
  getPlayersByMatchId,
  getPlayerByUserId,
  addplayer,
  updatePlayer,
  deletePlayer
};