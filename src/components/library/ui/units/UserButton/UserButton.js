import './UserButton.css';

export default function UserButton(props) {
    if (props.isLogined) {
        return (
            <button className='user-button'>
                <span className='user-button-text'>{props.name}님</span>
                <img className='user-button-arrow-image' src={require('../../../icons/inequity_down_grey.png')}></img>
            </button>
        )
    }
}