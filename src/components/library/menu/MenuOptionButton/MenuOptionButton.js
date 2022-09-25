import './MenuOptionButton.css';

import { useSelector,useDispatch } from "react-redux";
import { changeMenuType } from '../../../../_reducers/menu';

import TwoOptionsButton from '../../ui/unit/TwoOptionsButton/TwoOptionsButton';

export default function MenuOptionButton() {
    const {menuType} = useSelector(state => state.menu);
    const dispatch = useDispatch();
    const menuTypeChangeEvent = (option) => {
        dispatch(changeMenuType(option));
    }

    return (
        <div className='menu-option-button-container'>
            <TwoOptionsButton state={menuType} option1={'디저트'} option2={'음료'} clickEvent={menuTypeChangeEvent}></TwoOptionsButton>
        </div>
    )
}