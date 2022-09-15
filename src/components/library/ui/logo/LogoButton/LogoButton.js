import './LogoButton.css';

import { useNavigate } from 'react-router-dom';

export default function LogoButton(props) {
    const navigate = useNavigate();
    const navPageEvent = () => {
        navigate('/about');
        window.scrollTo(0,0);
    }

    return (
        <button className='logo-button' style={{width:props.width}} onClick={() => navPageEvent()}>
            <img src={require('../../../images/madin_logo.png')}></img>
        </button>
    )
}