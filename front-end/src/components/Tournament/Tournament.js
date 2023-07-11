import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import "./../../sass/tournament.scss"

const Tournament = ({ tournament, numOfPlayers }) => {

  const tournamentDate = `${new Date(tournament.start_date).toString().slice(0, 16)} at ${new Date(tournament.start_date).toString().slice(16, 28)}`
  // console.log(tournament)

  //Determine how many rounds there will be
  let factorOf2 = 0
  while (Math.pow(2, factorOf2) < numOfPlayers) factorOf2++;

  return (
    <>
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
            <span>{numOfPlayers}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", color: "#FFF"}}>
          <CalendarMonthIcon sx={{mx: 1.5}}/> 
            <span>{tournamentDate}</span>
          </Typography>
        </div>
      </div>

      <div id="tournament-bracket">
        <div className="tournament-rounds">
          {[...Array(factorOf2)].map((e, i) => 
              <div className="round-details" key={i}>Round {i + 1}<br/><span className="date">{new Date(tournament.start_date).toString().slice(0, 10)}</span></div>
          )}
        </div>
      
        {tournament.matches.map(match => {
          return(
            <>
              <section id="bracket">
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
            </>
          )
        })}
      </div>
    </>
  )
}

export default Tournament