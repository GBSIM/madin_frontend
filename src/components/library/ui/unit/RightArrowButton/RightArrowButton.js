import './RightArrowButton.css';

export default function RightArrowButton(props) {
    return (
        <button className='right-arrow-button' onClick={() => props.clickEvent()}>
            <img className='right-arrow-button-image' src={require('../../../icons/arrow_right_white.png')}></img>
        </button>
    )
}