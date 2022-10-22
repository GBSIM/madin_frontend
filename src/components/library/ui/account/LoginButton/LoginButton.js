import OrangeButton from "../../unit/OrangeButton/OrangeButton";

import { loginWithKakao } from "../KakaoLogin/KakaoLogin";

export default function LoginButton() {
    return (
        <OrangeButton
            width = '85px'
            height = '33px'
            borderRadius = '6px'
            text='로그인'
            clickEvent={loginWithKakao}></OrangeButton>
    )
}