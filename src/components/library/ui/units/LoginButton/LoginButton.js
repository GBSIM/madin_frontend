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
                    <img src={require('../../../images/logo_text.png')} className='social-login-box-logo-image'></img>
                    <div style={{'minHeight':'30px'}}></div>
                    <span className='social-login-guide'>아래의 버튼을 눌러 간편 로그인해주세요.</span>
                    <div style={{'minHeight':'30px'}}></div>
                    <div className='social-login-buttons-container'>
                        <SocialLoginButton
                            backgroundColor='#FEE500'
                            borderColor='#FEE500'
                            textColor='#141414'
                            text='카카오 로그인'
                            img={require('../../../icons/kakao.png')}/>
                        <SocialLoginButton
                            backgroundColor='#03C75A'
                            borderColor='#03C75A'
                            textColor='#fff'
                            text='네이버 로그인'
                            img={require('../../../icons/naver_white.png')}/>
                        <SocialLoginButton
                            backgroundColor='#fff'
                            borderColor='#eee'
                            textColor='#141414'
                            text='구글 로그인'
                            img={require('../../../icons/google.png')}/>
                    </div>
                </div>
            </div>
        )
    }   
}

function SocialLoginButton(props) {
    return (
        <button className='social-login-button' style={{'background':props.backgroundColor,'borderColor':props.borderColor}}>
            <img src={props.img} className='social-login-button-image'></img>
            <span className='social-login-button-text' style={{'color':props.textColor}}>{props.text}</span>
        </button>
    )
}