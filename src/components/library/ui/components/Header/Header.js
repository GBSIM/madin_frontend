import './Header.css';
import './DesktopHeader.css';
import './DesktopNavContainer.css';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TextNavButton from '../../units/TextNavButton/TextNavButton';

import { changePage } from '../../../../../_reducers/nav';

export default function Header() {
    return (
        <div className='header'>
            <DesktopHeader />
        </div>
    )
}

function DesktopHeader() {
    return (
        <div className='desktop-header'>
            <div className='desktop-header-brand-icon-container'>

            </div>
            <div className='desktop-header-nav-container'>
                <DesktopNavContainer />
            </div>
            <div className='desktop-header-spacer'></div>
            <div className='desktop-header-account-container'>
                
            </div>
        </div>
    )
}

function DesktopNavContainer() {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { page } = useSelector(state => state.nav);

    const movePage = (nextPage) => {
        dispath(changePage(nextPage));
        navigate('/'+nextPage);
        window.scrollTo(0,0);
    }

    return (
        <div className='desktop-nav-container'>
            <TextNavButton isOn={page==='main'} text='개인구매' clickEvent={movePage} clickEventInput={'main'}></TextNavButton>
            <div className='desktop-nav-button-divider'></div>
            <TextNavButton isOn={page==='present'} text='선물하기' clickEvent={movePage} clickEventInput={'present'}></TextNavButton>
            <div className='desktop-nav-button-divider'></div>
            <TextNavButton isOn={page==='pickup'} text='픽업예약' clickEvent={movePage} clickEventInput={'pickup'}></TextNavButton>
        </div>
    )
}