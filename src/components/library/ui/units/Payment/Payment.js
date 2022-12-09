import './Payment.css';
import './PayMethod.css';

import { useSelector,useDispatch } from 'react-redux';

import { savePay } from '../../../../../_reducers/user';

export default function Payment() {
    const dispatch = useDispatch();
    const { pay } = useSelector(state => state.user);

    const choosePaymentMethod = (method) => {
        dispatch(savePay(method));
    }

    return (
        <div className='payment'>
            <h1 className='payment-title'>결제방법</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            <div style={{'minHeight':'20px'}}></div>
            <div className='payment-methods-container'>
                <PayMethod 
                    isOn={pay==='kakao'}
                    title='카카오 페이' 
                    offImage={require('../../../icons/kakao_grey.png')}
                    onImage={require('../../../icons/kakao.png')}
                    onBackgroundColor='#FEE500'
                    onColor='#141414'
                    clickEvent={choosePaymentMethod}
                    clickEventInput='kakao'></PayMethod>
                <PayMethod 
                    isOn={pay==='naver'}
                    title='네이버 페이' 
                    offImage={require('../../../icons/naver_grey.png')}
                    onImage={require('../../../icons/naver_white.png')}
                    onBackgroundColor='#03C75A'
                    onColor='#fff'
                    clickEvent={choosePaymentMethod}
                    clickEventInput='naver'></PayMethod>
            </div>
            <div style={{'minHeight':'20px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#eee'}}></div>
        </div>
    )
}

function PayMethod(props){
    if (props.isOn) {
        return (
            <button className='pay-method on' style={{'background':props.onBackgroundColor}}>
                 <img src={props.onImage} className='pay-method-image' alt='pay-logo'></img>
                 <div className='pay-method-title-container'>
                    <span className='pay-method-title' style={{'color':props.onColor}}>{props.title}</span>
                 </div>
            </button>
        )
    } else {
        return (
            <button className='pay-method' onClick={() => props.clickEvent(props.clickEventInput)}>
                 <img src={props.offImage} className='pay-method-image' alt='pay-logo'></img>
                 <div className='pay-method-title-container'>
                    <span className='pay-method-title'>{props.title}</span>
                 </div>
            </button>
        )
    }
    
}