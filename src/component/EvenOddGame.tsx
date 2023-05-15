/**
 * Purpose:-The purpose of this file is to implement the Even-Odd Game component. The game allows users to guess whether a randomly generated number is even or odd.
 * Logic:-The file implements the game logic by maintaining the game state, handling user interactions, and updating the state accordingly. It generates a random number, 
 *   checks the user's guess, and keeps track of the number of wins, losses, and rounds. It also handles game flow by controlling the start, quit, and win/lose conditions.
 * Usage:-This file is used as a component in a React application. It can be included and rendered within other components or pages where the Even-Odd Game functionality is required. 
 *   It provides an interactive interface for users to play the game.
 * Depends on:-
 *           useState: hook for managing the game state.
 *           useSpring:from the "react-spring library for animating the number display.
 * Communicates with: the file doesn't directly communicates with external service
 *           
 * 
 */

import React, { useState } from "react";
import correct from "./audio/correct.wav";
import incorrect from "./audio/incorrect.mp3";

import { useSpring, animated } from "react-spring";
import "./EvenOddGame.scss";

interface GameState {
  number: number | null;
  guess: "even" | "odd" | "?" | string | null;
  feedback: string;
  numWins: number;
  numLose: number;
  numRounds: number;
}

const EvenOddGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    number: null,
    guess: null,
    feedback: "Make a guess whether the number is even or odd.",
    numWins: 0,
    numLose: 0,
    numRounds: 0,
  });

  const [start, setStart] = useState(false);
  const [popup, setPopup] = useState(false);
  const [lose, setLose] = useState(false);

  const randomNumberProps = useSpring({
    number: gameState.number || 0,
    from: { number: 0 },
    config: { duration: 100 },
  });

  function handleGuess(guess: "even" | "odd" | "") {
    const randomNumber = Math.floor(Math.random() * 200) + 1;

    const isEven = randomNumber % 2 === 0;
    const feedback =
      isEven === (guess === "even")
        ? "You got it right!"
        : "Oops, wrong guess.";
    const numWins =
      isEven === (guess === "even") ? gameState.numWins + 1 : gameState.numWins;
    const numLose =
      isEven === (guess !== "even") ? gameState.numLose + 1 : gameState.numLose;
    const numRounds = gameState.numRounds + 1;

    if (feedback === "Oops, wrong guess.") {
      soundEffectIncorrect();
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
    });
  }

  function handleQuit() {
    setGameState({
      number: 0,
      guess: null,
      feedback: "Thanks for playing!",
      numWins: 0,
      numLose: 0,
      numRounds: 0,
    });
  }

  const soundEffectIncorrect = () => {
    const audio = new Audio(incorrect);
    audio.play();
  };

  const soundEffectCorrect = () => {
    const audio = new Audio(correct);
    audio.play();
  };

  const handleStart = () => {
    setStart(!false);
  };

  if (gameState.numWins >= 3) {
    const audio = new Audio(correct);
    audio.play();

    handleQuit();
    setPopup(true);
    setStart(false);
  }

  if (gameState.numLose >= 9) {
    const audio = new Audio(incorrect);
    audio.play();
    setLose(true);
    handleQuit();
    setStart(false);
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

            <p id="Guess-Number">Guess the next Number?</p>
            <animated.p id="num-random">
              {randomNumberProps.number.interpolate((value: number) =>
                Math.floor(value)
              )}
            </animated.p>

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
              <button id="btn-win" onClick={() => setPopup(false)}>
                OK
              </button>
            </div>
          </div>
        )}
        {lose && (
          <div className="popup">
            <div className="popup-lose">
              <p>Oops,You lose Dude!</p>
              <p>Try Again!</p>
              <button id="btn-lose" onClick={() => setLose(false)}>
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvenOddGame;
