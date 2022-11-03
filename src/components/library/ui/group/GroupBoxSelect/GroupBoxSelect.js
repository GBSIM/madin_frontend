import './GroupBoxSelect.css';

import { useDispatch, useSelector } from 'react-redux';

import { changeGroupOrderBoxSize, addGroupOrderBoxQuantity, subtractGroupOrderBoxQuantity } from '../../../../../_reducers/order';

import OrangeButton from '../../unit/OrangeButton/OrangeButton';

export default function GroupBoxSelect() {
    const { groupOrderBoxSize, groupOrderBoxQuantity } = useSelector(state => state.order);
    let mostExpenstiveMenuPrice = 4000;
    let mostCheapMenuPrice = 3000;

    const dispatch = useDispatch();
    const plusButtonEvent = () => {
        dispatch(addGroupOrderBoxQuantity());
    }
    const minusButtonEvent = () => {
        dispatch(subtractGroupOrderBoxQuantity());
    }

    return (
        <div className='group-box-select-container'>
            <h2 className='group-box-select-title'>세트 고르기</h2>
            <div style={{'minHeight':'20px'}}></div>
            <span className='group-box-select-intro'>필요한 개수에 맞게 박스를 선택해주세요.</span>
            <div style={{'minHeight':'5px'}}></div>
            <span className='group-box-select-intro'>가격은 안에 담는 디저트에 따라 달라져요.</span>
            <div style={{'minHeight':'50px'}}></div>
            <div className='group-box-select-box-container'>
                <BoxSelect  
                    highestPrice={mostExpenstiveMenuPrice} 
                    lowestPrice={mostCheapMenuPrice} 
                    isChecked={groupOrderBoxSize===3}
                    size={3}></BoxSelect>
                <BoxSelect 
                    highestPrice={mostExpenstiveMenuPrice} 
                    lowestPrice={mostCheapMenuPrice} 
                    isChecked={groupOrderBoxSize===4}
                    size={4}></BoxSelect>
                <BoxSelect 
                    highestPrice={mostExpenstiveMenuPrice} 
                    lowestPrice={mostCheapMenuPrice} 
                    isChecked={groupOrderBoxSize===5}
                    size={5}></BoxSelect>
                <BoxSelect 
                    highestPrice={mostExpenstiveMenuPrice} 
                    lowestPrice={mostCheapMenuPrice} 
                    isChecked={groupOrderBoxSize===6}
                    size={6}></BoxSelect>
            </div>
            <div style={{'minHeight':'60px'}}></div>
            <div className='group-box-quantity-select-container'>
                <button className='group-box-quantity-button' onClick={() => minusButtonEvent()}>
                    <img className='group-box-quantity-button-image' src={require('../../../icons/minus_white.png')}></img>
                </button>
                <h1 className='group-box-quantity'>{groupOrderBoxQuantity} BOX</h1>
                <button className='group-box-quantity-button' onClick={() => plusButtonEvent()}>
                    <img className='group-box-quantity-button-image' src={require('../../../icons/plus_white.png')}></img>
                </button>
            </div>
            <div style={{'minHeight':'30px'}}></div>
            <span className='group-box-select-result'>{groupOrderBoxSize} in One 박스 {groupOrderBoxQuantity}개</span>
            <div style={{'minHeight':'10px'}}></div>
            <OrangeButton width='350px' height='50px' text='메뉴 고르러 가기' borderRadius='7px'></OrangeButton>
        </div>
    )
}

function BoxSelect(props) {
    const dispatch = useDispatch();
    const boxCheckEvent = () => {
        dispatch(changeGroupOrderBoxSize(props.size));
    }

    let CheckBox;
    if (props.isChecked) {
        CheckBox = 
        <button className='box-select-check-box checked'>
            <img className='box-select-check-box-image' src={require('../../../icons/check_orange.png')} alt='check'></img>
        </button>
    } else {
        CheckBox = 
        <button className='box-select-check-box' onClick={() => boxCheckEvent()}>
            <img className='box-select-check-box-image' src={require('../../../icons/check_grey.png')} alt='check'></img>
        </button>
    }

    return (
        <div className='box-select-container'>
            <div className='box-select'>
                <img className='box-select-image' alt={props.size}></img>
                {CheckBox}
            </div>
            <div style={{'minHeight':'7px'}}></div>
            <span className='box-select-name'>{props.size} in One 박스</span>
            <div style={{'minHeight':'3px'}}></div>
            <span className='box-select-price-range'>{(props.lowestPrice*props.size).toLocaleString()} ~ {(props.highestPrice*props.size).toLocaleString()}원</span>
        </div>
    )
}