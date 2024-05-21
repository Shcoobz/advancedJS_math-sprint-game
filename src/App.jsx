import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SplashPage from './components/pages/SplashPage';
import CountdownPage from './components/pages/CountdownPage';
import GamePage from './components/pages/GamePage';
import ScorePage from './components/pages/ScorePage';

/**
 * The App component serves as the root of the React Math Sprint Game application.
 * It sets up the router and defines routes for different pages within the app.
 */
function App() {
  /**
   * Renders the application UI with routing setup.
   * @returns {JSX.Element} - The React component that includes the Router, Header, and all defined Routes.
   */
  return (
    <Router basename='/advancedJS_math-sprint-game'>
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
