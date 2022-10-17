import './TextNavButton.css';

export default function TextNavButton(props) {
    let NavMenuText;
    if (props.isOn) {
        NavMenuText = 
            <button className='nav-menu'>
                <span className='nav-menu-text' style={{color:'#EA5B30'}}>{props.text}</span>
            </button>
    } else {
        NavMenuText = 
            <button className='nav-menu' onClick={() => props.navEvent(props.pageName)}>
                <span className='nav-menu-text' style={{color:'#CACACA'}}>{props.text}</span>
            </button>
    }
    return (    
        <div className='nav-menu-container'>
            {NavMenuText}
        </div>
    )
}