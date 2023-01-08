import './Likes.css';
import './Like.css';
import './DeleteWindow.css';

import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getCookie } from '../Cookie/Cookie';

import { saveUserInfo } from '../../../../../_reducers/user';

import { MenuAddWindow } from '../Menu/Menu';

export default function Likes(props) {
    let LikeMenus;
    if (props.menus.length > 0) {
        LikeMenus = props.menus.map((menu,index) => (
            <Like
                isOn={props.likes.includes(menu["_id"])}
                menuId={menu["_id"]}
                image={menu["imageUrl"]}
                name={menu["name"]}
                price={menu["price"]}
                options={menu["options"]}
                key={'like_menu_'+String(index)}></Like>
        ))
    }

    console.log(props.likes);
    let LikesGuide;
    if (props.likes.length === 0 || !props.likes) {
        LikesGuide =
            <div className='likes-guide'>
                <span className='likes-guide-text'>
                    관심 상품을 추가해주세요.
                </span>
            </div>
    }

    return (
        <div className='likes'>
            <h1 className='likes-title'>관심 상품</h1>
            <div className='likes-spacer'></div>
            <div className='likes-container'>
                {LikesGuide}
                {LikeMenus}
            </div>
        </div>
    )
}

function Like(props) {
    const [isMenuAddWindowDisplayOn, setMenuAddWindowDisplayOn] = useState(false);
    const [isMenuDeleteWindowOn, setMenuDeleteWindowOn] = useState(false);

    const openMenuAddWindow = () => {
        setMenuAddWindowDisplayOn(true);
    }

    const closeMenuAddWindow = () => {
        setMenuAddWindowDisplayOn(false);
    }
    
    const openDeleteWindow = () => {
        setMenuDeleteWindowOn(true);
    }

    const closeDeleteWindow = () => {
        setMenuDeleteWindowOn(false);
    }

    if (props.isOn) {
        return (
            <div className='like'>
                <img src={props.image} className='like-image' alt='like-menu'></img>
                <div className='like-contents-container'>
                    <span className='like-name'>{props.name}</span>
                    <h3 className='like-price'>{props.price.toLocaleString()}원</h3>
                </div>
                <div className='like-spacer'></div>
                <button className='like-cart-button' onClick={() => openMenuAddWindow()}>
                    <img src={require('../../../icons/cart_white.png')} className='like-cart-button-image'></img>
                </button>
                <button className='like-delete-button' onClick={() => {openDeleteWindow()}}>
                    <span className='like-delete-button-text'>삭제하기</span>
                </button>
                <MenuAddWindow
                    isDisplayOn={isMenuAddWindowDisplayOn}
                    name={props.name}
                    price={props.price}
                    closeEvent={closeMenuAddWindow}
                    menuId={props.menuId}
                    options={props.options}></MenuAddWindow>
                <DeleteWindow
                    isOn={isMenuDeleteWindowOn}
                    id={props.menuId}
                    closeEvent={closeDeleteWindow}></DeleteWindow>
            </div>
        )
    }
}


function DeleteWindow(props) {
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