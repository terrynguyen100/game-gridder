const express = require('express');
const router = express.Router();

// SQL imports
const {
  getPlayersByMatchId,
  getPlayerByUserId,
  addPlayer,
  updatePlayer,
  deletePlayer,
  updatePlayerScore
} = require('../db/queries/players.js');

// ---- Routes -----

// GET players by match ID
router.get('/match/:matchId', (req, res) => {
  const matchId = req.params.matchId;

  getPlayersByMatchId(matchId)
    .then(players => {
      res.json(players);
    })
    .catch(error => {
      console.error("Error fetching players by match ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// GET player by user ID
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;

  getPlayerByUserId(userId)
    .then(player => {
      if (player) {
        res.json(player);
      } else {
        res.status(404).json({ error: "Player not found" });
      }
    })
    .catch(error => {
      console.error("Error fetching player by user ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// ADD/POST a new player
router.post('/', (req, res) => {
  const newPlayer = req.body;

  addPlayer(newPlayer)
    .then(createdPlayer => {
      res.status(201).json(createdPlayer);
    })
    .catch(error => {
      console.error("Error adding player:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// PUT: Update all field of a player
router.put('/:playerId', (req, res) => {
  const updatedPlayer = req.body;
  updatedPlayer.id = req.params.playerId;

  updatePlayer(updatedPlayer)
    .then(player => {
      if (player) {
        res.json(player);
      } else {
        res.status(404).json({ error: "Player not found" });
      }
    })
    .catch(error => {
      console.error("Error updating player:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// PATCH: Update only the score of a player
router.patch('/:playerId', (req, res) => {
  const updatedPlayer = req.body;
  updatedPlayer.id = req.params.playerId;

  updatePlayerScore(updatedPlayer)
    .then(player => {
      if (player) {
        res.json(player);
      } else {
        res.status(404).json({ error: "Player not found" });
      }
    })
    .catch(error => {
      console.error("Error updating player:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


// DELETE a player
router.delete('/:playerId', (req, res) => {
  const playerId = req.params.playerId;

  deletePlayer(playerId)
    .then(() => {
      res.json({ message: "Player deleted successfully" });
    })
    .catch(error => {
      console.error("Error deleting player:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
