import { useSelector } from "react-redux";

import OrderSheet from "../../unit/OrderSheet/OrderSheet"

export default function PersonalOrderSheet(props) {
    const { personalOrderQuantityList,personalOrderNameList,personalOrderPriceist } = useSelector(state => state.order);
    const { isLogin } = useSelector(state => state.user);

    return (
        <OrderSheet
            quantityArray={personalOrderQuantityList}
            priceArray={personalOrderPriceist}
            nameArray={personalOrderNameList}
            isLogin = {isLogin}
            type={'personal'}>            
        </OrderSheet>
    )
}