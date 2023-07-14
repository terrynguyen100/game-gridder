import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { generateTemplateAreas } from './helpers/helpers';

import "./../../sass/tournament.scss"
import top_match_down from './svg_files/top_match_down';
import bottom_match_up from './svg_files/bottom_match_up';
import connector from './svg_files/connector';
import straight_line from './svg_files/straight_line';
import Bracket from './Bracket';

const Tournament = () => {
  const [tournament, setTournament] = useState(null);
  const [tournamentDate, setTournamentDate] = useState("");
  const [numOfRounds, setNumOfRounds] = useState(0);
  const [numOfPlayers, setNumOfPlayers] = useState(0);
  const [bracketStyle, setBracketStyle] = useState({});
  const [bracketWidth, setBracketWidth] = useState('100%');

  let tournamentID = useParams();

  // Need proper cleanup to work in this file, otherwise app crashes from too many requests
  useEffect(() => {
    setData()
  }, [numOfPlayers])


  const setData = async() => {
    const tempData = await axios.get(`/tournaments/${tournamentID.id}`)

        setTournament(tempData.data)
        if(tempData.data.matches.length === 0) setNumOfPlayers([].length)
        const getPlayerNums = tempData.data.matches.reduce((ac, cv) => {
          if(cv.players.length === 0) return ac
          if(!ac.includes(cv.players[0].player_name)) ac.push(cv.players[0]?.player_name)
          if(!ac.includes(cv.players[1].player_name)) ac.push(cv.players[1]?.player_name)
          return ac
        }, [])
        setNumOfPlayers(getPlayerNums.length);

        setTournamentDate(`${new Date(tempData.data.start_date).toString().slice(0, 16)} at ${new Date(tempData.data.start_date).toString().slice(16, 28)}`)


        //Determine how many rounds there will be
        if(numOfPlayers !== 0) {
          const numOfRoundsHolder = Math.ceil(Math.log2(numOfPlayers));
          setNumOfRounds(numOfRoundsHolder);
        }

        if( numOfPlayers < 8) {
          setBracketWidth({
            width: "50%"
          })
        } else if ( numOfPlayers < 16) {
          setBracketWidth({
            width: "75%"
          })
        } else if ( numOfPlayers < 32) {
          setBracketWidth({
            width: "90%"
          })
        }
  }

  const bs = {
    display: "grid",
    gridTemplateRows: `repeat(${numOfPlayers - 1}, 60px)`,
    gridTemplateColumns: `repeat(${(2 * numOfRounds) + (numOfRounds - 1)}, 1fr)`,
    gridTemplateAreas: generateTemplateAreas(numOfPlayers, numOfRounds),
    justifyContent: "center",
    alignItems: "stretch"
  };


  if (tournament !== null && numOfRounds !== 0) {
  return (
    <div key={tournament.id}>
      <div id="tournament-info">
        <h1 className="title">{tournament.name}</h1>
        <div className="tournament-stats">
          <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", color: "#FFF"}}>
            <PersonIcon sx={{mr: 1.5}}/> 
            <span>{numOfPlayers}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", color: "#FFF"}}>
            <EmojiEventsIcon sx={{ mx: 1.5 }} />
            <span>{numOfPlayers}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", color: "#FFF"}}>
            <VideogameAssetIcon sx={{mx: 1.5}}/>
            <span>{tournament.game_name}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", color: "#FFF"}}>
          <CalendarMonthIcon sx={{mx: 1.5}}/> 
            <span>{tournamentDate}</span>
          </Typography>
        </div>
      </div>

      <Bracket bs={bs} bracketWidth={bracketWidth} tournament={tournament} numOfPlayers={numOfPlayers} numOfRounds={numOfRounds}/>
      
    </div>
  )
}
}

export default Tournament;