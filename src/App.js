import './default.css';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Header from './components/library/ui/components/header/Header';
import Footer from './components/library/ui/components/footer/Footer';

function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <Routes>  
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
