import './MobileMenuContents.css';

import { useSelector,useDispatch } from "react-redux";
import { changeMenuType } from '../../../../_reducers/menu';

import OrangeTag from '../../ui/unit/OrangeTag/OrangeTag';
import GreyTextButton from '../../ui/unit/GreyTextButton/GreyTextButton';
import { MenuSwipeLeftButton, MenuSwipeRightButton } from '../MenuContents/MenuContents';

export default function MobileMenuContents() {
    const {menuEnglishName,menuKoreanName,menuDescription1,menuDescription2,tag} = useSelector(state => state.menu);

    return (
        <div className='mobile-menu-contents'>
            <div className='mobile-menu-image-container'>
                <img className='mobile-menu-image' src={require('../../images/lemon_madeleine_mobile.png')}></img>
            </div>
            <div className='mobile-menu-tag-container'>
                <OrangeTag tag={'signature'}></OrangeTag>
            </div>
            <div style={{'flex':'1'}}></div>
            <div className='mobile-menu-text-container'>
                <h2 className='mobile-menu-english-name'>{menuEnglishName}</h2>
                <span className='mobile-menu-korean-name'>{menuKoreanName}</span>
                <div className='mobile-menu-contents-spacer'></div>
                <div>
                    <span className='mobile-menu-description'>{menuDescription1}</span>
                </div>
                <div style={{'minHeight':'5px'}}></div>
                <div>
                    <span className='mobile-menu-description'>{menuDescription2}</span>
                </div>
            </div>
            <div className='mobile-menu-option-button-container'>
                <MobileMenuOptionButton></MobileMenuOptionButton>
            </div>
            <div className='mobile-menu-swipe-button-container'>
                <MenuSwipeLeftButton></MenuSwipeLeftButton>
                <MenuSwipeRightButton></MenuSwipeRightButton>
            </div>
        </div>
    )
}

function MobileMenuOptionButton() {
    const {menuType} = useSelector(state => state.menu);
    const dispatch = useDispatch();
    const menuTypeChangeEvent = (option) => {
        dispatch(changeMenuType(option));
    }
    let optionText;
    let optionChange;
    if (menuType === '디저트') {
        optionText = '음료 메뉴 보기';
        optionChange = '음료';
    } else {
        optionText = '디저트 메뉴 보기';
        optionChange = '디저트';
    }

    return (
        <GreyTextButton text={optionText} clickEvent={menuTypeChangeEvent} clickInput={optionChange}></GreyTextButton>
    )
}