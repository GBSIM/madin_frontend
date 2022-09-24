import './BrowseOptionButton.css';

import { useSelector,useDispatch } from "react-redux";
import { changeBrowseOption } from '../../../../_reducers/browse';

import TwoOptionsButton from '../../ui/unit/TwoOptionsButton/TwoOptionsButton';

export default function BrowseOptionButton() {
    const {browseOption} = useSelector(state => state.browse);
    const dispatch = useDispatch();
    const browseOptionChangeEvent = (option) => {
        dispatch(changeBrowseOption(option));
        window.scrollTo(0,0);
    }

    return (
        <div className='browse-option-button-container'>
            <TwoOptionsButton state={browseOption} option1={'인기'} option2={'최신'} clickEvent={browseOptionChangeEvent}></TwoOptionsButton>
        </div>
    )
}