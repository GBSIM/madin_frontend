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
import UserOrder from './components/views/User/UserOrder';
import UserShipping from './components/views/User/UserShipping';
import UserCoupon from './components/views/User/UserCoupon';
import Item from './components/views/Item/Item';
import LikesPages from './components/views/LikesPage/LikesPage';

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
    } else if (window.location.pathname === "/user") {
      dispatch(changePage('user'));
    } else if (window.location.pathname === "/user/order") {
      dispatch(changePage('user'));
    } else if (window.location.pathname === "/user/shipping") {
      dispatch(changePage('user'));
    } else if (window.location.pathname === "/user/coupon") {
      dispatch(changePage('user'));
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
  } else if (window.location.pathname === "/user") {
    dispatch(changePage('user'));
  } else if (window.location.pathname === "/user/order") {
    dispatch(changePage('user'));
  } else if (window.location.pathname === "/user/shipping") {
    dispatch(changePage('user'));
  } else if (window.location.pathname === "/user/coupon") {
    dispatch(changePage('user'));
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
          <Route exact path="/user/order" element={<UserOrder/>} />
          <Route exact path="/user" element={<UserOrder/>} />
          <Route exact path="/user/shipping" element={<UserShipping/>} />
          <Route exact path="/user/coupon" element={<UserCoupon/>} />
          <Route exact path="/item/:id" element={<Item/>} />
          <Route exact path="/likes" element={<LikesPages/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
