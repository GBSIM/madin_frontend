import './Footer.css';
import './MobileFooter.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { changePage } from '../../../../../_reducers/nav';

import IconNavButton from '../../units/IconNavButton/IconNavButton';

export default function Footer() {
    return (
        <div className='footer'>
            <MobileFooter></MobileFooter>
        </div>
    )
}

function MobileFooter(props) {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { page } = useSelector(state => state.nav);

    const movePage = (nextPage) => {
        dispath(changePage(nextPage));
        navigate('/'+nextPage);
        window.scrollTo(0,0);
    }
    return (
        <div className='mobile-footer'>
            <IconNavButton
                activatedImage={require('../../../icons/delivery_orange.png')}
                deactivatedImage={require('../../../icons/delivery_grey.png')}
                text='delivery'
                isActivated={page==='main'}
                clickEvent={movePage}
                clickEventInput='main'></IconNavButton>
            <IconNavButton
                activatedImage={require('../../../icons/present_orange.png')}
                deactivatedImage={require('../../../icons/present_grey.png')}
                text='present'
                isActivated={page==='present'}
                clickEvent={movePage}
                clickEventInput='present'></IconNavButton>
            <IconNavButton
                activatedImage={require('../../../icons/pickup_orange.png')}
                deactivatedImage={require('../../../icons/pickup_grey.png')}
                text='pickup'
                isActivated={page==='pickup'}
                clickEvent={movePage}
                clickEventInput='pickup'></IconNavButton>
            <IconNavButton
                activatedImage={require('../../../icons/user_orange.png')}
                deactivatedImage={require('../../../icons/user_grey.png')}
                text='My'
                isActivated={page==='user'}
                clickEvent={movePage}
                clickEventInput='user'></IconNavButton>
        </div>
    )
}