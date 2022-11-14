import './Banner.css';

export default function Banner(props) {
    return (
        <div className='banner-container'>
            <div className='banner'>
                <img className='banner-image' src={require('../../../images/banner_personal.png')}></img>
            </div>
        </div>
    )
}