import './Browse.css';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import BrowseOptionButton from '../../library/browse/BrowseOptionButton/BrowseOptionButton';

export default function Browse() {
    return (
        <div className='page'>
            <Header></Header>
            <BrowseOptionButton></BrowseOptionButton>
            <Footer></Footer>
        </div>
    )
}
