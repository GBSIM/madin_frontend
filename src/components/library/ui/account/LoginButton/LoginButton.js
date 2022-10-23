import OrangeButton from "../../unit/OrangeButton/OrangeButton";

import { useSelector } from "react-redux";
import { loginWithKakao } from "../../../function/KakaoLogin";

export default function LoginButton() {
    const { isLogin } = useSelector(state => state.user);

    if (!isLogin) {
        return (
            <OrangeButton
                width = '85px'
                height = '33px'
                borderRadius = '6px'
                text='로그인'
                clickEvent={loginWithKakao}></OrangeButton>
        )
    }
}