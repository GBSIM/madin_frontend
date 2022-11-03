import './GreyLineButton.css';

export default function GreyLineButton(props) {
    if (props.isHoverEffectInhibited) {
        return (
            <div className='grey-line-button-container'>
                <button className='grey-line-button unhover' style={{width:props.width,height:props.height,borderRadius:props.borderRadius}} onClick={() => props.clickEvent()}>
                    <span className='grey-line-button-text'>{props.text}</span>
                </button>
            </div>
        )
    } else {
        return (
            <div className='grey-line-button-container'>
                <button className='grey-line-button' style={{width:props.width,height:props.height,borderRadius:props.borderRadius}} onClick={() => props.clickEvent()}>
                    <span className='grey-line-button-text'>{props.text}</span>
                </button>
            </div>
        )
    }
    
}