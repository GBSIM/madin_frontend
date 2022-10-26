import './PersonalOrder.css';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import OrderMenus from '../../library/ui/order/OrderSheet/OrderMenus';

export default function PersonalOrder() {
    return (
        <div className='page'>
            <Header></Header>
            <div className='order-contents-container'>
                <OrderMenus 
                    type='personal'></OrderMenus>
            </div>
            <Footer></Footer>
        </div>
    )
}