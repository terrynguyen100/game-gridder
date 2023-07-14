import { Container, Paper, Input, Button, Box, Card, Typography, Grid } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
const TournamentView = () => {
  // ------------------- State & Context -------------------
  const [rounds, setRounds] = useState([]);
  const {
    tourMatches, setTourMatches,
    tourParticipants, setTourParticipants,
  } = useContext(CreateTournamentContext);



  const fetchUserIdByUsername = async (username) => {
    const response = await axios.get(`/users/login/${username}`);
    return response.data.id;
  }

  const updateMatches = () => {

    const matchesArray = tourParticipants.reduce((acc, currentName, index) => {
      if (index % 2 === 0) {
        if (currentName.startsWith('@')){
          const id1 = fetchUserIdByUsername(currentName.slice(1));
          const id2 = fetchUserIdByUsername(tourParticipants[index + 1].slice(1));
          acc.push({ players: [{ player_name: currentName, }, { player_name: tourParticipants[index + 1] }] });
          acc.push({ players: [{ user_id: id1, }, { player_id: id2 }] }); 
        }
        else {
          acc.push({ players: [{ player_name: currentName, }, { player_name: tourParticipants[index + 1] }] });
        }
      }
      index++;
      console.log(acc);
      return acc;
    }, []);

    setTourMatches(matchesArray);
  };

  const updateRounds = (participantCount) => {
    const roundsNumber = Math.ceil(Math.log2(participantCount));
    const roundNames = Array.from({ length: roundsNumber }, (_, index) => {

      return `Round ${index + 1}`;
    });

    setRounds(roundNames);
  };

  useEffect(() => {
    updateMatches();
    updateRounds(tourParticipants.length);
  }, [tourParticipants]);

  return (
    <Box sx={{
      maxWidth: '100%',
      maxHeight: '100%',
      border: '1px solid black',
    }}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        {rounds.map((round, index) => (
          <Grid item xs={3} sm={3} md={12 / rounds.length} key={index} sx={{ border: '1px solid black', padding: '10px' }}>
            <Typography
              variant="h2"
              textAlign={'center'}
            >
              {round}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        {tourMatches.map((match, index) => (
          <Grid item xs={3} sm={3} md={12 / tourMatches.length} key={index} sx={{ border: '1px solid black' }}>
            {match.players.map((player, index1) => (
              <Typography
                variant="h2"
                textAlign={'center'}
                key={index1}
              > {player.player_name} </Typography>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>

  );
};

export default TournamentView;