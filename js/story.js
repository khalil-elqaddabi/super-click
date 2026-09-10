export const gameState = {
  pseudo: "",
  mode: "classic",
  duration: 10,
  difficulty: "medium",
  score : 0,
  hits : 0,
  misses :0 ,
  endTime : 0,
  timerId : null,
  gameActive : false,
  gameEnded: false
};


export function resetGameStatus  () { 
  gameState.score = 0;
  gameState.hits = 0;
  gameState.misses =0 ;
  gameState.endTime = 0;
  gameState.timerId = null;
  gameState.gameActive = false;
  gameState.gameEnded = false

 }