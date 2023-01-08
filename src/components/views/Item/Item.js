import './Item.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { KakaoRedirectHandler, authUser } from '../../library/ui/units/LoginButton/KakaoLogin';
import { login, logout, saveUserInfo } from '../../../_reducers/user';
import { changePage } from '../../../_reducers/nav';

import Header from '../../library/ui/components/Header/Header';
import ItemDetail from '../../library/ui/units/ItemDetail/ItemDetail';

export default function Item({ match }) {
    const dispath = useDispatch();

    const [ menuName, setMenuName ] = useState('메뉴 이름');
    const [ price, setPrice ] = useState(0);
    const [ intro, setIntro ] = useState('메뉴 소개');
    const [ type, setType ] = useState('주문 유형');
    const [ image, setImage ] = useState(null);
    const [ options, setOptions] = useState([]);

    const { id } = useParams();
    const loadMenu  = async() => {
        try {
            const response = await axios.get('https://api.madinbakery.com/menu/'+id);
            setMenuName(response.data.menu["name"]);
            setPrice(response.data.menu["price"]);
            setIntro(response.data.menu["intro"]);
            setType(response.data.menu["orderType"]);
            setImage(response.data.menu["imageUrl"]);
            setOptions(response.data.menu["options"]);
            if (response.data.menu["options"]["name"] !== "basic") {
                setPrice(response.data.menu["options"][0]["price"]);
            }
            switch (response.data.menu["orderType"]) {
                case "delivery":
                    dispath(changePage('main'))
                    break;
                case "present":
                    dispath(changePage('present'))
                    break;
                case "pickup":
                    dispath(changePage('pickup'))
                    break;
            }
        } catch(err) {
            console.log(err);
        }
    };


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
                type={type}
                name={menuName}
                image={image}
                price={price}
                intro={intro}
                menuId={id}
                options={options}
                ></ItemDetail>
        </div>
    )
}