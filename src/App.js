import './default.css';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { changePage } from './_reducers/nav';
import { saveMenuClass } from './_reducers/menu';
import { KakaoRedirectHandler } from './components/library/function/KakaoLogin';

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

  useEffect(() => {
      const loadMenu  = async() => {
          try {
              const response = await axios.get('https://api.madinbakery.com/menuclass');
              dispatch(saveMenuClass(response.data.menuClass));
          } catch(err) {
              console.log(err);
          }
      };
      loadMenu();
  }, []);

  const href = window.location.href;
  let params = new URL(href).searchParams;
  let code = params.get("code");
  if (code != null) {
      KakaoRedirectHandler();
  }

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
