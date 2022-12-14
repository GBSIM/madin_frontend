import './Item.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { KakaoRedirectHandler, authUser } from '../../library/ui/units/LoginButton/KakaoLogin';
import { login, logout, saveUserInfo } from '../../../_reducers/user';

import Header from '../../library/ui/components/Header/Header';
import ItemDetail from '../../library/ui/units/ItemDetail/ItemDetail';

export default function Item({ match }) {
    const [ menuName, setMenuName ] = useState('메뉴 이름');
    const [ price, setPrice ] = useState(0);
    const [ intro, setIntro ] = useState('메뉴 소개');
    const [ type, setType ] = useState('주문 유형');
    const [ quantity, setQuantity ] = useState(1);
    const [ image, setImage ] = useState(null);

    const { id } = useParams();
    const loadMenu  = async() => {
        try {
            const response = await axios.get('https://api.madinbakery.com/menu/'+id);
            setMenuName(response.data.menu["name"]);
            setPrice(response.data.menu["price"]);
            setIntro(response.data.menu["intro"]);
            setType(response.data.menu["type"]);
            setImage(response.data.menu["imageUrl"]);
        } catch(err) {
            console.log(err);
        }
    };

    const dispath = useDispatch();

    const { isLogined, name, cart } = useSelector(state => state.user);

    useEffect(() => {
        loadMenu();
        const href = window.location.href;
        let params = new URL(href).searchParams;
        let code = params.get("code");
        if (code != null) {
            KakaoRedirectHandler().then((user) => {
                dispath(login());
                dispath(saveUserInfo(user));
            });
        }
        authUser().then((user) => {
            if (user) {
                dispath(login());
                dispath(saveUserInfo(user));
            } else {
                dispath(logout());
            }
        })
    }, []);

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name} cartNumber={cart.length}></Header>
            <div className='item-top-spacer'></div>
            <ItemDetail
                name={menuName}
                image={image}
                price={price}
                intro={intro}
                menuId={id}></ItemDetail>
        </div>
    )
}