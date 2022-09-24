import './TwoOptionsButton.css';

export default function TwoOptionsButton(props) {
    if (props.state === props.option1) {
        return (
            <div className='option-button-container'>
                <button className='option-button on'>
                    <span className='option-button-text on'>{props.option1}</span>
                </button>
                <button className='option-button off' onClick={() => props.clickEvent(props.option2)}>
                    <span className='option-button-text off'>{props.option2}</span>
                </button>
            </div>
        )
    } else {
        return (
            <div className='option-button-container'>
                <button className='option-button off' onClick={() => props.clickEvent(props.option1)}>
                    <span className='option-button-text off'>{props.option1}</span>
                </button>
                <button className='option-button on'>
                    <span className='option-button-text on'>{props.option2}</span>
                </button>
            </div>
        )
    }

    
}