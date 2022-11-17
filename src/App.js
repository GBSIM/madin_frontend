import './default.css';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


import Main from './components/views/Main/Main';
import Present from './components/views/Present/Present';
import Pickup from './components/views/Pickup/Pickup';

function App() {
  return (
    <Router>
      <div>
        <Routes>  
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/main" element={<Main/>} />
          <Route exact path="/present" element={<Present/>} />
          <Route exact path="/pickup" element={<Pickup/>} />
        </Routes>        
      </div>
    </Router>
  );
}

export default App;
