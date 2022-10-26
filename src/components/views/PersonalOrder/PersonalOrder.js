import './PersonalOrder.css';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import PersonalOrderMenus from '../../library/ui/personalorder/PersonalOrderMenus/PersonalOrderMenus';

export default function PersonalOrder() {
    return (
        <div className='page'>
            <Header></Header>
            <div className='order-contents-container'>
                <PersonalOrderMenus></PersonalOrderMenus>
            </div>
            <Footer></Footer>
        </div>
    )
}