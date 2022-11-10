import { useSelector } from "react-redux";

import OrderSheet from "../../unit/OrderSheet/OrderSheet"

export default function PickupOrderSheet(props) {
    const { pickupOrderQuantityList,pickupOrderNameList,pickupOrderPriceist } = useSelector(state => state.order);
    const { isLogin } = useSelector(state => state.user);

    return (
        <OrderSheet
            quantityArray={pickupOrderQuantityList}
            priceArray={pickupOrderPriceist}
            nameArray={pickupOrderNameList}
            isLogin = {isLogin}
            type={'pickup'}>            
        </OrderSheet>
    )
}