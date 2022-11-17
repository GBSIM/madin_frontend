import './default.css';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


import Main from './components/views/Main/Main';

function App() {
  return (
    <Router>
      <div>
        <Routes>  
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/main" element={<Main/>} />
        </Routes>        
      </div>
    </Router>
  );
}

export default App;
