import { useSelector,useDispatch } from "react-redux";

import OrderSheet from "../../unit/OrderSheet/OrderSheet"

export default function PersonalOrderSheet(props) {
    const { personalOrderIdList,personalOrderQuantityList,
            personalOrderNameList,personalOrderPriceist } = useSelector(state => state.order);

    return (
        <OrderSheet
            quantityArray={personalOrderQuantityList}
            priceArray={personalOrderPriceist}>
            
        </OrderSheet>
    )
}