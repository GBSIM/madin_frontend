import './Personal.css';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';
import MenuBlock from '../../library/ui/unit/MenuBlock/MenuBlock';

export default function Personal() {
    return (
        <div className='page'>
            <Header></Header>
            <Banner></Banner>
            <MenuBlock></MenuBlock>
            <Footer></Footer>
        </div>
    )
}
