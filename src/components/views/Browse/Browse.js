import './Browse.css';

import { useSelector,useDispatch } from "react-redux";
import { changeBrowseOption } from '../../../_reducers/browse';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import OptionButton from '../../library/ui/unit/OptionButton/OptionButton';

export default function Browse() {
    const {browseOption} = useSelector(state => state.browse);
    const dispatch = useDispatch();
    const browseOptionChangeEvent = (option) => {
        dispatch(changeBrowseOption(option));
        window.scrollTo(0,0);
    }

    return (
        <div className='page'>
            <Header></Header>
            <div className='browse-container'>
                <div className='browse-option-button-container'>
                    <OptionButton state={browseOption} option1={'인기'} option2={'최신'} clickEvent={browseOptionChangeEvent}></OptionButton>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
