import './PictureButton.css';

export default function PictureButton(props) {
    if (props.type === 'left') {
        return (
            <div className='picture-button-container'>
                <button className='picture-button'>
                    <img className='picture-button-image left' src={require('../../../icons/arrow-left-white.png')}></img>
                </button>
            </div>
        )
    } else {
        return (
            <div className='picture-button-container'>
                <button className='picture-button'>
                    <img className='picture-button-image right' src={require('../../../icons/arrow-right-white.png')}></img>
                </button>
            </div>
        )
    }
    
}