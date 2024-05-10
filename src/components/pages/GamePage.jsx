import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function GamePage() {
  const [equationsArray, setEquationsArray] = useState([]);
  const [playerGuessArray, setPlayerGuessArray] = useState([]);
  const [timePlayed, setTimePlayed] = useState(0);
  const [penaltyTime, setPenaltyTime] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const questionAmount = location.state?.questionAmount || 10;
  const itemContainerRef = useRef(null);

  useEffect(updateTimePlayed, []);

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

  useEffect(navigateToScorePage, [
    playerGuessArray,
    questionAmount,
    timePlayed,
    penaltyTime,
    navigate,
  ]);

  function updateTimePlayed() {
    const timer = setInterval(() => {
      setTimePlayed((prevTime) => prevTime + 0.1);
    }, 100);

    return () => clearInterval(timer);
  }

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

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

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
