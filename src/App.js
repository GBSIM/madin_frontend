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
import { useNavigate } from 'react-router-dom';

import { changePage } from './_reducers/nav';
import { saveMenuClass } from './_reducers/menu';

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
  console.log(code);
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

const KakaoRedirectHandler = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code");
    let grant_type = "authorization_code";
    let client_id = "c49e9d7fad13c64229c3899523a2ba6b";

    axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&code=${code}`
        , {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }).then((res) => {
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      window.Kakao.API.request({
          url: "/v2/user/me",
      }).then(async(data) => {
        console.log(data);
        const userGetResponse = await axios.get('https://api.madinbakery.com/user/'+data.id);
        if (!userGetResponse.data.user) {
          await axios.post('https://api.madinbakery.com/user',{
            "code": data.id,
            "username": data.properties.nickname,
            "email": data.kakao_account.email
          }).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
        }
      }    
    )
  })
  }, [])
};

export default App;
