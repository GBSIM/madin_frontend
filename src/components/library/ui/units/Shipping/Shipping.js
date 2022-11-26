import './Shipping.css';
import './ShippingInfo.css';
import './ShippingAddButton.css';

export default function Shipping(props) {
    let ShippingInfos;
    if (props.shippings.length > 0) {
        ShippingInfos = props.shippings.map((shipping) => (
            <Shipping
                name={shipping["tag"]}
                address={shipping["basicAderess"]+shipping["detailAddress"]}
                phone={shipping["phone"]}
                receiver={shipping["name"]}></Shipping>
        ))
    } else {
        ShippingInfos = 
            <span className='shipping-infos-guide'>
                아직 등록된 배송지가 없어요.
            </span>
    }

    return (
        <div className='shipping'>
            <h1 className='shipping-title'>배송지</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            <div style={{'minHeight':'20px'}}></div>
            {ShippingInfos}
            <div style={{'minHeight':'20px'}}></div>
            <ShippingAddButton></ShippingAddButton>
        </div>
    )
}

function ShippingInfo(props) {
    return (
        <div className='shipping-info'>
            <div className='shipping-info-left-container'>
                <div className='shipping-info-name-container'>
                    <span className='shipping-info-name'>{props.name}</span>
                </div>
                <div style={{'minHeight':'10px'}}></div>
                <div className='shipping-info-text'>{props.address}</div>
                <div style={{'minHeight':'5px'}}></div>
                <div className='shipping-info-text'>{props.receiver}, {props.phone}</div>
                <div style={{'minHeight':'5px'}}></div>
                <div className='shipping-info-text'>{props.request}</div>
            </div>
            <div style={{'flex':'1'}}></div>
            <div className='shipping-info-right-container'>
                <button className='shipping-info-check-button'>
                    <img 
                        className='shipping-info-check-button-image'
                        src={require('../../../icons/check_grey.png')}
                        alt='check'></img>
                </button>
            </div>
        </div>
    )
}

function ShippingAddButton() {
    return (
        <button className='shipping-add-button'>
            <img className='shipping-add-button-image' src={require('../../../icons/plus_grey.png')}></img>
            <span className='shipping-add-button-guide'>새로운 주소 추가하기</span>
        </button>
    )
}