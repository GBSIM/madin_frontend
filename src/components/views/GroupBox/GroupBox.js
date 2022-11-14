import './GroupBox.css';

import { UserAuth } from '../../library/function/Auth';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';

import GroupBoxSelect from '../../library/ui/group/GroupBoxSelect/GroupBoxSelect';

export default function GroupBox() {
    UserAuth();
    
    return (
        <div className='page'>
            <Header></Header>
            <Banner></Banner>
            <GroupBoxSelect></GroupBoxSelect>
            <Footer></Footer>
        </div>
    )
}
