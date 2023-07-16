function generateTemplateAreas(numOfPlayers) {
  const numOfRounds = Math.ceil(Math.log2(numOfPlayers));
  let arr = []

  //3 matches
  if (numOfRounds === 2) {
    arr = [
      ['game-1 game-1 top_match_down-2 . .'], 
      ['. . connector-2 game-3 game-3'], 
      ['game-2 game-2 bottom_match_up-2 . .']
    ] 
  }
  
  //7 matches
  if (numOfRounds === 3){
    arr = [
      ['game-1 game-1 top_match_down-4 . . . . .'], 
      ['. . connector-4 game-5 game-5 top_match_down-6 . .'], 
      ['game-2 game-2 bottom_match_up-4 . . straight_line-6 . .'],
      ['. . . . . connector-6 game-7 game-7'], 
      ['game-3 game-3 top_match_down-5 . . straight_line2-6 . .'], 
      ['. . connector-5 game-6 game-6 bottom_match_up-6 . .'],
      ['game-4 game-4 bottom_match_up-5 . . . . .']
    ]
  }
  
  //15 matches
  if (numOfRounds === 4){
    arr = [
      ['game-1 game-1 top_match_down-8 . . . . . . . .'], 
      ['. . connector-8 game-9 game-9 top_match_down-12 . . . . .'], 
      ['game-2 game-2 bottom_match_up-8 . . straight_line-12 . . . . .'],
      ['. . . . . connector-12 game-13 game-13 top_match_down-14 . .'], 
      ['game-3 game-3 top_match_down-9 . . straight_line2-12 . . straight_line-14 . .'], 
      ['. . connector-9 game-10 game-10 bottom_match_up-12 . . straight_line2-14 . .'],
      ['game-4 game-4 bottom_match_up-9 . . . . . straight_line3-14 . .'],
      ['. . . . . . . . connector-14 game-15 game-15'],
      ['game-5 game-5 top_match_down-10 . . . . . straight_line4-14 . .'], 
      ['. . connector-10 game-11 game-11 top_match_down-13 . . straight_line5-14 . .'], 
      ['game-6 game-6 bottom_match_up-10 . . straight_line-13 . . straight_line6-14 . .'],
      ['. . . . . connector-13 game-14 game-14 bottom_match_up-14 . .'],
      ['game-7 game-7 top_match_down-11 . . straight_line2-13 . . . . .'],
      ['. . connector-11 game-12 game-12 bottom_match_up-13 . . . . .'],
      ['game-8 game-8 bottom_match_up-11 . . . . . . . .']
    ]
  }

  //31 matches
  if (numOfRounds === 5){
    arr = [
      ['game-1 . . . .'], 
      ['. game-17 . . .'], 
      ['game-2 . . . .'],
      ['. . game-25 . .'], 
      ['game-3 . . . .'], 
      ['. game-18 . . .'],
      ['game-4 . . . .'],
      ['. . . game-29 .'],
      ['game-5 . . . .'], 
      ['. game-19 . . .'], 
      ['game-6 . . . .'],
      ['. . game-26 . .'],
      ['game-7 . . . .'],
      ['. game-20 . . .'],
      ['game-8 . . . .'],
      ['. . . . game-31'], 
      ['game-9 . . . .'],
      ['. game-21 . . .'], 
      ['game-10 . . . .'], 
      ['. . game-27 . .'],
      ['game-11 . . . .'],
      ['. game-22 . . .'],
      ['game-12 . . . .'], 
      ['. . . game-30 .'], 
      ['game-13 . . . .'],
      ['. game-23 . . .'],
      ['game-14 . . . .'],
      ['. . game-28 . .'],
      ['game-15 . . . .'],
      ['. game-24 . . .'],
      ['game-16 . . . .']
    ]
  }

  const formattedTemplateAreas = arr.map((round) =>
  `"${round.join(" ")}"`
  );
  return formattedTemplateAreas.join("\n");
}

function generateEditAreas(numOfPlayers) {
  const numOfRounds = Math.ceil(Math.log2(numOfPlayers));
  let arr = []

  //3 matches
  if (numOfRounds === 2) {
    arr = [
      ['name-1 game-1 game-1 . .'], 
      ['. . name-3 game-3 game-3'], 
      ['name-2 game-2 game-2 . .']
    ] 
  }
  
  //7 matches
  if (numOfRounds === 3){
    arr = [
      ['name-1 game-1 game-1 . . . . .'], 
      ['. . name-5 game-5 game-5 . . .'], 
      ['name-2 game-2 game-2 . . . . .'],
      ['. . . . name-7 game-7 game-7 .'], 
      ['name-3 game-3 game-3 . . . . .'], 
      ['. . name-6 game-6 game-6 . . .'],
      ['name-4 game-4 game-4 . . . . .']
    ]
  }
  
  //15 matches
  if (numOfRounds === 4){
    arr = [
      ['name-1 game-1 game-1 . . . . . . . .'], 
      ['. . . name-9 game-9 game-9 . . . . .'], 
      ['name-2 game-2 game-2 . . . . . . . .'],
      ['. . . . . name-13 game-13 game-13 . . .'], 
      ['name-3 game-3 game-3 . . . . . . . .'], 
      ['. . . name-10 game-10 game-10 . . . . .'],
      ['name-4 game-4 game-4 . . . . . . . .'],
      ['. . . . . . . . name-15 game-15 game-15'],
      ['name-5 game-5 game-5 . . . . . . . .'], 
      ['. . . name-11 game-11 game-11 . . . . .'], 
      ['name-6 game-6 game-6 . . . . . . . .'],
      ['. . . . . name-14 game-14 game-14 . . .'],
      ['name-7 game-7 game-7 . . . . . . . .'],
      ['. . . name-12 game-12 game-12 . . . . .'],
      ['name-8 game-8 game-8 . . . . . . . .']
    ]
  }

  //31 matches
  if (numOfRounds === 5){
    arr = [
      ['game-1 . . . .'], 
      ['. game-17 . . .'], 
      ['game-2 . . . .'],
      ['. . game-25 . .'], 
      ['game-3 . . . .'], 
      ['. game-18 . . .'],
      ['game-4 . . . .'],
      ['. . . game-29 .'],
      ['game-5 . . . .'], 
      ['. game-19 . . .'], 
      ['game-6 . . . .'],
      ['. . game-26 . .'],
      ['game-7 . . . .'],
      ['. game-20 . . .'],
      ['game-8 . . . .'],
      ['. . . . game-31'], 
      ['game-9 . . . .'],
      ['. game-21 . . .'], 
      ['game-10 . . . .'], 
      ['. . game-27 . .'],
      ['game-11 . . . .'],
      ['. game-22 . . .'],
      ['game-12 . . . .'], 
      ['. . . game-30 .'], 
      ['game-13 . . . .'],
      ['. game-23 . . .'],
      ['game-14 . . . .'],
      ['. . game-28 . .'],
      ['game-15 . . . .'],
      ['. game-24 . . .'],
      ['game-16 . . . .']
    ]
  }

  const formattedTemplateAreas = arr.map((round) =>
  `"${round.join(" ")}"`
  );
  return formattedTemplateAreas.join("\n");
}

module.exports = {generateTemplateAreas, generateEditAreas}