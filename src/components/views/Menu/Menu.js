import './Menu.css';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import MenuOptionButton from '../../library/menu/MenuOptionButton/MenuOptionButton';
import MenuContents from '../../library/menu/MenuContents/MenuContents';

export default function Menu() {
    return (
        <div className='page'>
            <Header></Header>
            <MenuContents></MenuContents>
            <MenuOptionButton></MenuOptionButton>
            <Footer></Footer>
        </div>
    )
} 
