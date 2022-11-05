import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react';
import { saveGroupOrder } from '../../../../../_reducers/order';

import MenuBlock from "../../unit/MenuBlock/MenuBlock";

export default function GroupMenuBlock(props) {
    const dispatch = useDispatch();
    const { groupOrderIdList,groupOrderQuantityList } = useSelector(state => state.order);
    
    useEffect(() => {
        if (groupOrderIdList.length === 0) {
            dispatch(saveGroupOrder(props.menuIdList,props.menuNameList,props.priceList))
        }
    },[])

    if (props.deliveryEn) {
        return (
            <MenuBlock
                title={props.title}
                intro={props.intro}
                menus={props.menus}
                menuIdList={groupOrderIdList}
                quantityList={groupOrderQuantityList}></MenuBlock>
        )
    }
}