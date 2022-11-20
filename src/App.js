import './default.css';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { changePage } from './_reducers/nav';
import { KakaoRedirectHandler } from './components/library/ui/units/LoginButton/KakaoLogin';

import Header from './components/library/ui/components/Header/Header';
import Main from './components/views/Main/Main';
import Present from './components/views/Present/Present';
import Pickup from './components/views/Pickup/Pickup';

function App() {
  const dispatch = useDispatch();

  window.onpopstate = function(event) {
    if (window.location.pathname === "/") {
      dispatch(changePage('main'));
    } else if (window.location.pathname === "/main") {
      dispatch(changePage('main'));
    } else if (window.location.pathname === "/pickup") {
      dispatch(changePage('pickup'));
    } else if (window.location.pathname === "/present") {
      dispatch(changePage('present'));
    } else {
      dispatch(changePage('main'));
    } 
  }

  if (window.location.pathname === "/") {
    dispatch(changePage('main'));
  } else if (window.location.pathname === "/main") {
    dispatch(changePage('main'));
  } else if (window.location.pathname === "/pickup") {
    dispatch(changePage('pickup'));
  } else if (window.location.pathname === "/present") {
    dispatch(changePage('present'));
  } else {
    dispatch(changePage('main'));
  } 

  return (
    <Router>
      <div>
        <Header></Header>
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
