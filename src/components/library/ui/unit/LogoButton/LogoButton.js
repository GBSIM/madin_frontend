import './LogoButton.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { changePage } from '../../../../../_reducers/nav';

export default function LogoButton(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navPageEvent = () => {
        dispatch(changePage('personal'));
        navigate('/personal');
        window.scrollTo(0,0);
    }

    return (
        <button className='logo-button' style={{width:props.width}} onClick={() => navPageEvent()}>
            <img src={require('../../../images/madin_logo.png')}></img>
        </button>
    )
}