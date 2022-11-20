import './Banner.css';

export default function Banner() {
    return (
        <button className='banner'>
            <button className='banner-button left'><img src={require('../../../icons/inequity_left_white.png')} alt='left-arrow'></img></button>
            <button className='banner-button right'><img src={require('../../../icons/inequity_right_white.png')} alt='right-arrow'></img></button>
        </button>
    )
}