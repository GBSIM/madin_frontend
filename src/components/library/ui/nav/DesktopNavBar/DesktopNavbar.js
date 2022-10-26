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
            <TextNavButton text='개인구매' isOn={page==='personal' || page==='personalorder'} navEvent={navPageEvent} pageName={'personal'}></TextNavButton>
            <div className='nav-bar-divider'></div>
            <TextNavButton text='답례품' isOn={page==='group' || page==='grouporder'} navEvent={navPageEvent} pageName={'group'}></TextNavButton>
            <div className='nav-bar-divider'></div>
            <TextNavButton text='픽업예약' isOn={page==='pickup' || page==='pickuporder'} navEvent={navPageEvent} pageName={'pickup'}></TextNavButton>
        </div>
    )
}