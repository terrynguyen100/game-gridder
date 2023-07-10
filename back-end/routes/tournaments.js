const express = require('express');
const router = express.Router();


// SQL imports
const { getTournaments,
        getTournamentById,
        getTournamentsByCategory,
        getTournamentsByName,
        getTournamentsByNameOrCategory,
        addTournament,
        updateTournament,
        deleteTournament,
      } = require('../db/queries/tournaments.js');

const { getMatchesByTournamentId,
        addMatch
      } = require('../db/queries/matches.js');
const { getPlayersByMatchId,
        addPlayer
      } = require('../db/queries/players.js');

// ---- Routes -----

// GET all tournaments
router.get("/", (req, res) => {
  getTournaments()
    .then(tournaments => {
      // send the 'tournaments' back as JSON to the client
      res.json(tournaments); 
    })
    .catch(error => {
      console.error("Error fetching tournaments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// GET all tournaments by categoryName
router.get('/category', (req, res) => {
  const categoryName = req.body.categoryName;
  getTournamentsByCategory(categoryName)
    .then(tournaments => {
      res.json(tournaments);
    })
    .catch(error => {
      console.error("Error fetching tournaments by category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// GET 1 tournament by its id
router.get('/:id', (req, res) => {
  const tournamentId = req.params.id;
  
  // Get tournament and matches in parallel
  Promise.all([
    getTournamentById(tournamentId),
    getMatchesByTournamentId(tournamentId)
  ])
    .then(([tournament, matches]) => { // Destructure the results into two variables
      if (tournament) { 
        tournament.matches = []; // Inside `tournament`, initialize an empty array for matches

        // Using map, create an array of promises that will each resolve to an array of players
        // (since there are 2 players each match)
        const playerPromises = matches.map(match => {
          const matchId = match.id;
          return getPlayersByMatchId(matchId);
        });

        // Execute all player queries in parallel
        return Promise.all(playerPromises)
          .then(playersResults => {
            // Add `players` into their respective matches, inside the tournament object
            tournament.matches = matches.map((match, index) => {
              match.players = playersResults[index];
              return match;
            });

            res.json(tournament);
          });
      } else {
        res.status(404).json({ error: "Tournament not found" });
      }
    })
    .catch(error => {
      console.error("Error fetching tournament, matches, and players:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


// PATCH a tournament by its id
router.patch('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const tournamentId = req.params.id;

  // This also delete all matches and players associated with the tournament through ON DELETE CASCADE
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

// ADD/POST a new tournament
router.post('/', (req, res) => {
  const newTournament = req.body;
  const newMatches = req.body.matches;

  addTournament(newTournament)
    .then(createdTournament => {
      const matchPromises = newMatches.map(match => {
        // Add the newly created tournament_id to each match
        match.tournamentId = createdTournament.id; // ERROR: IT NEEDS TO BE tournament_id
        return addMatch(match)
          .then(createdMatch => {
            const playerPromises = match.players.map(player => {
              // Add the newly created match_id to each player
              player.matchId = createdMatch.id; // ERROR: IT NEEDS TO BE match_id
              return addPlayer(player);
            });
            return Promise.all(playerPromises)
              .then(playersResults => {
                createdMatch.players = playersResults; // Add players to the created match object
                return createdMatch;
              });
          });
      });

      return Promise.all(matchPromises)
        .then(matchesResults => {
          createdTournament.matches = matchesResults; // Add matches to the created tournament object
          res.status(201).json(createdTournament); // Return the updated tournament object with matches and players
        });
    })
    .catch(error => {
      console.error("Error creating tournament:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;