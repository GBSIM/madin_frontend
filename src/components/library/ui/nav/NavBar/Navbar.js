import './Navbar.css';

import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { changePage } from '../../../../../_reducers/nav';

import Navmenu from '../NavMenu/Navmenu';

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
            <Navmenu text='ABOUT' isOn={page==='about'} navEvent={navPageEvent} pageName={'about'}></Navmenu>
            <Navmenu text='BROWSE' isOn={page==='browse'} navEvent={navPageEvent} pageName={'browse'}></Navmenu>
            <Navmenu text='MENU' isOn={page==='menu'} navEvent={navPageEvent} pageName={'menu'}></Navmenu>
            <Navmenu text='ORDER' isOn={page==='order'} navEvent={navPageEvent} pageName={'order'}></Navmenu>
            <Navmenu text='LOGIN' isOn={page==='login'} navEvent={navPageEvent} pageName={'login'}></Navmenu>
        </div>
    )
}