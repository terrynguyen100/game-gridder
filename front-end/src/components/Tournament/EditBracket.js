import { useState } from 'react'
import { Box, TextField, FormControl, Button } from "@mui/material";
import BracketGridStyle from './helpers/bracketGridStyle';
import axios from 'axios'

const EditBracket = ({tournament, setTournament, numOfPlayers}) => {
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

  const {bs, bracketWidth, numOfRounds, numOfMatches} = BracketGridStyle(numOfPlayers)

  console.log("bs: ",bs)
  return(
    <div className="edit-container">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 0.25, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{...bracketWidth, ...bs, margin:"auto"}}>
          {tournament.matches.map((match, i) => {
            if(tournament.matches[i].players.length === 2) {
              return(
                <>
                  <div class="names" style={{gridArea: `name-${i + 1}`}}>
                    <h1 className="edit-name" style={{gridArea: `name-${i + 1}`}}>{match?.players[0]?.player_name}</h1>
                    <h1 className="edit-name" style={{gridArea: `name-${i + 1}`}}>{match?.players[1]?.player_name}</h1>
                  </div>
                 
                  <div className="name-score-container" style={{gridArea: `game-${i + 1}`}}>
                    <div className="edit-name-score">
                      <div className="player">
                        <FormControl fullWidth  >
                          <TextField 
                            id="outlined-basic" 
                            name="0" label="Score" 
                            variant="outlined" 
                            onChange={(e) => handleChange(e, 0, i)} 
                            sx={{"& .MuiInputLabel-root": {color: 'white'},
                              "& .MuiOutlinedInput-root": {
                              "& > fieldset": { borderColor: "#5E6772" }},
                              input: { color: 'white' }
                            }}

                          />
                        </FormControl>
                      </div>
    
                      <div className="player">
                        <FormControl fullWidth >
                          <TextField 
                            id="outlined-basic" 
                            name="1" 
                            label="Score" 
                            variant="outlined" 
                            onChange={(e) => handleChange(e, 1, i)} 
                            sx={{"& .MuiInputLabel-root": {color: 'white'},
                              "& .MuiOutlinedInput-root": {
                              "& > fieldset": { borderColor: "#5E6772" }},
                              input: { color: 'white' }
                            }}
                          />
                        </FormControl>     
                      </div>
    
                    </div>
                    <Button variant="contained" onClick={() => submitScores(i, match)}>Submit</Button>
                  </div>
                </>
              )
            }
          })}
        </div>
      </Box>

    </div>
  )
}

export default EditBracket