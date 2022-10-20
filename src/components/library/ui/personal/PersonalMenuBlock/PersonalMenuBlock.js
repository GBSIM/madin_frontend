import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react';
import { savePersonalOrderMenuIdList, increaseMenuQuantity, decreaseMenuQuantity } from '../../../../../_reducers/order';

import MenuBlock from "../../unit/MenuBlock/MenuBlock";

export default function PersonalMenuBlock(props) {
    const dispatch = useDispatch();
    const { personalOrderMenuIdList,personalOrderQuantityList } = useSelector(state => state.order);
    
    useEffect(() => {
        dispatch(savePersonalOrderMenuIdList(props.menuIdList))
    },[])

    const plusButtonEvent = (menuId) => {
        dispatch(increaseMenuQuantity(menuId));
    }

    const minusButtonEvent = (menuId) => {
        dispatch(decreaseMenuQuantity(menuId));
    }

    return (
        <MenuBlock
            title={props.title}
            intro={props.intro}
            menus={props.menus}
            menuIdList={personalOrderMenuIdList}
            quantityList={personalOrderQuantityList}
            plusEvent={plusButtonEvent}
            minusEvent = {minusButtonEvent}></MenuBlock>
    )
}