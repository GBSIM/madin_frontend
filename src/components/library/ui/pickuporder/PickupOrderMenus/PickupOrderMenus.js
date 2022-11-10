import { useSelector } from "react-redux";

import OrderMenus from "../../order/OrderMenus/OrderMenus";

export default function PickupOrderMenus() {
    const { pickupOrderQuantityList,pickupOrderNameList,pickupOrderPriceist } = useSelector(state => state.order);

    return (
        <OrderMenus
            nameList = {pickupOrderNameList}
            quantityList = {pickupOrderQuantityList}
            priceList = {pickupOrderPriceist}></OrderMenus>
    )
}