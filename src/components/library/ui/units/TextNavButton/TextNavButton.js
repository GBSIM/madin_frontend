import './TextNavButton.css';

export default function TextNavButton(props) {
    let ButtonText;
    if (props.isOn) {
        ButtonText = <span className='text-nav-button-text on'>{props.text}</span>
    } else {
        ButtonText = <span className='text-nav-button-text off'>{props.text}</span>
    }
    return (
        <button className='text-nav-button' onClick={() => props.clickEvent(props.clickEventInput)}>
            {ButtonText}
        </button>
    )
}