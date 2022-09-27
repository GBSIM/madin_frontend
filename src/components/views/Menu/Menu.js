import './Menu.css';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import MenuOptionButton from '../../library/menu/MenuOptionButton/MenuOptionButton';
import MenuContents from '../../library/menu/MenuContents/MenuContents';
import MobileMenuContents from '../../library/menu/MobileMenuContents/MobileMenuContents';

export default function Menu() {
    return (
        <div className='page menu'>
            <Header></Header>
            <MenuContents></MenuContents>
            <MobileMenuContents></MobileMenuContents>
            <MenuOptionButton></MenuOptionButton>
            <Footer></Footer>
        </div>
    )
} 
