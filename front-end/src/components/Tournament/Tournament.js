import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import "./../../sass/tournament.scss"

const Tournament = ({ tournament, numOfPlayers }) => {

  const tournamentDate = `${new Date(tournament.start_date).toString().slice(0, 16)} at ${new Date(tournament.start_date).toString().slice(16, 28)}`
  console.log(tournament)

  return (
    <>
      <h1>
        Hello
      </h1>
      <div id="tournament-info">
        <h1 class="title">{tournament.name}</h1>
        <div class="tournament-stats">
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

        {tournament.matches.map(match => {
          return(
            <>
            <section id="bracket">
              <div class="container">
                <div class="split split-one">
                  <div class="round round-one current">
                    <div class="round-details">Round 1<br/><span class="date">{new Date(tournament.start_date).toString().slice(0, 10)}</span></div>
                    <ul class="matchup">
                      <li class="team team-top">{match.players[0].player_name}<span class="score">{match.players[0].score}</span></li>
                      <li class="team team-bottom">{match.players[1].player_name}<span class="score">{match.players[1].score}</span></li>
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