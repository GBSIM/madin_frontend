import './Personal.css';

import axios from 'axios';
import { useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';
import PersonalMenuBlock from '../../library/ui/personal/PersonalMenuBlock/PersonalMenuBlock';
import PersonalOrderSheet from '../../library/ui/personal/PersonalOrderSheet/PersonalOrderSheet';
import { saveMenuClass } from '../../../_reducers/menu';

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
        let personalOrderIdList = [];
        let personalOrderNameList = [];
        let personalOrderPriceList = [];
        menuClasses.map((menuClass) => (
            menuClass["menus"].map((menu) => (
                personalOrderIdList.push(menu["_id"]),
                personalOrderNameList.push(menu["name"]),
                personalOrderPriceList.push(menu["price"])
            ))
        ))
        
        MenuBlocks = menuClasses.map((menuClass,index) => (
            <PersonalMenuBlock 
                title={menuClass["name"]}
                intro={menuClass["intro"]}
                menus = {menuClass["menus"]}
                menuIdList = {personalOrderIdList}
                menuNameList = {personalOrderNameList}
                priceList = {personalOrderPriceList}
                key={"peronsal_menu_"+index}></PersonalMenuBlock>
        ));
    }

    return (
        <div className='page'>
            <Header></Header>
            <Banner></Banner>
            {MenuBlocks}
            <div style={{'minHeight':'50px'}}></div>
            <PersonalOrderSheet></PersonalOrderSheet>
            <Footer></Footer>
        </div>
    )
}
