import './GreyLineTagButton.css';

export default function GreyLineTagButton(props) {
    return (
        <button className='grey-line-tag-button' onClick={() => props.clickEvent()}>
            <span className='grey-line-tag-button-text'>{props.text}</span>
        </button>
    )
}