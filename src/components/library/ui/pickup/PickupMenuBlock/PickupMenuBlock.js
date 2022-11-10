import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react';
import { savePickupOrder, addPickupMenuQuantity, subtractPickupMenuQuantity } from '../../../../../_reducers/order';

import MenuBlock from "../../unit/MenuBlock/MenuBlock";

export default function PickupMenuBlock(props) {
    const dispatch = useDispatch();
    const { pickupOrderIdList,pickupOrderQuantityList } = useSelector(state => state.order);
    
    useEffect(() => {
        if (pickupOrderIdList.length === 0) {
            dispatch(savePickupOrder(props.menuIdList,props.menuNameList,props.priceList))
        }
    },[])

    const addQunatity = (menuId) => {
        dispatch(addPickupMenuQuantity(menuId));
    }

    const subtractQuantity = (menuId) => {
        dispatch(subtractPickupMenuQuantity(menuId));
    }
    
    if (props.pickupEn) {
        return (
            <MenuBlock
                title={props.title}
                intro={props.intro}
                menus={props.menus}
                menuIdList={pickupOrderIdList}
                quantityList={pickupOrderQuantityList}
                plusButtonEvent={addQunatity}
                minusButtonEvent = {subtractQuantity}></MenuBlock>
        )
    }
}