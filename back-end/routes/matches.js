const express = require('express');
const router = express.Router();

// SQL imports
const {
  getMatchesByTournament,
  getMatchById,
  addMatch,
  updateMatch,
  deleteMatch
} = require('../db/queries/matches.js');

// ---- Routes -----

// // GET matches by tournament
// router.get('/tournament/:tournamentId', (req, res) => {
//   const tournamentId = req.params.tournamentId;

//   getMatchesByTournament(tournamentId)
//     .then(matches => {
//       res.json(matches);
//     })
//     .catch(error => {
//       console.error("Error fetching matches by tournament:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// });

// GET match by ID
router.get('/:matchId', (req, res) => {
  const matchId = req.params.matchId;

  getMatchById(matchId)
    .then(match => {
      if (match) {
        res.json(match);
      } else {
        res.status(404).json({ error: "Match not found" });
      }
    })
    .catch(error => {
      console.error("Error fetching match:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// ADD/POST a new match
router.post('/create', (req, res) => {
  const newMatch = req.body;

  addMatch(newMatch)
    .then(createdMatch => {
      res.status(201).json(createdMatch);
    })
    .catch(error => {
      console.error("Error adding match:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// PATCH/UPDATE a match by ID
router.patch('/:matchId', (req, res) => {
  const matchId = req.params.matchId;
  const updatedMatch = req.body;

  updateMatch({ id: matchId, ...updatedMatch })
    .then(match => {
      if (match) {
        res.json(match);
      } else {
        res.status(404).json({ error: "Match not found" });
      }
    })
    .catch(error => {
      console.error("Error updating match:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// DELETE a match by ID
router.delete('/:matchId', (req, res) => {
  const matchId = req.params.matchId;

  deleteMatch(matchId)
    .then(() => {
      res.json({ message: "Match deleted successfully" });
    })
    .catch(error => {
      console.error("Error deleting match:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
