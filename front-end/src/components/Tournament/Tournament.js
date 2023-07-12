import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { generateTemplateAreas } from './helpers/helpers';

import "./../../sass/tournament.scss"

const Tournament = ({ tournament, numOfPlayers }) => {

  console.log("players: ",numOfPlayers)

  const tournamentDate = `${new Date(tournament.start_date).toString().slice(0, 16)} at ${new Date(tournament.start_date).toString().slice(16, 28)}`
  // console.log(tournament)

  //Determine how many rounds there will be
  let factorOf2 = 0
  while (Math.pow(2, factorOf2) < numOfPlayers) factorOf2++;

  // console.log(generateTemplateAreas(numOfPlayers, factorOf2))
  // console.log("Tournament ", tournament, "Number of players: ", numOfPlayers)

  const bracketStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${numOfPlayers - 1}, 1fr)`,
    gridTemplateColumns: `repeat(${factorOf2}, 1fr)`,
    gridTemplateAreas: generateTemplateAreas(numOfPlayers, factorOf2),
    justifyContent: "center",
    alignItems: "stretch"
  }

  return (
    <div key={tournament.id}>
      <h1>
        Hello
      </h1>
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
        <div id="tournament-rounds">
          {[...Array(factorOf2)].map((e, i) => 
              <div className="round-details" key={i}>Round {i + 1}<br/><span className="date">{new Date(tournament.start_date).toString().slice(0, 10)}</span></div>
          )}
        </div>
        <div id="tournament-games" style={bracketStyle}>
          {tournament.matches.map((match, i) => {
            if(i < numOfPlayers / 2) {
              return(
                <div className={`round-1 game-${i + 1}`} style={{gridArea: `game-${i + 1}`}} >
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

            if(i >= numOfPlayers / 2 && i < (numOfPlayers - numOfPlayers / 2 / 2)) {
              return(
                <div className={`round-2 game-${i + 1}`} style={{gridArea: `game-${i + 1}`}}>
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

            if(i >= (numOfPlayers - numOfPlayers / 2 / 2) && i < (numOfPlayers - numOfPlayers / 2 / 2 / 2)) {
              return(
                <div className={`round-3 game-${i + 1}`} style={{gridArea: `game-${i + 1}`}}>
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

            if(i >= (numOfPlayers - numOfPlayers / 2 / 2 / 2) && i < (numOfPlayers - numOfPlayers / 2 / 2 / 2 / 2)) {
              return(
                <div className={`round-4 game-${i + 1}`} style={{gridArea: `game-${i + 1}`}}>
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
          })}

        </div>  
      </div>
    </div>
  )
}

export default Tournament