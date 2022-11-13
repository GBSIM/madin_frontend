import { useSelector } from "react-redux";

import OrderMenus from "../../order/OrderMenus/OrderMenus";

export default function GroupOrderMenus() {
    const { groupOrderQuantityList,groupOrderNameList,groupOrderPriceList,groupOrderBoxQuantity } = useSelector(state => state.order);

    return (
        <OrderMenus
            nameList = {groupOrderNameList}
            quantityList = {groupOrderQuantityList}
            priceList = {groupOrderPriceList}
            type='group'
            boxQuantity = {groupOrderBoxQuantity}></OrderMenus>
    )
}