import top_match_down from './svg_files/top_match_down';
import bottom_match_up from './svg_files/bottom_match_up';
import connector from './svg_files/connector';
import straight_line from './svg_files/straight_line';
import { generateTemplateAreas } from './helpers/helpers';
import {useState, useEffect} from 'react'

const Bracket = ({numOfPlayers, tournament, matchesObj, organizerLoggedIn}) => {
  const [bracketWidth, setBracketWidth] = useState({width:'100%'});
  const [numOfRounds, setNumOfRounds] = useState(0);

  const numOfMatches = numOfPlayers ? numOfPlayers - 1 : 0
  useEffect(() => {
    //Determine how many rounds there will be
    if(numOfPlayers !== 0) {
      const numOfRoundsHolder = Math.ceil(Math.log2(numOfPlayers));
      setNumOfRounds(numOfRoundsHolder);
    }

    if( numOfPlayers < 8) {
      setBracketWidth({
        width: "50%"
      })
      // bracketWidth = "50%"
    } else if ( numOfPlayers < 16) {
      setBracketWidth({
        width: "75%"
      })
      // bracketWidth = "75%"
    } else if ( numOfPlayers < 32) {
      setBracketWidth({
        width: "90%"
      })
      // bracketWidth = "90%"
    }
  }, [numOfPlayers])

  const bs = {
    display: "grid",
    gridTemplateRows: `repeat(${numOfPlayers - 1}, 60px)`,
    gridTemplateColumns: `repeat(${(2 * numOfRounds) + (numOfRounds - 1)}, 1fr)`,
    gridTemplateAreas: generateTemplateAreas(numOfPlayers, numOfRounds),
    justifyContent: "center",
    alignItems: "stretch"
  };

  return(
    <div id="tournament-bracket" style={{...bracketWidth, margin:"auto"}}>
      <div id="tournament-rounds">
        {[...Array(numOfRounds)].map((e, i) => 
            <div className="round-details" key={i}>Round {i + 1}<div className="date" >{new Date(tournament?.start_date).toString().slice(0, 10)}</div></div>
        )}
      </div>

      <div id="tournament-games" style={{...bs,  margin:"4rem 0"}}>
        
        {/* {tournament.matches.map((match, i) => { */}
        {[...Array(numOfMatches)].map((match, i) => {
          if(i < numOfPlayers / 2) {
            return(

              <div className={`round-1 game-${i + 1}`} style={{gridArea: `game-${i + 1}`}} key={i}>
                <section className="bracket">
                  <div className="container">
                    <div className="split split-one">
                      <div className="round round-one current">
                        <ul className="matchup">
                          {tournament ? 
                          <div key={i}>
                            <li className="team team-top">{tournament?.matches[i]?.players[0]?.player_name}<span className="score">{tournament?.matches[i]?.players[0]?.score}</span></li>      
                            <li className="team team-bottom">{tournament?.matches[i]?.players[1]?.player_name}<span className="score">{tournament?.matches[i]?.players[1]?.score}</span></li>
                          </div>
                          :
                          <div key={i}>
                            <li className="team team-top">{matchesObj[i]?.players[0]?.player_name}</li>
                            <li className="team team-bottom">{matchesObj[i]?.players[1]?.player_name}</li>
                          </div>
                          }
                         
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
                        <ul className="matchup" >
                        {tournament ? 
                          <div key={i}>
                            <li className="team team-top">{tournament?.matches[i]?.players[0]?.player_name}<span className="score">{tournament?.matches[i]?.players[0]?.score}</span></li>
                            <li className="team team-bottom">{tournament?.matches[i]?.players[1]?.player_name}<span className="score">{tournament?.matches[i]?.players[1]?.score}</span></li>
                          </div>
                          :
                          <div key={i}>
                            <li className="team team-top">{matchesObj[i]?.players[0]?.player_name}</li>
                            <li className="team team-bottom">{matchesObj[i]?.players[1]?.player_name}</li>
                          </div>
                          }
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
                        <ul className="matchup" >
                        {tournament ? 
                          <div key={i}>
                            <li className="team team-top">{tournament?.matches[i]?.players[0]?.player_name}<span className="score">{tournament?.matches[i]?.players[0]?.score}</span></li>
                            <li className="team team-bottom">{tournament?.matches[i]?.players[1]?.player_name}<span className="score">{tournament?.matches[i]?.players[1]?.score}</span></li>
                          </div>
                          :
                          <div key={i}>
                            <li className="team team-top">{matchesObj[i]?.players[0]?.player_name}</li>
                            <li className="team team-bottom">{matchesObj[i]?.players[1]?.player_name}</li>
                          </div>
                          }
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
                        <ul className="matchup" >
                        {tournament ? 
                          <div key={i}>
                            <li className="team team-top">{tournament?.matches[i]?.players[0]?.player_name}<span className="score">{tournament?.matches[i]?.players[0]?.score}</span></li>
                            <li className="team team-bottom">{tournament?.matches[i]?.players[1]?.player_name}<span className="score">{tournament?.matches[i]?.players[1]?.score}</span></li>
                          </div>
                          :
                          <div key={i}>
                            <li className="team team-top">{matchesObj[i]?.players[0]?.player_name}</li>
                            <li className="team team-bottom">{matchesObj[i]?.players[1]?.player_name}</li>
                          </div>
                          }
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
  ) 
}

export default Bracket;