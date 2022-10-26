import { useSelector } from "react-redux";

import OrderMenus from "../../order/OrderMenus/OrderMenus";

export default function PersonalOrderMenus() {
    const { personalOrderQuantityList,personalOrderNameList,personalOrderPriceist } = useSelector(state => state.order);

    return (
        <OrderMenus
            nameList = {personalOrderNameList}
            quantityList = {personalOrderQuantityList}
            priceList = {personalOrderPriceist}></OrderMenus>
    )
}