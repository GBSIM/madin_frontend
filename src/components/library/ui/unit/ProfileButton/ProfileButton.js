import './ProfileButton.css';

export default function ProfileButton() {
    return (
        <div className='profile-button-container'>
            <button className='profile-button'>
                <img src={require('../../../icons/profile_grey.png')} className='profile-button-image'></img>
            </button>
        </div>
    )
}