import './Personal.css';

import axios from 'axios';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';
import MenuBlock from '../../library/ui/unit/MenuBlock/MenuBlock';

export default function Personal() {
    axios.get('https://api.madinbakery.com/menuclass').then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })

    return (
        <div className='page'>
            <Header></Header>
            <Banner></Banner>
            <MenuBlock></MenuBlock>
            <Footer></Footer>
        </div>
    )
}
