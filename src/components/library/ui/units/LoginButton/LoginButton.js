import './LoginButton.css';
import './SocialLoginBox.css';

import { useState } from 'react';

export default function LoginButton() {    
    const [isSocialLoginBoxDisplayOn, setSocialLoginBoxDisplayOn] = useState(false);

    const switchSocialLoginBox = () => {
        if (isSocialLoginBoxDisplayOn) {
            setSocialLoginBoxDisplayOn(false);
        } else {
            setSocialLoginBoxDisplayOn(true);
        }
        console.log(isSocialLoginBoxDisplayOn);
    }

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

function SocialLoginBox(props) {
    if (props.isOn) {
        return (
            <div className='social-login-box-background' >
                <div className='social-login-box'>
                    <div className='social-login-box-close-button-container'>
                        <button className='social-login-box-close-button' onClick={()=>props.closeEvent()}>
                            <img className='social-login-box-close-button-image' src={require('.././../../icons/close_grey.png')}></img>
                        </button>
                    </div>
                    <img src={require('../../../images/logo.png')} className='social-login-box-logo-image'></img>
                    <div style={{'minHeight':'30px'}}></div>
                    <span className='social-login-guide'>아래의 버튼을 눌러 간편 로그인해주세요.</span>
                    <div style={{'minHeight':'30px'}}></div>
                    <div className='social-login-buttons-container'>
                        <button className='social-login-button'>
                            <img src={require('../../../images/kakao_login_medium_wide.png')} className='social-login-button-image'></img>
                        </button>
                    </div>
                </div>
            </div>
        )
    }   
}