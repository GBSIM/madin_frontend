import { useSelector } from "react-redux";

import Payment from "../../order/Payment/Payment";

export default function PickupOrderPayment() {
    const { pickupOrderQuantityList,pickupOrderPriceist } = useSelector(state => state.order);

    return (
        <Payment
            quantityList = {pickupOrderQuantityList}
            priceList = {pickupOrderPriceist}></Payment>
    )
}