const express = require('express');
const router = express.Router();


// SQL imports
const { getTournaments,
  getTournamentById,
  getTournamentsByCategory,
  getTournamentsByOrganizerId,
  getTournamentsByName,
  getTournamentsByNameOrCategory,
  addTournament,
  updateTournament,
  deleteTournament,
  getCompleteTournamentById,
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

// GET all tournaments by organizerId
router.get('/users/:id', (req, res) => {
  const organizerId = req.params.id;

  getTournamentsByOrganizerId(organizerId)
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
        tournament.matches = matches; // Inside `tournament`, initialize an empty array for matches

        // Using map, create an array of promises that will each resolve to an array of players
        // (since there are 2 players each match)
        const playerPromises = tournament.matches.map(match => {
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
            // Since the promises are executed in parallel, the matches are not in order
            // Sort the matches by id
            tournament.matches.sort((a, b) => a.id - b.id);
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

// PUT a tournament by its id
router.put('/:id', (req, res) => {
  const tournament = req.body;
  tournament.id = req.params.id;

  console.log(tournament);
  updateTournament(tournament)
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
router.post('/create', (req, res) => {
  const newTournament = req.body;
  const newMatches = req.body.matches;
  addTournament(newTournament)
    .then(createdTournament => {
      // create promises for each match of the first round
      const newTourId = createdTournament.id;
      const matchPromises = newMatches.map(match => {
        match.tournament_id = newTourId;
        return addMatch(match);
      });

      // create promises for each match of the other rounds
      const futureMatchPromises = [];
      const numFutureMatch = newMatches.length - 1;
      for (let i = 0; i < numFutureMatch; i++) {
        const futureMatch = { tournament_id: newTourId };
        futureMatch.players = [{ player_name: 'TBD' }, { player_name: 'TBD' }];
        newMatches.push(futureMatch);
        futureMatchPromises.push(addMatch(futureMatch));
      }

      // execute all promises in parallel
      Promise.all([...matchPromises, ...futureMatchPromises])
        .then(createdMatches => {
          // sort the matches by id
          createdMatches.sort((a, b) => a.id - b.id);
          // add created matches to the created tournament
          createdTournament.matches = createdMatches;
          // create promises for all the players in all matches of the first round
          const allPlayersPromises = newMatches.map((match, index) => {
            const matchId = createdMatches[index].id;
            match.players[0].match_id = matchId;
            match.players[1].match_id = matchId;

            // Need to add player[0] before player[1] to prevent switching their positions 
            return addPlayer(match.players[0])
              .then(createdPlayer1 => {
                createdTournament.matches[index].players = [createdPlayer1];
                return addPlayer(match.players[1]);
              })
              .then(createdPlayer2 => {
                createdTournament.matches[index].players.push(createdPlayer2);
              });
          });

          Promise.all(allPlayersPromises)
            .then(() => {
              res.json(createdTournament);
            })
            .catch(error => {
              console.error("Error adding players:", error);
              res.status(500).json({ error: "Internal Server Error" });
            });
        })
        .catch(error => {
          console.error("Error creating matches:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch(error => {
      console.error("Error creating tournament:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;