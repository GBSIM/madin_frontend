import './AboutImage.css';

export default function AboutImage() {
    return (
        <div className='about-image-container'>
            <img src={require('../../../library/images/madin_about.png')} className='about-image'></img>
            <img src={require('../../../library/images/madin_about_mobile.png')} className='about-image-mobile'></img>
        </div>
    )
}