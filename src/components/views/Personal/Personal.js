import './Personal.css';

import axios from 'axios';
import { useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';
import MenuBlock from '../../library/ui/unit/MenuBlock/MenuBlock';
import { saveMenuClass } from '../../../_reducers/menu';
import { savePersonalOrder } from '../../../_reducers/order';

export default function Personal() {
    const dispatch = useDispatch();
    const { menuClasses } = useSelector(state => state.menu);
    useEffect(() => {
        const loadMenu  = async() => {
            try {
                const response = await axios.get('https://api.madinbakery.com/menuclass');
                dispatch(saveMenuClass(response.data.menuClass));
            } catch(err) {
                console.log(err);
            }
        };
        loadMenu();
    }, []);

    let MenuBlocks;
    if (Array.isArray(menuClasses) && menuClasses.length !== 0) {
        MenuBlocks = menuClasses.map((menuClass,index) => (
            <MenuBlock 
                title={menuClass["name"]}
                intro={menuClass["intro"]}
                menus = {menuClass["menus"]}
                key={"peronsal_menu_"+index}></MenuBlock>
        ));
        let menus = [];
        menuClasses.map((menuClass,index) => (
            menuClass["menus"].map((menu,index) => (
                menus.push({"_id":menu["_id"],"name":menu["name"],"price":menu["price"],"number":0})
            ))
        ))
        dispatch(savePersonalOrder(menus));
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
