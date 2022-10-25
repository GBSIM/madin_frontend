import './Pickup.css';

import { UserAuth } from '../../library/function/Auth';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';

export default function Pickup() {
    UserAuth();

    return (
        <div className='page'>
            <Header></Header>
            <Banner></Banner>
            <Footer></Footer>
        </div>
    )
}
