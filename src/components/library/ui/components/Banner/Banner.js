import './Banner.css';

export default function Banner() {
    const bannerImage = 
        <img src={require('../../../images/banner_00.png')} className='banner-image' alt='banner'></img>

    const mobileBannerImage =
        <img src={require('../../../images/mobile_banner_00.png')} className='mobile-banner-image' alt='banner'></img>

    return (
        <div className='banner'>
            <button className='banner-image-button'>
                {bannerImage}
                {mobileBannerImage}
            </button>
            <button className='banner-button left'><img src={require('../../../icons/inequity_left_white.png')} alt='left-arrow'></img></button>
            <button className='banner-button right'><img src={require('../../../icons/inequity_right_white.png')} alt='right-arrow'></img></button>
        </div>
    )
}