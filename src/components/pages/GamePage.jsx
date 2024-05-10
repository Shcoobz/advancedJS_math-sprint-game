import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * GamePage component manages the gameplay interface. It generates mathematical equations, tracks user responses,
 * calculates the time played, and applies penalties for incorrect answers. At the end of the game, it navigates to the score page.
 */
function GamePage() {
  /**
   * @const {Array<Object>} equationsArray - Stores generated equations for the game.
   */
  const [equationsArray, setEquationsArray] = useState([]);

  /**
   * @const {Array<string>} playerGuessArray - Stores the player's guesses to track game progress.
   */
  const [playerGuessArray, setPlayerGuessArray] = useState([]);

  /**
   * @const {number} timePlayed - Tracks the amount of time spent on the current game.
   */
  const [timePlayed, setTimePlayed] = useState(0);

  /**
   * @const {number} penaltyTime - Adds time penalties for incorrect answers.
   */
  const [penaltyTime, setPenaltyTime] = useState(0);

  /**
   * @const {Function} navigate - Hook to navigate programmatically between routes.
   */
  const navigate = useNavigate();

  /**
   * @const {Object} location - Hook to access the location object from the router, used to pass state across routes.
   */
  const location = useLocation();

  /**
   * @const {number} questionAmount - The number of questions to be answered, defaults to 10 if not specified.
   */
  const questionAmount = location.state?.questionAmount || 10;

  /**
   * @const {Object} itemContainerRef - A ref object pointing to the container for smooth scrolling functionality.
   */
  const itemContainerRef = useRef(null);

  /**
   * Effect hook for initializing and updating the game's time played.
   */
  useEffect(updateTimePlayed, []);

  /**
   * Effect hook to populate equations on component mount or when question amount changes.
   */
  useEffect(() => {
    function populateEquations(questionAmount) {
      let tempEquations = [];
      let correctEquations = Math.floor(Math.random() * (questionAmount + 1));
      let wrongEquations = questionAmount - correctEquations;

      const correctEquationsArray = generateCorrectEquations(correctEquations);
      const wrongEquationsArray = generateIncorrectEquations(wrongEquations);

      tempEquations = [...correctEquationsArray, ...wrongEquationsArray];

      shuffle(tempEquations);
      setEquationsArray(tempEquations);
    }

    if (questionAmount && equationsArray.length === 0) {
      populateEquations(questionAmount);
    }
  }, [questionAmount, equationsArray]);

  /**
   * Effect hook to navigate to the score page when all questions have been answered.
   */
  useEffect(navigateToScorePage, [
    playerGuessArray,
    questionAmount,
    timePlayed,
    penaltyTime,
    navigate,
  ]);

  /**
   * Starts an interval to update the game's time played every 100 milliseconds.
   * @returns {Function} Cleanup function to clear the interval timer.
   */
  function updateTimePlayed() {
    const timer = setInterval(() => {
      setTimePlayed((prevTime) => prevTime + 0.1);
    }, 100);

    return () => clearInterval(timer);
  }

  /**
   * Navigates to the score page when all questions are answered.
   */
  function navigateToScorePage() {
    if (playerGuessArray.length === questionAmount) {
      const finalTime = timePlayed + penaltyTime;

      navigate('/score', {
        state: {
          timePlayed,
          penaltyTime,
          finalTime,
          questionAmount,
        },
      });
    }
  }

  /**
   * Generates the specified number of correct mathematical equations.
   * @param {number} correctEquations - Number of correct equations to generate.
   * @returns {Array<Object>} An array of objects containing correct equations.
   */
  function generateCorrectEquations(correctEquations) {
    const tempEquations = [];

    for (let i = 0; i < correctEquations; i++) {
      const firstNumber = Math.floor(Math.random() * 10);
      const secondNumber = Math.floor(Math.random() * 10);
      const equationValue = firstNumber * secondNumber;
      const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;

      tempEquations.push({ value: equation, evaluated: 'true' });
    }

    return tempEquations;
  }

  /**
   * Generates the specified number of incorrect mathematical equations.
   * @param {number} wrongEquations - Number of incorrect equations to generate.
   * @returns {Array<Object>} An array of objects containing incorrect equations.
   */
  function generateIncorrectEquations(wrongEquations) {
    const tempEquations = [];

    for (let i = 0; i < wrongEquations; i++) {
      const firstNumber = Math.floor(Math.random() * 10);
      const secondNumber = Math.floor(Math.random() * 10);
      const equationValue = firstNumber * secondNumber;
      const wrongOptions = [
        `${firstNumber} x ${secondNumber + 1} = ${equationValue}`,
        `${firstNumber} x ${secondNumber} = ${equationValue - 1}`,
        `${firstNumber + 1} x ${secondNumber} = ${equationValue}`,
      ];

      const wrongEquation = wrongOptions[Math.floor(Math.random() * 3)];

      tempEquations.push({ value: wrongEquation, evaluated: 'false' });
    }

    return tempEquations;
  }

  /**
   * Shuffles the provided array using the Fisher-Yates algorithm.
   * @param {Array} array - The array to shuffle.
   */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   * Handles the user's selection for each equation, updating the guess array and applying penalty if wrong.
   * @param {boolean} guessedTrue - Indicates whether the user guessed 'true' or 'false'.
   */
  function handleSelect(guessedTrue) {
    setPlayerGuessArray((prevGuesses) => [
      ...prevGuesses,
      guessedTrue ? 'true' : 'false',
    ]);

    if (!guessedTrue) {
      setPenaltyTime((prevPenalty) => prevPenalty + 0.5);
    }

    setTimeout(() => {
      scrollToNextEquation();
    }, 500);
  }

  /**
   * Scrolls the view to the next equation in the list.
   */
  function scrollToNextEquation() {
    if (itemContainerRef.current) {
      const itemHeight = 80;
      const scrollPosition = (playerGuessArray.length + 1) * itemHeight;

      itemContainerRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className='card game-page'>
      <div className='item-container' ref={itemContainerRef}>
        <div className='height-240'></div>
        <div className='selected-item'></div>
        {equationsArray.map((equation, index) => (
          <div key={index} className='item'>
            <h1>{equation.value}</h1>
          </div>
        ))}
        <div className='height-500'></div>
      </div>
      <div className='item-footer'>
        <button className='wrong' onClick={() => handleSelect(false)}>
          Wrong
        </button>
        <button className='right' onClick={() => handleSelect(true)}>
          Right
        </button>
      </div>
    </div>
  );
}

export default GamePage;
