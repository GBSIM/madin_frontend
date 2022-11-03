import { useSelector } from "react-redux";

import Payment from "../../order/Payment/Payment";

export default function PersonalOrderPayment() {
    const { personalOrderQuantityList,personalOrderNameList,personalOrderPriceist } = useSelector(state => state.order);

    return (
        <Payment
            quantityList = {personalOrderQuantityList}
            priceList = {personalOrderPriceist}></Payment>
    )
}