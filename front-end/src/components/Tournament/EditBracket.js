import { useState } from 'react'
import { Box, TextField, InputLabel, FormControl, Button } from "@mui/material";
import axios from 'axios'

const EditBracket = ({tournament, setTournament}) => {
  const [score, setScore] = useState([])

  //Add entered scores to score state
  const handleChange = (e, playerIndex, matchIndex) => {
  const newScore = [...score]
  if ( newScore[matchIndex] ) {
    newScore[matchIndex][playerIndex] = e.target.value
  } else {
    newScore[matchIndex] = {[playerIndex]: e.target.value }
  }
  setScore(newScore)
  }; 

  //Update tournament state with new scores
  const submitScores = async(i, match) => {
    const player1Id = match.players[0].id
    const player2Id = match.players[1].id
    const player1Score = Number(score[i][0])
    const player2Score = Number(score[i][1])

    await axios.patch(`/players/${player1Id}`, {score: player1Score})
    await axios.patch(`/players/${player2Id}`, {score: player2Score})

    //Update score in tournament state
    const newMatches = [...tournament.matches]
    newMatches[i].players[0].score = score[i][0];
    newMatches[i].players[1].score = score[i][1];
    setTournament(prev => {
      return{
        ...prev,
        matches: newMatches
      }
    })

    const winningPlayer = player1Score > player2Score ? {...match.players[0]} : {...match.players[1]}
    
    for(match in tournament.matches) {

      if (tournament.matches[match]?.players.length === 0 || tournament.matches[match]?.players.length === 1) {
        //Update tournament state  with new player
        //Reset user's score before updating state
        const newPlayers = [...tournament.matches]
        if(tournament.matches[match]?.players.length === 0){
          newPlayers[match].players[0] = winningPlayer;
          newPlayers[match].players[0].score = ''
        } else {
          newPlayers[match].players[1] = winningPlayer;
          newPlayers[match].players[1].score = ''
        }
        setTournament(prev => {
          return{
            ...prev,
            matches: newPlayers
          }
        })

        updateMatch(tournament.matches[match].id, winningPlayer)
        break
      }
    }
  }

  //Updates match database with winning user
  const updateMatch = async(match_id, winningPlayer) => {
    const player_name = winningPlayer.player_name
    await axios.post(`/players/`, {match_id, player_name})
  }

  return(
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        {tournament.matches.map((match, i) => {
          if(tournament.matches[i].players.length === 2) {
            return(
              <>
                <div className="name-score-container">
                  <div className="edit-name-score">
                    <div className="player">
                      <h1 className="edit-name">{match?.players[0]?.player_name}</h1>
                      <FormControl fullWidth  >
                        <TextField id="outlined-basic" name="0" label="Score" variant="outlined" onChange={(e) => handleChange(e, 0, i)} />
                      </FormControl>
                    </div>
  
                    <div className="player">
                      <h1 className="edit-name">{match?.players[1]?.player_name}</h1>
                      <FormControl fullWidth >
                        <TextField id="outlined-basic" name="1" label="Score" variant="outlined" onChange={(e) => handleChange(e, 1, i)} />
                      </FormControl>     
                    </div>
   
                  </div>
                  <Button variant="contained" onClick={() => submitScores(i, match)}>Submit</Button>
                </div>
              </>
            )
          }
        })}
      </Box>

    </>
  )
}

export default EditBracket