import './LeftArrowButton.css';

export default function LeftArrowButton(props) {
    return (
        <button className='left-arrow-button' onClick={() => props.clickEvent()}>
            <img className='left-arrow-button-image' src={require('../../../icons/arrow_left_white.png')}></img>
        </button>
    )
}