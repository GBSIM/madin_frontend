import './Main.css';

import axios from 'axios';
import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authUser, KakaoRedirectHandler } from '../../library/ui/units/LoginButton/KakaoLogin';
import { login, saveName, saveCart } from '../../../_reducers/user';

import Header from '../../library/ui/components/Header/Header';
import Banner from '../../library/ui/components/Banner/Banner';
import MenuBlock from '../../library/ui/components/MenuBlock/MenuBlock';
import Footer from '../../library/ui/components/Footer/Footer';

export default function Main() {
    let MenuBlocks;

    const [menuClasses, setMenuClasses] = useState([]);
    const dispath = useDispatch();

    const { isLogined, name, cart } = useSelector(state => state.user);

    useEffect(() => {
        const loadMenu  = async() => {
            try {
                const response = await axios.get('https://api.madinbakery.com/menuclass');
                setMenuClasses(response.data.menuClass);
            } catch(err) {
                console.log(err);
            }
        };
        loadMenu();
        const href = window.location.href;
        let params = new URL(href).searchParams;
        let code = params.get("code");
        if (code != null) {
            KakaoRedirectHandler().then((user) => {
                dispath(login());
                dispath(saveName(user["name"]));
                dispath(saveCart(user["cart"]));
            });
        }
        authUser().then((user) => {
            if (user) {
                dispath(login());
                dispath(saveName(user["name"]));
                dispath(saveCart(user["cart"]));
            }
        })
    }, []);

    MenuBlocks = menuClasses.map((menuClass,index) => (
        <MenuBlock
            name={menuClass["name"]}
            intro={menuClass["intro"]}                        
            menus={menuClass["menus"]}
            isDisplayOn={menuClass["deliveryEn"]}
            key={'main_menu_class_'+String(index)}></MenuBlock>
    ));

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name} cartNumber={cart.length}></Header>
            <Banner />
            <div className='main-menuclass-container'>
                {MenuBlocks}
            </div>
            <div style={{'minHeight':'100px'}}></div>
            <Footer isLogined={isLogined}/>
        </div>
    )
}