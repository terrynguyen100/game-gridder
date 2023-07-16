import { useState } from 'react'
import { Box, TextField, InputLabel, FormControl, Button } from "@mui/material";
import axios from 'axios'

const EditBracket = ({tournament, setTournament}) => {
  const [score, setScore] = useState([])

  const handleChange = (e, playerIndex, matchIndex) => {

  const newScore = [...score]
  if ( newScore[matchIndex] ) {
    newScore[matchIndex][playerIndex] = e.target.value
  } else {
    newScore[matchIndex] = {[playerIndex]: e.target.value }
  }
  setScore(newScore)


  }; 

  const submitScores = async(i, match) => {

    const player1Id = match.players[0].id
    const player2Id = match.players[1].id
    const player1Score = Number(score[i][0])
    const player2Score = Number(score[i][1])

    console.log("ids: ",player1Id, player2Id)
    console.log("scores: ",score[i][0], score[i][1])

    const updatedScore1 = await axios.patch(`/players/${player1Id}`, {score: player1Score})
    const updatedScore2 = await axios.patch(`/players/${player2Id}`, {score: player2Score})

    const newMatches = [...tournament.matches]
    newMatches[i].players[0].score = score[i][0];
    newMatches[i].players[1].score = score[i][1];
    setTournament(prev => {
      return{
        ...prev,
        matches: newMatches
      }
    })
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
          return(
            <>
              <div className="name-score-container">
                <div className="edit-name-score">
                  <div className="player">
                    <h1 className="edit-name">{match?.players[0]?.player_name}</h1>
                    <FormControl fullWidth >
                      <TextField id="outlined-basic" name="0" label="Score" variant="outlined" onChange={(e) => handleChange(e, 0, i)}/>
                    </FormControl>
                  </div>

                  <span>Vs.</span>

                  <div className="player">
                    <h1 className="edit-name">{match?.players[1]?.player_name}</h1>
                    <FormControl fullWidth >
                      <TextField id="outlined-basic" name="1" label="Score" variant="outlined" onChange={(e) => handleChange(e, 1, i)}/>
                    </FormControl>     
                  </div>
 
                </div>
                <Button variant="contained" onClick={() => submitScores(i, match)}>Submit</Button>
              </div>
            </>
          )
        })}
      </Box>

    </>
  )
}

export default EditBracket