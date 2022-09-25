import './MenuContents.css';

import { useSelector,useDispatch } from "react-redux";
import { changePage } from '../../../../_reducers/nav';
import { useNavigate } from 'react-router-dom';

import OrangeButton from '../../ui/unit/OrangeButton/OrangeButton';

export default function MenuContents() {
    const {menuEnglishName,menuKoreanName,
           menuDescription1,menuDescription2,menuDescription3,menuDescription4} = useSelector(state => state.menu);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const moveToOrder = () => {
        dispatch(changePage('order'));
        navigate('/order');
        window.scrollTo(0,0);
    }

    return (
        <div className='menu-frame-container'>
            <div className='menu-container'>
                <div className='menu-contents-container'>
                    <h1 className='menu-title'>{menuEnglishName}</h1>
                    <span className='menu-subtitle'>{menuKoreanName}</span>
                    <div style={{height:'60px'}}></div>
                    <span className='menu-contents'>{menuDescription1}</span>
                    <div style={{height:'5px'}}></div>
                    <span className='menu-contents'>{menuDescription2}</span>
                    <div style={{height:'30px'}}></div>
                    <span className='menu-contents'>{menuDescription3}</span>
                    <div style={{height:'5px'}}></div>
                    <span className='menu-contents'>{menuDescription4}</span>
                    <div style={{height:'60px'}}></div>
                    <OrangeButton height='50px' width='180px' text='주문하러가기' borderRadius='5px' clickEvent={moveToOrder}></OrangeButton>
                </div>
                <div className='menu-picture-frame-container'>
                    <div className='menu-picture-container'>
                        <img className='menu-picture' src={require('../../../library/images/lemon_madeliene.jpeg')}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}