import './default.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import About from './components/views/About/About';
import Browse from './components/views/Browse/Browse';
import Menu from './components/views/Menu/Menu';
import Order from './components/views/Order/Order';

function App() {
  return (
    <Router>
      <div>
        <Routes>  
          <Route exact path="/" element={<About/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/browse" element={<Browse/>} />
          <Route exact path="/menu" element={<Menu/>} />
          <Route exact path="/order" element={<Order/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
