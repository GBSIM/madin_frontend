import './default.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { changePage } from './_reducers/nav';
import { initMenuData } from './_reducers/menu';

import Personal from './components/views/Personal/Personal';
import Group from './components/views/Group/Group';
import Pickup from './components/views/Pickup/Pickup';

function App() {
  const dispatch = useDispatch();

  window.onpopstate = function(event) {
    console.log("뒤로가기");
    if (window.location.pathname === "/") {
      dispatch(changePage('personal'));
    } else if (window.location.pathname === "/personal") {
      dispatch(changePage('personal'));
    } else if (window.location.pathname === "/pickup") {
      dispatch(changePage('pickup'));
    } else if (window.location.pathname === "/group") {
      dispatch(changePage('group'));
    } else {
      dispatch(changePage('personal'));
    } 
  }

  if (window.location.pathname === "/personal") {
    dispatch(changePage('personal'));
  } else if (window.location.pathname === "/pickup") {
    dispatch(changePage('pickup'));
  } else if (window.location.pathname === "/group") {
    dispatch(changePage('group'));
  } else {
    dispatch(changePage('personal'));
  }

  dispatch(initMenuData());

  return (
    <Router>
      <div>
        <Routes>  
          <Route exact path="/" element={<Personal/>} />
          <Route exact path="/personal" element={<Personal/>} />
          <Route exact path="/group" element={<Group/>} />
          <Route exact path="/pickup" element={<Pickup/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
