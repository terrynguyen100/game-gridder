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
    let isMounted = true;
    axios.get(`/tournaments/${tournamentID.id}`)
    .then((response) => {
      if (isMounted) {
      setTournament(response.data)
      if(response.data.matches.length === 0) setNumOfPlayers([].length)
    const getPlayerNums = response.data.matches.reduce((ac, cv) => {
      if(cv.players.length === 0) return ac
      if(!ac.includes(cv.players[0].player_name)) ac.push(cv.players[0]?.player_name)
      if(!ac.includes(cv.players[1].player_name)) ac.push(cv.players[1]?.player_name)
      return ac
    }, [])
    setNumOfPlayers(getPlayerNums.length);

    setTournamentDate(`${new Date(response.data.start_date).toString().slice(0, 16)} at ${new Date(response.data.start_date).toString().slice(16, 28)}`)

    //Determine how many rounds there will be
    while (Math.pow(2, numOfRounds) < numOfPlayers) setNumOfRounds((prev) => prev + 1);
  
    // This is not spreading properly on line 111. If spread operator is used, all matches are stacked on top of each other. Put it inside useEffect since it needs the numOfPlayers and numOfRounds and the API call needs to happen before those can be defined.
      setBracketStyle({
      display: "grid",
      gridTemplateRows: `repeat(${numOfPlayers - 1}, 60px)`,
      gridTemplateColumns: `repeat(${(2 * numOfRounds) + (numOfRounds - 1)}, 1fr)`,
      gridTemplateAreas: generateTemplateAreas(numOfPlayers, numOfRounds),
      justifyContent: "center",
      alignItems: "stretch"
    });
  
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
    }})

    return () => {
      isMounted = false;
    };
  }, [])


  if (tournament !== null) {
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

      <div id="tournament-bracket">
        {/* <div id="tournament-rounds">
          {[...Array(numOfRounds)].map((e, i) => 
              <div className="round-details" key={i}>Round {i + 1}<div className="date" backgroundColor="red">{new Date(tournament.start_date).toString().slice(0, 10)}</div></div>
          )}
        </div> */}

        <div id="tournament-games" style={{bracketStyle, ...bracketWidth, margin:"4rem auto",}}>
          
          {tournament.matches.map((match, i) => {
            if(i < numOfPlayers / 2) {
              return(

                <div className={`round-1 game-${i + 1}`} style={{gridArea: `game-${i + 1}`}} key={i}>
                  <section className="bracket">
                    <div className="container">
                      <div className="split split-one">
                        <div className="round round-one current">
                          <ul className="matchup">
                            <li className="team team-top">{match.players[0].player_name}<span className="score">{match.players[0].score}</span></li>
                            <li className="team team-bottom">{match.players[1].player_name}<span className="score">{match.players[1].score}</span></li>
                          </ul>
                        </div>  
                      </div>  
                    </div>  
                  </section >
                </div>

              )
            }

            if(i >= numOfPlayers / 2 && i < (numOfPlayers - numOfPlayers / 4)) {

              return(
              <>
                <div className="top_match_down" style={{gridArea:`top_match_down-${i}`}}>
                  {top_match_down(numOfRounds)}
                </div>
                <div className="bottom_match_up" style={{gridArea:`bottom_match_up-${i}`}}>
                  {bottom_match_up(numOfRounds)}
                </div>
                <div className="connector" style={{gridArea:`connector-${i}`}}>
                  {connector(numOfRounds)}
                </div>

                <div className={`round-2 game-${i + 1}`} key={i} style={{gridArea: `game-${i + 1}`}}>
                  <section className="bracket">
                    <div className="container">
                      <div className="split split-one">
                        <div className="round round-one current">
                          <ul className="matchup">
                            <li className="team team-top">{match.players[0].player_name}<span className="score">{match.players[0].score}</span></li>
                            <li className="team team-bottom">{match.players[1].player_name}<span className="score">{match.players[1].score}</span></li>
                          </ul>
                        </div>  
                      </div>  
                    </div>  
                  </section >
                </div>

              </>
              )
            }

            if(i >= (numOfPlayers - numOfPlayers / 4) && i < (numOfPlayers - numOfPlayers / 8)) {
              return(
              <>
                <div className="top_match_down" style={{gridArea:`top_match_down-${i}`}}>
                  {top_match_down(numOfRounds)}
                </div>

                <div className="bottom_match_up" style={{gridArea:`bottom_match_up-${i}`}}>
                  {bottom_match_up(numOfRounds)}
                </div>

                <div className="connector" style={{gridArea:`connector-${i}`}}>
                  {connector(numOfRounds)}
                </div>

                <div className="straight_line" style={{gridArea:`straight_line-${i}`}}>
                  {straight_line(numOfRounds)}
                </div>
                <div className="straight_line2" style={{gridArea:`straight_line2-${i}`}}>
                  {straight_line(numOfRounds)}
                </div>

                <div className={`round-3 game-${i + 1}`} key={i} style={{gridArea: `game-${i + 1}`}}>
                  <section className="bracket">
                    <div className="container">
                      <div className="split split-one">
                        <div className="round round-one current">
                          <ul className="matchup">
                            <li className="team team-top">{match.players[0].player_name}<span className="score">{match.players[0].score}</span></li>
                            <li className="team team-bottom">{match.players[1].player_name}<span className="score">{match.players[1].score}</span></li>
                          </ul>
                        </div>  
                      </div>  
                    </div>  
                  </section >
                </div>
              </>
              )
            }

            if(i >= (numOfPlayers - numOfPlayers / 8) && i < (numOfPlayers - numOfPlayers / 16)) {
              return(
              <>
                <div className="top_match_down" style={{gridArea:`top_match_down-${i}`}}>
                {top_match_down(numOfRounds)}
                </div>
  
                <div className="bottom_match_up" style={{gridArea:`bottom_match_up-${i}`}}>
                  {bottom_match_up(numOfRounds)}
                </div>
  
                <div className="connector" style={{gridArea:`connector-${i}`}}>
                  {connector(numOfRounds)}
                </div>

                <div className="straight_line" style={{gridArea:`straight_line-${i}`}}>
                  {straight_line(numOfRounds)}
                </div>

                <div className="straight_line2" style={{gridArea:`straight_line2-${i}`}}>
                  {straight_line(numOfRounds)}
                </div>

                <div className="straight_line3" style={{gridArea:`straight_line3-${i}`}}>
                  {straight_line(numOfRounds)}
                </div>

                <div className="straight_line4" style={{gridArea:`straight_line4-${i}`}}>
                  {straight_line(numOfRounds)}
                </div>

                <div className="straight_line5" style={{gridArea:`straight_line5-${i}`}}>
                  {straight_line(numOfRounds)}
                </div>

                <div className="straight_line6" style={{gridArea:`straight_line6-${i}`}}>
                  {straight_line(numOfRounds)}
                </div>


                <div className={`round-4 game-${i + 1}`} key={i} style={{gridArea: `game-${i + 1}`}}>
                  <section className="bracket">
                    <div className="container">
                      <div className="split split-one">
                        <div className="round round-one current">
                          <ul className="matchup">
                            <li className="team team-top">{match.players[0].player_name}<span className="score">{match.players[0].score}</span></li>
                            <li className="team team-bottom">{match.players[1].player_name}<span className="score">{match.players[1].score}</span></li>
                          </ul>
                        </div>  
                      </div>  
                    </div>  
                  </section >
                </div>
              </>
              )
            }
          })}

        </div>  
      </div>
    </div>
  ) } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}

export default Tournament;