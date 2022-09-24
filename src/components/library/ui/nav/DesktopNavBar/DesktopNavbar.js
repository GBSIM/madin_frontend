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
            <TextNavButton text='ABOUT' isOn={page==='about'} navEvent={navPageEvent} pageName={'about'}></TextNavButton>
            <TextNavButton text='BROWSE' isOn={page==='browse'} navEvent={navPageEvent} pageName={'browse'}></TextNavButton>
            <TextNavButton text='MENU' isOn={page==='menu'} navEvent={navPageEvent} pageName={'menu'}></TextNavButton>
            <TextNavButton text='ORDER' isOn={page==='order'} navEvent={navPageEvent} pageName={'order'}></TextNavButton>
            <TextNavButton text='LOGIN' isOn={page==='login'} navEvent={navPageEvent} pageName={'login'}></TextNavButton>
        </div>
    )
}