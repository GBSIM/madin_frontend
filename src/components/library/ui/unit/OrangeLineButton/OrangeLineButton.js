import './OrangeLineButton.css';

export default function OrangeLineButton(props) {
    if (props.isHoverEffectInhibited) {
        return (
            <div className='orange-line-button-container'>
                <button className='orange-line-button unhover' style={{width:props.width,height:props.height,borderRadius:props.borderRadius}} onClick={() => props.clickEvent()}>
                    <span className='orange-line-button-text'>{props.text}</span>
                </button>
            </div>
        )
    } else {
        return (
            <div className='orange-line-button-container'>
                <button className='orange-line-button' style={{width:props.width,height:props.height,borderRadius:props.borderRadius}} onClick={() => props.clickEvent()}>
                    <span className='orange-line-button-text'>{props.text}</span>
                </button>
            </div>
        )
    }
    
}