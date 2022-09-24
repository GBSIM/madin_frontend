import './About.css';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import AboutImage from '../../library/about/AboutImage/AboutImage';
import AboutInformation from '../../library/about/AboutInformation/AboutInformation';

export default function About() {
    return (
        <div className='page'>
            <Header></Header>
            <AboutImage></AboutImage>
            <AboutInformation></AboutInformation>
            <Footer></Footer>
        </div>
    )
}
