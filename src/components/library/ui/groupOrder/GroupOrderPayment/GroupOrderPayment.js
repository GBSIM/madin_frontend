import { useSelector } from "react-redux";

import Payment from "../../order/Payment/Payment";

export default function GroupOrderPayment() {
    const { groupOrderQuantityList, groupOrderPriceist } = useSelector(state => state.order);

    return (
        <Payment
            quantityList = {groupOrderQuantityList}
            priceList = {groupOrderPriceist}></Payment>
    )
}