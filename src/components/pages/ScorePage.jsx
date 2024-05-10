import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * ScorePage component displays the final game scores and allows the user to restart the game.
 * It handles displaying the base time, penalty time, and final adjusted time after any penalties.
 * Additionally, it updates the local storage with the best scores.
 */
function ScorePage() {
  /**
   * @const {Function} navigate - Hook to navigate programmatically between routes.
   */
  const navigate = useNavigate();

  /**
   * @const {Object} location - Hook to access the location object from the router, used to pass state across routes.
   */
  const location = useLocation();

  /**
   * @const {Object} location.state - Destructured object properties to get game-related states such as times and question amount.
   */
  const { timePlayed, penaltyTime, finalTime, questionAmount } = location.state;

  /**
   * Effect hook to update the best scores in local storage when the component mounts.
   */
  useEffect(() => {
    updateBestScoresInLocalStorage(questionAmount, finalTime);
  }, [questionAmount, finalTime]);

  /**
   * Updates or creates best scores for a particular question amount in local storage.
   * @param {number} questionAmount - The number of questions answered in the game round.
   * @param {number} finalTime - The final calculated time after penalties are applied.
   */
  function updateBestScoresInLocalStorage(questionAmount, finalTime) {
    const bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];
    const index = bestScores.findIndex((score) => score.questions === questionAmount);

    if (index === -1) {
      bestScores.push({ questions: questionAmount, bestScore: finalTime.toFixed(1) });
    } else {
      const existingBestScore = parseFloat(bestScores[index].bestScore);

      if (existingBestScore === 0.0 || existingBestScore > finalTime) {
        bestScores[index].bestScore = finalTime.toFixed(1);
      }
    }

    localStorage.setItem('bestScores', JSON.stringify(bestScores));
  }

  /**
   * Handles the action to start a new game.
   */
  function handlePlayAgain() {
    navigate('/');
  }

  return (
    <div className='card' id='score-page'>
      <div className='score-container'>
        <h1 className='title'>Your Time</h1>
        <h1 className='final-time'>{finalTime.toFixed(1)}s</h1>
        <h1 className='base-time'>Base Time: {timePlayed.toFixed(1)}s</h1>
        <h1 className='penalty-time'>Penalty: +{penaltyTime.toFixed(1)}s</h1>
      </div>
      <div className='score-footer'>
        <button className='play-again' onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default ScorePage;
