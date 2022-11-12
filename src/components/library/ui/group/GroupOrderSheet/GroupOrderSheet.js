import { useSelector } from "react-redux";

import OrderSheet from "../../unit/OrderSheet/OrderSheet"

export default function GroupOrderSheet(props) {
    const { groupOrderQuantityList,groupOrderNameList,groupOrderPriceList, groupOrderBoxSize } = useSelector(state => state.order);
    const { isLogin } = useSelector(state => state.user);

    return (
        <OrderSheet
            quantityArray={groupOrderQuantityList}
            priceArray={groupOrderPriceList}
            nameArray={groupOrderNameList}
            isLogin = {isLogin}
            type={'group'}
            boxSize = {groupOrderBoxSize}>            
        </OrderSheet>
    )
}