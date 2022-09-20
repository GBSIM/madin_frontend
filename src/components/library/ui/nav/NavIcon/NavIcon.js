import './NavIcon.css';

export default function NavIcon(props) {
    if (props.isOn) {
        return (
            <button className='nav-icon'>
                <img src={props.onImage} className='nav-icon-image'></img>
            </button>
        )
    } else {
        return (
            <button className='nav-icon' onClick={() => props.navEvent(props.pageName)}>
                <img src={props.onImage} className='nav-icon-image'></img>
            </button>
        )
    }
}