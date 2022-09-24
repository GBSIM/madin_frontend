import './Order.css';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';

import OrderGuide from '../../library/order/OrderGuide/OrderGuide';

export default function Order() {
    return (
        <div className='page'>
            <Header></Header>
                <OrderGuide></OrderGuide>
            <Footer></Footer>
        </div>
    )
}
