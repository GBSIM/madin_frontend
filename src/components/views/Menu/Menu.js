import './Menu.css';

import { useSelector,useDispatch } from "react-redux";
import { changeMenuType } from '../../../_reducers/menu';
import { changePage } from '../../../_reducers/nav';
import { useNavigate } from 'react-router-dom';

import DesktopHeader from '../../library/ui/header/DesktopHeader/DesktopHeader';
import OrangeButton from '../../library/ui/unit/OrangeButton/OrangeButton';
import OptionButton from '../../library/ui/unit/OptionButton/OptionButton';
import PictureButton from '../../library/ui/unit/PictureButton/PictureButton';

export default function Menu() {
    const {menuType} = useSelector(state => state.menu);
    const dispatch = useDispatch();
    const menuTypeChangeEvent = (option) => {
        dispatch(changeMenuType(option));
    }
    const navigate = useNavigate();
    const moveToOrder = () => {
        dispatch(changePage('order'));
        navigate('/order');
        window.scrollTo(0,0);
    }

    return (
        <div className='page'>
            <DesktopHeader></DesktopHeader>
            <div className='menu-frame-container'>
                <div className='menu-container'>
                    <div className='menu-contents-container'>
                        <h1 className='menu-title'>Lemon Madeleine</h1>
                        <span className='menu-subtitle'>레몬 마들렌</span>
                        <div style={{height:'60px'}}></div>
                        <span className='menu-contents'>상큼한 레몬과 달콤한 마들렌의 조합</span>
                        <div style={{height:'5px'}}></div>
                        <span className='menu-contents'>마딘의 시그니쳐 메뉴에요.</span>
                        <div style={{height:'30px'}}></div>
                        <span className='menu-contents'>마딘의 첫 오픈부터 지금까지</span>
                        <div style={{height:'5px'}}></div>
                        <span className='menu-contents'>가장 많이 사랑 받는 디저트입니다.</span>
                        <div style={{height:'70px'}}></div>
                        <OrangeButton height='50px' width='180px' text='주문하러가기' borderRadius='5px' clickEvent={moveToOrder}></OrangeButton>
                    </div>
                    <div className='menu-picture-frame-container'>
                        <div className='menu-picture-container'>
                            <img className='menu-picture' src={require('../../library/images/lemon_madeliene.jpeg')}></img>
                        </div>
                        <div className='menu-picture-button-container'>
                            <PictureButton type='left'></PictureButton>
                            <PictureButton type='right'></PictureButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className='menu-type-container'>
                <OptionButton state={menuType} option1={'디저트'} option2={'음료'} clickEvent={menuTypeChangeEvent}></OptionButton>
            </div>
        </div>
    )
}
