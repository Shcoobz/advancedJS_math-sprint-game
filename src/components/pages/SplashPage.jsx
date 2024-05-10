import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * SplashPage component serves as the landing page where users select the number of questions for a game round.
 * It allows setting and storing the best scores and selecting the desired number of questions to play.
 */
function SplashPage() {
  /**
   * @const {number|null} selectedQuestion - Holds the currently selected number of questions or null if no selection.
   */
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  /**
   * @const {Array<Object>} bestScores - Stores the list of best scores fetched from local storage.
   */
  const [bestScores, setBestScores] = useState([]);

  /**
   * @const {Function} navigate - Hook to navigate programmatically between routes.
   */
  const navigate = useNavigate();

  /**
   * Effect hook to initialize best scores from local storage upon component mount.
   */
  useEffect(() => {
    initializeBestScores(setBestScores);
  }, []);

  /**
   * Fetches and sets best scores from local storage or initializes it if not present.
   * @param {Function} setBestScores - State setter function for best scores.
   */
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

  /**
   * Handles changes in question selection by updating the selectedQuestion state.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input radio button.
   */
  function handleQuestionChange(e) {
    setSelectedQuestion(Number(e.target.value));
  }

  /**
   * Navigates to the countdown page and passes the selected number of questions.
   */
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
