import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function CountdownPage() {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const questionAmount = location.state?.questionAmount;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setTimeout(() => {
        navigate('/game', { state: { questionAmount } });
      }, 1000);
    }
  }, [countdown, navigate, questionAmount]);

  return (
    <div className='card countdown-page'>
      <h1 className='countdown'>{countdown === 0 ? 'GO!' : countdown}</h1>
    </div>
  );
}

export default CountdownPage;
