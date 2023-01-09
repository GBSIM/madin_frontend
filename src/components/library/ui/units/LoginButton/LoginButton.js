import './LoginButton.css';

import { useState } from 'react';

import SocialLoginBox from './SocialLoginBox';

export default function LoginButton(props) {    
    const [isSocialLoginBoxDisplayOn, setSocialLoginBoxDisplayOn] = useState(false);

    const switchSocialLoginBox = () => {
        if (isSocialLoginBoxDisplayOn) {
            setSocialLoginBoxDisplayOn(false);
        } else {
            setSocialLoginBoxDisplayOn(true);
        }
    }

    if (!props.isLogined) {
        return (
            <div>
                <button className='login-button' onClick={() => switchSocialLoginBox()}>
                    <span className='login-button-text'>로그인</span>
                </button>
                <SocialLoginBox 
                    isOn={isSocialLoginBoxDisplayOn}
                    closeEvent={switchSocialLoginBox}></SocialLoginBox>
            </div>
        )
    }
}



