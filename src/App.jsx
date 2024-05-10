import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SplashPage from './components/pages/SplashPage';
import CountdownPage from './components/pages/CountdownPage';
import GamePage from './components/pages/GamePage';
import ScorePage from './components/pages/ScorePage';

function App() {
  return (
    <Router basename='/react_math-sprint-game'>
      <div className='game-container'>
        <Header />
        <Routes>
          <Route path='/' element={<SplashPage />} />
          <Route path='/countdown' element={<CountdownPage />} />
          <Route path='/game' element={<GamePage />} />
          <Route path='/score' element={<ScorePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
