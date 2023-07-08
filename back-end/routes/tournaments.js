const express = require('express');
const router = express.Router();


// SQL imports
const { getTournaments,
        getTournamentById,
        getTournamentByCategory,
        getTournamentByName,
        getTournamentByNameOrCategory,
        addTournament,
        updateTournament,
        deleteTournament,
      } = require('../db/queries/tournaments.js');


// ---- Routes -----

// GET all tournaments
router.get("/", (req, res) => {
  getTournaments()
    .then(tournaments => {
      res.json(tournaments); 
    })
    .catch(error => {
      console.error("Error fetching tournaments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// GET 1 tournament by its id
router.get('/:id', (req, res) => {
  const tournamentId = req.params.id;
  
  getTournamentById(tournamentId)
    .then(tournament => {
      if (tournament) {
        res.json(tournament);
      } else {
        res.status(404).json({ error: "Tournament not found" });
      }
    })
    .catch(error => {
      console.error("Error fetching tournament:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// GET all tournaments by categoryId
router.get('/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;

  getTournamentByCategory(categoryId)
    .then(tournaments => {
      res.json(tournaments);
    })
    .catch(error => {
      console.error("Error fetching tournaments by category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// ADD/POST a new tournament
router.post('/tournaments', (req, res) => {
  const newTournament = req.body;

  addTournament(newTournament)
    .then(createdTournament => {
      res.status(201).json(createdTournament); 
    })
    .catch(error => {
      console.error("Error creating tournament:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


// PATCH a tournament by its id
router.patch('/tournaments/:id', (req, res) => {
  const updatedFields = req.body;

  updateTournament(updatedFields)
  .then(updatedTournament => {
    if (updatedTournament) {
      res.json(updatedTournament);
    } else {
      res.status(404).json({ error: "Tournament not found" });
    }
  })
  .catch(error => {
    console.error("Error updating tournament:", error);
    res.status(500).json({ error: "Internal Server Error" });
  });
});

// DELETE a tournament by its id
router.delete('/tournaments/:id', (req, res) => {
  const tournamentId = req.params.id;

  deleteTournament(tournamentId)
    .then(deletedTournament => {
      if (deletedTournament) {
        res.json({ message: "Tournament deleted successfully" });
      } else {
        res.status(404).json({ error: "Tournament not found" });
      }
    })
    .catch(error => {
      console.error("Error deleting tournament:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});




module.exports = router;