const connector = (numOfRounds = 2) => {
  if(numOfRounds === 2) {
    return(   
      <svg width="20vw" height="60"> 
        <line x1="10vw" y1="0" x2="10vw" y2="60" stroke="black" strokeWidth="5"/>
        <line x1="10vw" y1="30" x2="20vw" y2="30" stroke="black" strokeWidth="5"/>
      </svg>
    )
  }
  if(numOfRounds === 3) {
    return(
      <svg width="12.5vw" height="60"> 
        <line x1="6.25vw" y1="0" x2="6.25vw" y2="60" stroke="black" strokeWidth="5"/>
        <line x1="6.25vw" y1="30" x2="12.5vw" y2="30" stroke="black" strokeWidth="5"/>
      </svg>
    )
  }
  if(numOfRounds === 4) {
    return(
      <svg width="9.09vw" height="60"> 
        <line x1="4.545vw" y1="0" x2="4.545vw" y2="60" stroke="black" strokeWidth="5"/>
        <line x1="4.545vw" y1="30" x2="9.09vw" y2="30" stroke="black" strokeWidth="5"/>
      </svg>
    )
  }
}

export default connector