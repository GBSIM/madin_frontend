import './default.css';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { changePage } from './_reducers/nav';

import Main from './components/views/Main/Main';
import Present from './components/views/Present/Present';
import Pickup from './components/views/Pickup/Pickup';
import DeliveryCart from './components/views/Cart/DeliveryCart';
import DeliveryOrder from './components/views/Order/DeliveryOrder';

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
    } else if (window.location.pathname === "/cart/devliery") {
      dispatch(changePage('main'));
    } else if (window.location.pathname === "/order/devliery") {
      dispatch(changePage('main'));
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
  } else if (window.location.pathname === "/cart/delivery") {
    dispatch(changePage('main'));
  } else if (window.location.pathname === "/order/delivery") {
    dispatch(changePage('main'));
  } else {
    dispatch(changePage('main'));
  } 

  return (
    <Router>
      <div>
        <Routes>  
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/main" element={<Main/>} />
          <Route exact path="/present" element={<Present/>} />
          <Route exact path="/pickup" element={<Pickup/>} />
          <Route exact path="/cart/delivery" element={<DeliveryCart/>} />
          <Route exact path="/order/delivery" element={<DeliveryOrder/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
