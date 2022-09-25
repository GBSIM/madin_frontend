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

import About from './components/views/About/About';
import Browse from './components/views/Browse/Browse';
import Menu from './components/views/Menu/Menu';
import Order from './components/views/Order/Order';

function App() {
  const dispatch = useDispatch();

  window.onpopstate = function(event) {
    console.log("뒤로가기");
    if (window.location.pathname === "/") {
      dispatch(changePage('about'));
    } else if (window.location.pathname === "/about") {
      dispatch(changePage('about'));
    } else if (window.location.pathname === "/browse") {
      dispatch(changePage('browse'));
    } else if (window.location.pathname === "/menu") {
      dispatch(changePage('menu'));
    } else if (window.location.pathname === "/order") {
      dispatch(changePage('order'));
    } 
  }

  if (window.location.pathname === "/about") {
    dispatch(changePage('about'));
  } else if (window.location.pathname === "/browse") {
    dispatch(changePage('browse'));
  } else if (window.location.pathname === "/menu") {
    dispatch(changePage('menu'));
  } else if (window.location.pathname === "/order") {
    dispatch(changePage('order'));
  } else {
    dispatch(changePage('about'));
  }

  dispatch(initMenuData());

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
