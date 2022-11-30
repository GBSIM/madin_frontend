import './IconNavButton.css';

export default function IconNavButton(props) {
    if (props.isActivated) {
        return (
            <button className='icon-nav-button' onClick={() => props.clickEvent(props.clickEventInput)}>
                <img className='icon-nav-button-image' src={props.activatedImage} alt={props.text}></img>
                <span className='icon-nav-button-text activated'>{props.text}</span>
            </button>
        )
    } else {
        return (
            <button className='icon-nav-button' onClick={() => props.clickEvent(props.clickEventInput)}>
                <img className='icon-nav-button-image' src={props.deactivatedImage} alt={props.text}></img>
                <span className='icon-nav-button-text deactivated'>{props.text}</span>
            </button>
        )
    }    
}