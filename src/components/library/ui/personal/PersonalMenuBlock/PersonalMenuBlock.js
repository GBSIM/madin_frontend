import { savePersonalOrderMenuIdList } from '../../../../../_reducers/order';
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react';

import MenuBlock from "../../unit/MenuBlock/MenuBlock";

export default function PersonalMenuBlock(props) {
    const dispatch = useDispatch();
    const { personalOrderMenuIdList,personalOrderQuantityList } = useSelector(state => state.order);
    
    useEffect(() => {
        dispatch(savePersonalOrderMenuIdList(props.menuIdList))
    },[])

    console.log(personalOrderMenuIdList);
    console.log(personalOrderQuantityList);

    return (
        <MenuBlock
            title={props.title}
            intro={props.intro}
            menus={props.menus}
            menuIdList={personalOrderMenuIdList}
            quantityList={personalOrderQuantityList}></MenuBlock>
    )
}