import './Navbar.css';

import Navmenu from '../navmenu/Navmenu';

export default function Navbar() {
    return (
        <div className='nav-bar'>
            <Navmenu text='ABOUT' isOn={true}></Navmenu>
            <Navmenu text='BROWSE' isOn={false}></Navmenu>
            <Navmenu text='MENU' isOn={false}></Navmenu>
            <Navmenu text='ORDER' isOn={false}></Navmenu>
            <Navmenu text='LOGIN' isOn={false}></Navmenu>
        </div>
    )
}