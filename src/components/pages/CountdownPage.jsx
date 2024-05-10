import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * CountdownPage is a component responsible for displaying a countdown before navigating to the game page.
 * It uses a countdown state that decrements every second from a starting value until it reaches zero.
 */
function CountdownPage() {
  /**
   * @const {number} countdown - Holds the current countdown number, starts from 3.
   */
  const [countdown, setCountdown] = useState(3);

  /**
   * @const {Function} navigate - Hook to navigate programmatically between routes.
   */
  const navigate = useNavigate();

  /**
   * @const {Object} location - Hook to access the location object from the router, used to pass state across routes.
   */
  const location = useLocation();

  /**
   * @const {number} questionAmount - The number of questions for the game, retrieved from location state.
   */
  const questionAmount = location.state?.questionAmount;

  /**
   * Initializes the countdown when the component mounts and clears interval when it unmounts.
   * @returns {Function} Cleanup function to clear the interval timer.
   */
  useEffect(() => {
    return startCountdown(setCountdown);
  }, []);

  /**
   * Monitors countdown and navigates to the game page when countdown hits zero.
   */
  useEffect(() => {
    navigateToGamePageWhenCountdownZero(countdown, navigate, questionAmount);
  }, [countdown, navigate, questionAmount]);

  /**
   * Sets up a countdown timer that decrements the countdown state every second.
   * @param {Function} setCountdown - State setter function for countdown.
   * @returns {Function} Cleanup function to clear the interval timer.
   */
  function startCountdown(setCountdown) {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }

  /**
   * Navigates to the game page when countdown reaches zero.
   * @param {number} countdown - Current countdown value.
   * @param {Function} navigate - Navigation function from useNavigate hook.
   * @param {number} questionAmount - Number of questions to pass to the game page.
   */
  function navigateToGamePageWhenCountdownZero(countdown, navigate, questionAmount) {
    if (countdown === 0) {
      setTimeout(() => {
        navigate('/game', { state: { questionAmount } });
      }, 1000);
    }
  }

  return (
    <div className='card countdown-page'>
      <h1 className='countdown'>{countdown === 0 ? 'GO!' : countdown}</h1>
    </div>
  );
}

export default CountdownPage;
