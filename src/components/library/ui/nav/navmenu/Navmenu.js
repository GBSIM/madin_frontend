import './Navmenu.css';

export default function Navmenu(props) {

    let NavMenuText;
    if (props.isOn) {
        NavMenuText = <span className='nav-menu-text' style={{color:'#EA5B30'}}>{props.text}</span>
    } else {
        NavMenuText = <span className='nav-menu-text' style={{color:'#666666'}}>{props.text}</span>
    }
    return (    
        <div className='nav-menu-container'>
            <button className='nav-menu'>
                {NavMenuText}
            </button>
        </div>
    )
}