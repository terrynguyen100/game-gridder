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

    // console.log(tournament)
    console.log("match: ",match)
    console.log("index: ",i)
    const winningPlayer = player1Score > player2Score ? {...match.players[0]} : {...match.players[1]}


      const newPlayers = [...tournament.matches]
      if(numOfPlayers === 4) {
          if(i === 0 ){
            newPlayers[2].players[0] = winningPlayer;
            newPlayers[2].players[0].score = ''
            pushPlayerToNextRound(tournament.matches[i].id, winningPlayer)
          } else {
            newPlayers[2].players[1] = winningPlayer;
            newPlayers[2].players[1].score = ''
            pushPlayerToNextRound(tournament.matches[i].id, winningPlayer)
          }
      } else if (numOfPlayers === 8) {
        if(i === 0 ){
          newPlayers[4].players[0] = winningPlayer;
          newPlayers[4].players[0].score = ''
          pushPlayerToNextRound(tournament.matches[i].id, winningPlayer)
        } else if (i === 1) {
          newPlayers[4].players[1] = winningPlayer;
          newPlayers[4].players[1].score = ''
          pushPlayerToNextRound(tournament.matches[i].id, winningPlayer)
        } else if (i === 2) {
          newPlayers[5].players[0] = winningPlayer;
          newPlayers[5].players[0].score = ''
          pushPlayerToNextRound(tournament.matches[i].id, winningPlayer)
        } else if (i === 3) {
          newPlayers[5].players[1] = winningPlayer;
          newPlayers[5].players[1].score = ''
          pushPlayerToNextRound(tournament.matches[i].id, winningPlayer)
        } else if (i === 4) {
          newPlayers[6].players[0] = winningPlayer;
          newPlayers[6].players[0].score = ''
          pushPlayerToNextRound(tournament.matches[i].id, winningPlayer)
        } else if (i === 5) {
          newPlayers[6].players[1] = winningPlayer;
          newPlayers[6].players[1].score = ''
          pushPlayerToNextRound(tournament.matches[i].id, winningPlayer)
        }
      }

  }
  
  //Updates match database with winning user
  const pushPlayerToNextRound = async(match_id, winningPlayer) => {
    const player_name = winningPlayer.player_name
    const player_id = winningPlayer.id
    await axios.patch(`/players/${player_id}`, {match_id, player_name})
  }

  const updateScoresForMatch = async(match_id, winningPlayer, losingPlayer) => {
    const players = [winningPlayer.player_name, losingPlayer.player_name]
    for(let player_name of players) {
      await axios.patch(`/players/`, {match_id, player_name})
    }
  }

  const {bs, bracketWidth} = BracketGridStyle(numOfPlayers)

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
                            id="outlined-static" 
                            name="0" 
                            label={"Score"}
                            value={match?.players[0]?.score}
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
                            id="outlined-static" 
                            name="1" 
                            label={"Score"}
                            value={match?.players[1]?.score}
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