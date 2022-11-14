import './Banner.css';

export default function Banner(props) {
    let bannerImage;
    if (props.type === 'personal') {
        bannerImage = <img className='banner-image' src={require('../../../images/banner_personal.png')}></img>
    } else if (props.type === 'group'){
        bannerImage = <img className='banner-image' src={require('../../../images/banner_group.png')}></img>
    } else {
        bannerImage = <img className='banner-image' src={require('../../../images/banner_personal.png')}></img>
    }
    return (
        <div className='banner-container'>
            <div className='banner'>
                {bannerImage}
            </div>
        </div>
    )
}