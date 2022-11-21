import './Present.css';

import axios from 'axios';
import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authUser, KakaoRedirectHandler } from '../../library/ui/units/LoginButton/KakaoLogin';
import { login, saveName } from '../../../_reducers/user';

import Header from '../../library/ui/components/Header/Header';
import Banner from '../../library/ui/components/Banner/Banner';
import MenuBlock from '../../library/ui/components/MenuBlock/MenuBlock';

export default function Present() {
    let MenuBlocks;

    const [menuClasses, setMenuClasses] = useState([]);
    const dispath = useDispatch();

    const { isLogined, name } = useSelector(state => state.user);

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
            });
        }
        authUser().then((user) => {
            if (user) {
                dispath(login());
                dispath(saveName(user["name"]));
                console.log(user);
            }
        })
    }, []);

    MenuBlocks = menuClasses.map((menuClass,index) => (
        <MenuBlock
            name={menuClass["name"]}
            intro={menuClass["intro"]}                        
            menus={menuClass["menus"]}
            isDisplayOn={menuClass["presentEn"]}
            key={'present_menu_class_'+String(index)}></MenuBlock>
    ));

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name}></Header>
            <Banner/>
            <div className='main-menuclass-container'>
                {MenuBlocks}
            </div>
        </div>
    )
}