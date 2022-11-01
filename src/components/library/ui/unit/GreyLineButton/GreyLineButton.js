import './GreyLineButton.css';

export default function GreyLineButton(props) {
    return (
        <button className='grey-line-button' onClick={() => props.clickEvent()}>
            <span className='grey-line-button-text'>{props.text}</span>
        </button>
    )
}