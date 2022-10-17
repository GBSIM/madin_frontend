import './DesktopNavbar.css';

import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { changePage } from '../../../../../_reducers/nav';

import TextNavButton from '../TextNavButton/TextNavButton';

export default function Navbar() {
    const {page} = useSelector(state => state.nav);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navPageEvent = (nextPage) => {
        dispatch(changePage(nextPage));
        navigate('/'+nextPage);
        window.scrollTo(0,0);
    }

    return (
        <div className='nav-bar'>
            <TextNavButton text='개인구매' isOn={page==='personal'} navEvent={navPageEvent} pageName={'personal'}></TextNavButton>
            <TextNavButton text='답례품' isOn={page==='gruop'} navEvent={navPageEvent} pageName={'group'}></TextNavButton>
            <TextNavButton text='픽업예약' isOn={page==='pickup'} navEvent={navPageEvent} pageName={'pickup'}></TextNavButton>
        </div>
    )
}