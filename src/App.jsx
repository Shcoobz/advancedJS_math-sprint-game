import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <Router basename='/react_math-sprint-game'>
      <div className='game-container'>
        <Header />
      </div>
    </Router>
  );
}

export default App;
