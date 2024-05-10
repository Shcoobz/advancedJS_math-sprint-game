import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ScorePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { timePlayed, penaltyTime, finalTime, questionAmount } = location.state;

  useEffect(() => {
    updateBestScoresInLocalStorage(questionAmount, finalTime);
  }, [questionAmount, finalTime]);

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
