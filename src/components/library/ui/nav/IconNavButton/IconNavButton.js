import './IconNavButton.css';

export default function IconNavButton(props) {
    if (props.isOn) {
        return (
            <button className='icon-nav-button'>
                <img src={props.onImage} className='icon-nav-button-image'></img>
            </button>
        )
    } else {
        return (
            <button className='icon-nav-button' onClick={() => props.navEvent(props.pageName)}>
                <img src={props.offImage} className='icon-nav-button-image'></img>
            </button>
        )
    }
}