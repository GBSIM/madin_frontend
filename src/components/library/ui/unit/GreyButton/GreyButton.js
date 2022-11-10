import './GreyButton.css';

export default function GreyButton(props) {
    if (props.isFlex) {
        return (
            <div className='grey-button-container'>
                <button className='grey-button' style={{width:'100%',height:props.height,borderRadius:props.borderRadius}}>
                    <span className='grey-button-text'>{props.text}</span>
                </button>
            </div>
        )
    } else {
        return (
            <div className='grey-button-container'>
                <button className='grey-button' style={{width:props.width,height:props.height,borderRadius:props.borderRadius}}>
                    <span className='grey-button-text'>{props.text}</span>
                </button>
            </div>
        )
    }
    
}