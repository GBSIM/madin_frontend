import './CartMenuDeleteWindow.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';

import { getCookie } from '../Cookie/Cookie';
import { saveCart } from '../../../../../_reducers/user';

export default function CartMenuDeleteWindow(props) {
    const dispath = useDispatch();
    const deleteMenu = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.delete('https://api.madinbakery.com/user/cart',{
                data: {
                    "token": token,
                    "menuId": props.id,
                    "option": props.option
                }
            }).then((res) => {
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
                props.closeEvent();
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    if (props.isOn) {
        return (
            <div className='cart-menu-delete-window-container'>
                <div className='cart-menu-delete-window'>
                    <span className='cart-menu-delete-window-guide'>장바구니에서 삭제하시겠어요?</span>
                    <div style={{'minHeight':'60px'}}></div>
                    <button className='cart-menu-delete-window-delete-button' onClick={() => deleteMenu()}>
                        <span className='cart-menu-delete-window-delete-button-text'>삭제하기</span>
                    </button>
                    <div style={{'minHeight':'10px'}}></div>
                    <button className='cart-menu-delete-window-cancel-button' onClick={() => {props.closeEvent()}}>
                        <span className='cart-menu-delete-window-cancel-button-text'>닫기</span>
                    </button>
                </div>
            </div>
        )        
    }
}