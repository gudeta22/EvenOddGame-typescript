import React, { useState } from "react";
import correct from "./audio/correct.wav";
import incorrect from "./audio/incorrect.mp3";
// import crowed from './audio/crowd.mp3'
import "./EvenOddGame.css";

interface GameState {
  number: number;
  guess: "even" | "odd" | "";
  feedback: string;
  numWins: number;
  numLose: number;
  numRounds: number;
  level: number;
}
const EvenOddGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    number: generateRandomNumber(),
    guess: "",
    feedback: "Make a guess whether the number is even or odd.",
    numWins: 0,
    numLose: 0,
    numRounds: 0,
    level: 1,
  });
  const [start, setStart] = useState(false);
  const [popup, setPopup] = useState(false);
  const [lose, setLose] = useState(false);
  
 
  

 function handleGuess(guess: "even" | "odd") {
   const randomNumber = Math.floor(Math.random() * 200) + 1; // Generate a random number
   const isEven = randomNumber % 2 === 0;
   const feedback =
     isEven === (guess === "even") ? "You got it right!" : "Oops, wrong guess.";
   const numWins =
     isEven === (guess === "even") ? gameState.numWins + 1 : gameState.numWins;
   const numLose =
     isEven === (guess !== "even") ? gameState.numLose + 1 : gameState.numLose;
   const numRounds = gameState.numRounds + 1;

   const level =
     numWins === 10 || numWins === 15 ? gameState.level + 1 : gameState.level;
   if (feedback === "Oops, wrong guess.") {
     soundEffect();
   } else {
     soundEffectCorrect();
   }

   setGameState({
     number: randomNumber,
     guess,
     feedback,
     numWins,
     numLose,
     numRounds,
     level,
   });
 }

  function handleQuit() {
    setGameState({
      number: 0,
      guess: "",
      feedback: "Thanks for playing!",
      numWins: 0,
      numLose: 0,
      numRounds: 0,
      level: 1,
    });
  }

  const soundEffect = () => {
    try {
      const audio = new Audio(incorrect);
      audio.play();
    } catch (error) {
      console.log("Error playing sound effect:", error);
    }
  };
  const soundEffectCorrect = () => {
    try {
      const audio = new Audio(correct);
      audio.play();
    } catch (error) {
      console.log("Error playing sound effect:", error);
    }
  };

  function generateRandomNumber() {
      return Math.floor(Math.random() * 200) + 1;
  }
 
 
  const handleStart = () => {
    setStart(!false);
  };

  if (gameState.numWins >= 10) {
    const audio = new Audio(correct);
    audio.play();

    // const audio2 = new Audio(crowed);
    // audio2.play()
    handleQuit();
    setPopup(true);
  }

  if (gameState.numLose >= 5) {
    const audio = new Audio(incorrect);
    audio.play();
    setLose(true);
    handleQuit();
  }
  return (
    <div className="container">
      <div className="container-2">
        <h1> Odd-Even Game</h1>

        {start === true ? (
          <div className="container-value">
            <p id="correct-value">Correct: {gameState.numWins}</p>
            <p id="incorrect-value">Incorrect: {gameState.numLose}</p>
            <p id="num-round">Rounds: {gameState.numRounds}</p>
            <p id="level-value">Level : {gameState.level}</p>
            <p id="num-random">{gameState.number}</p>

            <button id="btn-even" onClick={() => handleGuess("even")}>
              Even
            </button>
            <button id="btn-odd" onClick={() => handleGuess("odd")}>
              Odd
            </button>
            <button id="btn-quit" onClick={handleQuit}>
              restart
            </button>
          </div>
        ) : (
          <>
            <button id="btn-odd" onClick={handleStart}>
              Start
            </button>
          </>
        )}
        {popup && (
          <div className="popup">
            <div className="popup-win">
              <p>{gameState.feedback}</p>
              <h2>Congratulations!</h2>
              <p>You won the game!</p>
              <button id="btn-win" onClick={() => setPopup(false)}>OK</button>
            </div>
          </div>
        )}
        {lose && (
          <div className="popup">
            <div className="popup-lose">
              <p>Oops,You lose Dude!</p>
              <p>Try Again!</p>
              <button id="btn-lose" onClick={() => setLose(false)}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvenOddGame;
