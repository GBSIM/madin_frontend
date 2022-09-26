import './GreyTextButton.css';

export default function GreyTextButton(props) {
    return (
        <button className='grey-text-button' onClick={() => props.clickEvent(props.clickInput)}>
            <span className='grey-text-button-text'>
                {props.text}
            </span>
        </button>
    )
}