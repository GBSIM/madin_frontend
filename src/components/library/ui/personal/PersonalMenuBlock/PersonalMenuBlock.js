import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react';
import { savePersonalOrder, addPersonalMenuQuantity, subtractPersonalMenuQuantity } from '../../../../../_reducers/order';

import MenuBlock from "../../unit/MenuBlock/MenuBlock";

export default function PersonalMenuBlock(props) {
    const dispatch = useDispatch();
    const { personalOrderIdList,personalOrderQuantityList } = useSelector(state => state.order);
    
    useEffect(() => {
        dispatch(savePersonalOrder(props.menuIdList,props.menuNameList,props.priceList))
    },[])

    const addQunatity = (menuId) => {
        dispatch(addPersonalMenuQuantity(menuId));
    }

    const subtractQuantity = (menuId) => {
        dispatch(subtractPersonalMenuQuantity(menuId));
    }

    return (
        <MenuBlock
            title={props.title}
            intro={props.intro}
            menus={props.menus}
            menuIdList={personalOrderIdList}
            quantityList={personalOrderQuantityList}
            plusButtonEvent={addQunatity}
            minusButtonEvent = {subtractQuantity}></MenuBlock>
    )
}