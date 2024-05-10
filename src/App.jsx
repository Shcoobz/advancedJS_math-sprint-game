import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SplashPage from './components/pages/SplashPage';

function App() {
  return (
    <Router basename='/react_math-sprint-game'>
      <div className='game-container'>
        <Header />
        <Routes>
          <Route path='/' element={<SplashPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
