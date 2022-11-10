import './OrangeButton.css';

export default function OrangeButton(props) {
    if (props.isFlex) {
        return (
            <div className='orange-button-container'>
                <button className='orange-button' style={{width:'100%',height:props.height,borderRadius:props.borderRadius}} onClick={() => props.clickEvent()}>
                    <span className='orange-button-text'>{props.text}</span>
                </button>
            </div>
        )
    } else {
        return (
            <div className='orange-button-container'>
                <button className='orange-button' style={{width:props.width,height:props.height,borderRadius:props.borderRadius}} onClick={() => props.clickEvent()}>
                    <span className='orange-button-text'>{props.text}</span>
                </button>
            </div>
        )
    }
    
}