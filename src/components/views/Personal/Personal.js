import './Personal.css';

import axios from 'axios';
import { useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';
import MenuBlock from '../../library/ui/unit/MenuBlock/MenuBlock';
import { saveMenu } from '../../../_reducers/menu';

export default function Personal() {
    const dispatch = useDispatch();
    const { menus } = useSelector(state => state.menu);
    useEffect(() => {
        const loadMenu  = async() => {
            try {
                const response = await axios.get('https://api.madinbakery.com/menuclass');
                dispatch(saveMenu(response.data.menuClass));
            } catch(err) {
                console.log(err);
            }
        };
        loadMenu();
    }, []);

    let MenuBlocks;
    if (Array.isArray(menus) && menus.length !== 0) {
        MenuBlocks = menus.map((menu,index) => (
            <MenuBlock 
                title={menu["name"]}
                intro={menu["intro"]}
                menus = {menu["menus"]}
                key={"peronsal_menu_"+index}></MenuBlock>
        ));
    }

    return (
        <div className='page'>
            <Header></Header>
            <Banner></Banner>
            {MenuBlocks}
            <div style={{'minHeight':'50px'}}></div>
            <Footer></Footer>
        </div>
    )
}
