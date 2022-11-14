import './Personal.css';

import { useSelector } from "react-redux";

import { UserAuth } from '../../library/function/Auth';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';
import PersonalMenuBlock from '../../library/ui/personal/PersonalMenuBlock/PersonalMenuBlock';
import PersonalOrderSheet from '../../library/ui/personal/PersonalOrderSheet/PersonalOrderSheet';

export default function Personal() {
    const { menuClasses } = useSelector(state => state.menu);

    UserAuth();
    
    let MenuBlocks;
    if (Array.isArray(menuClasses) && menuClasses.length !== 0) {
        let personalOrderIdList = [];
        let personalOrderNameList = [];
        let personalOrderPriceList = [];
        menuClasses.map((menuClass) => {
            if (menuClass["deliveryEn"]) {
                menuClass["menus"].map((menu) => (
                    personalOrderIdList.push(menu["_id"]),
                    personalOrderNameList.push(menu["name"]),
                    personalOrderPriceList.push(menu["price"])
                ))
            }
        })
        
        MenuBlocks = menuClasses.map((menuClass,index) => (
            <PersonalMenuBlock 
                title={menuClass["name"]}
                intro={menuClass["intro"]}
                menus = {menuClass["menus"]}
                deliveryEn = {menuClass["deliveryEn"]}
                pickupEn = {menuClass["pickupEn"]}
                presentEn = {menuClass["presentEn"]}
                menuIdList = {personalOrderIdList}
                menuNameList = {personalOrderNameList}
                priceList = {personalOrderPriceList}
                key={"peronsal_menu_"+index}></PersonalMenuBlock>
        ));
    }

    return (
        <div className='page'>
            <Header></Header>
            <Banner type='personal'></Banner>
            {MenuBlocks}
            <div style={{'minHeight':'50px'}}></div>
            <PersonalOrderSheet></PersonalOrderSheet>
            <Footer></Footer>
        </div>
    )
}
