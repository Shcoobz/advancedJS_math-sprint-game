import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SplashPage from './components/pages/SplashPage';
import CountdownPage from './components/pages/CountdownPage';

function App() {
  return (
    <Router basename='/react_math-sprint-game'>
      <div className='game-container'>
        <Header />
        <Routes>
          <Route path='/' element={<SplashPage />} />
          <Route path='/countdown' element={<CountdownPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
