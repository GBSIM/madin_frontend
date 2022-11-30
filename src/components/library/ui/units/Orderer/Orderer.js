import './Orderer.css';

export default function Orderer(props) {
    return (
        <div className='orderer'>
            <h2 className='orderer-title'>주문자 정보</h2>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            <div className='orderer-items-container'>
                <div className='orderer-item'>
                    <span className='orderer-item-text'>보내는 사람</span>
                    <span className='orderer-itme-text'>{props.name}</span>
                </div>
                <div className='orderer-item'>
                    <span className='orderer-item-text'>연락처</span>
                    <span className='orderer-itme-text'>{props.phone}</span>
                </div>
                <div className='orderer-item'>
                    <span className='orderer-item-text'>이메일</span>
                    <span className='orderer-itme-text'>{props.email}</span>
                </div>
            </div>
            <div style={{'width':'100%','minHeight':'1px','background':'#eee'}}></div>
        </div>
    )
}