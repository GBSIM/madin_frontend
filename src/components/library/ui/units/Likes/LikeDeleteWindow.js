import './LikeDeleteWindow.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getCookie } from '../Cookie/Cookie';

import { saveUserInfo } from '../../../../../_reducers/user';

export default function LikeDeleteWindow(props) {
    const dispath = useDispatch();
    const deleteMenu = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.delete('https://api.madinbakery.com/user/like',{
                data: {
                    "token": token,
                    "menuId": props.id
                }
            }).then((res) => {
                console.log(res);
                const user = res.data.user;
                dispath(saveUserInfo(user));
                props.closeEvent();
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    if (props.isOn) {
        return (
            <div className='delete-window-container'>
                <div className='delete-window'>
                    <span className='delete-window-guide'>관심 상품에서 삭제하시겠어요?</span>
                    <div style={{'minHeight':'60px'}}></div>
                    <button className='delete-window-delete-button' onClick={() => deleteMenu()}>
                        <span className='delete-window-delete-button-text'>삭제하기</span>
                    </button>
                    <div style={{'minHeight':'10px'}}></div>
                    <button className='delete-window-cancel-button' onClick={() => {props.closeEvent()}}>
                        <span className='delete-window-cancel-button-text'>닫기</span>
                    </button>
                </div>
            </div>
        )        
    }
}