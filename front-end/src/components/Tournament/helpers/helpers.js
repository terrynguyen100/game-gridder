function generateTemplateAreas(numOfPlayers) {
  const numOfRounds = Math.ceil(Math.log2(numOfPlayers));
  const templateAreas = [];

  let gameCount = 1;
  for (let i = 1; i <= numOfRounds; i++) {
    const round = [];

    const gamesInRound = Math.pow(2, numOfRounds - i);

    //3 matches
    if (numOfRounds === 2) {
      // for (let j = 1; j <= gamesInRound; j++) {
      //   if(i > 1 && j === 1) {
      //     for(let z = 1; z < i; z++){
      //       round.push(".")
      //     }
      //   }
      //   round.push(`game-${gameCount}`);
      //   if (j < gamesInRound) {
      //     round.push(".");
      //   }
  
      //   if(i > 1 && j === gamesInRound) {
      //     for(let z = 1; z < i; z++){
      //       round.push(".")
      //     }
      //   }
      //   gameCount++;
      // }
      const arr = [['game-1 .'], ['. game-3'], ['game-2 .']]

      const formattedTemplateAreas = arr.map((round) =>
        `"${round.join(" ")}"`
      );
      console.log(numOfRounds, formattedTemplateAreas)
      return formattedTemplateAreas.join("\n");
  
    }
    
    //7 matches
    if (numOfRounds === 3){
      // for (let j = 1; j <= gamesInRound; j++) {
      //   if(i > 1 && j === 1) {
      //     for(let z = 1; z <= i; z++){
      //       round.push(".")
      //     }
      //   }
      //   round.push(`game-${gameCount}`);
      //   if (j < gamesInRound) {
      //     round.push(".");
      //   }
  
      //   if(i > 1 && j === gamesInRound) {
      //     for(let z = 1; z <= i; z++){
      //       round.push(".")
      //     }
      //   }
      //   gameCount++;
      // }

      const arr = [
        ['game-1 . .'], 
        ['. game-5 .'], 
        ['game-2 . .'],
        ['. . game-7'], 
        ['game-3 . .'], 
        ['. game-6 .'],
        ['game-4 . .']
      ]

      const formattedTemplateAreas = arr.map((round) =>
        `"${round.join(" ")}"`
      );
      console.log(numOfRounds, formattedTemplateAreas)
      return formattedTemplateAreas.join("\n");
    }
    
    //15 matches
    if (numOfRounds === 4){
      // for (let j = 1; j <= gamesInRound; j++) {
      //   if (i < numOfRounds) {
      //     if(i > 1 && j === 1) {
      //       for(let z = 1; z <= i; z++){
      //         round.push(".");
      //         round.push(".");
      //       }
      //     }
      //     round.push(`game-${gameCount}`);
      //     if (j < gamesInRound) {
      //       round.push(".");
      //     }
    
      //     if(i > 1 && j === gamesInRound) {
      //       for(let z = 1; z <= i; z++){
      //         round.push(".");
      //         round.push(".");
      //       }
      //     }
      //   } else {
      //     for(let z = 1; z <= 7; z++){
      //       round.push(".");

      //     }
      //     round.push(`game-${gameCount}`);
      //     for(let z = 1; z <= 7; z++){
      //       round.push(".");

      //     }
      //   }
        
      //   gameCount++;
      // }

      const arr = [
        ['game-1 . . .'], 
        ['. . . .'], 
        ['game-2 . . .'],
        ['. game-9 . .'], 
        ['game-3 . game-13 .'], 
        ['. . . .'],
        ['game-4 game-10 . .'],
        ['. . . game-15'],
        ['game-5 game-11 . .'], 
        ['. . . .'], 
        ['game-6 . game-14 .'],
        ['. game-12 . .'],
        ['game-7 . . .'],
        ['. . . .'],
        ['game-8 . . .']
      ]

      const formattedTemplateAreas = arr.map((round) =>
        `"${round.join(" ")}"`
      );
      console.log(numOfRounds, formattedTemplateAreas)
      return formattedTemplateAreas.join("\n");

    }


    templateAreas.push(round);
  }
  console.log(numOfRounds, templateAreas)

  const transposedArr = transpose(templateAreas)

  //If element is undefined turn it into a "."
  for(let i = 0; i < numOfPlayers - 1; i++) {
    for(let j = 0; j < numOfRounds; j++){
      if (transposedArr[i][j] === undefined) transposedArr[i][j] = "." 
    }
  }


  const formattedTemplateAreas = transposedArr.map((round) =>
    `"${round.join(" ")}"`
  );
  console.log(numOfRounds, formattedTemplateAreas)
  return formattedTemplateAreas.join("\n");
}

const transpose = function (matrix) {
  // Replace this code with your solution
  const rowLength = matrix.length;
  const columnLength = matrix[0].length;

  let tempArray = [];

  for (let i = 0; i < columnLength; i++) {
    const col = [];
    for (let j = 0; j < rowLength; j++) {
      col.push(matrix[j][i]);
    }
    tempArray.push(col);
  }
  return tempArray;
};

module.exports = {generateTemplateAreas}