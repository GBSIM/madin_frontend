import './MobileNavBar.css';

import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { changePage } from '../../../../../_reducers/nav';

import IconNavButton from '../IconNavButton/IconNavButton';

export default function MobileNavBar(props) {
    const {page} = useSelector(state => state.nav);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navPageEvent = (nextPage) => {
        dispatch(changePage(nextPage));
        navigate('/'+nextPage);
        window.scrollTo(0,0);
    }

    return (
        <div className='mobile-nav-bar'>
            <IconNavButton isOn={page==='about'} navEvent={navPageEvent} pageName='about' 
                     onImage={require('../../../icons/home_orange.png')} offImage={require('../../../icons/home_grey.png')}></IconNavButton>
            <IconNavButton isOn={page==='browse'} navEvent={navPageEvent} pageName='browse' 
                     onImage={require('../../../icons/browse_orange.png')} offImage={require('../../../icons/browse_grey.png')}></IconNavButton>
            <IconNavButton isOn={page==='menu'} navEvent={navPageEvent} pageName='menu' 
                     onImage={require('../../../icons/menu_orange.png')} offImage={require('../../../icons/menu_grey.png')}></IconNavButton>
            <IconNavButton isOn={page==='order'} navEvent={navPageEvent} pageName='order' 
                     onImage={require('../../../icons/order_orange.png')} offImage={require('../../../icons/order_grey.png')}></IconNavButton>
        </div>
    )
}