import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashPage() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [bestScores, setBestScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    initializeBestScores(setBestScores);
  }, []);

  function initializeBestScores(setBestScores) {
    const savedBestScores = localStorage.getItem('bestScores');

    if (savedBestScores) {
      const parsedScores = JSON.parse(savedBestScores);

      setBestScores(parsedScores);
    } else {
      const initialBestScores = [
        { questions: 10, bestScore: '0.0' },
        { questions: 25, bestScore: '0.0' },
        { questions: 50, bestScore: '0.0' },
        { questions: 99, bestScore: '0.0' },
      ];

      setBestScores(initialBestScores);
      localStorage.setItem('bestScores', JSON.stringify(initialBestScores));
    }
  }

  function handleQuestionChange(e) {
    setSelectedQuestion(Number(e.target.value));
  }

  function handleStart() {
    if (selectedQuestion) {
      navigate('/countdown', { state: { questionAmount: selectedQuestion } });
    }
  }

  return (
    <div className='card splash-page'>
      <form className='start-form'>
        <div className='selection-container'>
          {[10, 25, 50, 99].map((amount) => (
            <div
              key={amount}
              className={`radio-container ${
                selectedQuestion === amount ? 'selected-label' : ''
              }`}>
              <label htmlFor={`value-${amount}`}>{amount} Questions</label>
              <input
                type='radio'
                name='questions'
                value={amount}
                id={`value-${amount}`}
                onChange={handleQuestionChange}
                checked={selectedQuestion === amount}
              />
              <span className='best-score'>
                <span>Best Score</span>
                <span className='best-score-value'>
                  {bestScores.find((score) => score.questions === amount)?.bestScore}s
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className='selection-footer'>
          <button className='start' type='button' onClick={handleStart}>
            Start Round
          </button>
        </div>
      </form>
    </div>
  );
}

export default SplashPage;
