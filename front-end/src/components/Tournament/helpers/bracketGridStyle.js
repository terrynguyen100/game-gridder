import {useState, useEffect} from 'react'
import { generateEditAreas } from './helpers';

const BracketGridStyle = (numOfPlayers) => {
  // const [bracketWidth, setBracketWidth] = useState({width:'100%'});
  const [numOfRounds, setNumOfRounds] = useState(0);

  const numOfMatches = numOfPlayers ? numOfPlayers - 1 : 0
  useEffect(() => {
    //Determine how many rounds there will be
    if(numOfPlayers !== 0) {
      const numOfRoundsHolder = Math.ceil(Math.log2(numOfPlayers));
      setNumOfRounds(numOfRoundsHolder);
    }
  }, [numOfPlayers])

    let  bracketWidth = {width: "60%"}
    if( numOfPlayers < 8) {
      bracketWidth.width = "60%"
    } else if ( numOfPlayers < 16) {
      bracketWidth.width = "75%"
    } else if ( numOfPlayers < 32) {
      bracketWidth.width = "100%"
    }

  const bs = {
    display: "grid",
    gridTemplateRows: `repeat(${numOfPlayers - 1}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(${(2 * numOfRounds) + (numOfRounds - 1)}, minmax(0, 1fr))`,
    gridTemplateAreas: generateEditAreas(numOfPlayers, numOfRounds),
    justifyContent: "center",
    alignItems: "stretch"
  };

  return {
    bs,
    bracketWidth,
    numOfRounds,
    numOfMatches
  }
}

export default BracketGridStyle