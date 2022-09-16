import './OrangeButton.css';

export default function OrangeButton(props) {
    return (
        <div className='orange-button-container'>
            <button className='orange-button' style={{width:props.width,height:props.height,borderRadius:props.borderRadius}}>
                <span className='orange-button-text'>{props.text}</span>
            </button>
        </div>
    )
}