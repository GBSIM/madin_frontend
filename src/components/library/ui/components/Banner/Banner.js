import './Banner.css';

export default function Banner() {
    return (
        <button className='banner'>
            <button className='banner-button left'><img src={require('../../../icons/inequity_left_white.png')}></img></button>
            <button className='banner-button right'><img src={require('../../../icons/inequity_right_white.png')}></img></button>
        </button>
    )
}