import './GroupMenu.css';

import { useSelector } from "react-redux";

import { UserAuth } from '../../library/function/Auth';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';
import GroupMenuBlock from '../../library/ui/group/GroupMenuBlock/GroupMenuBlock';

export default function GroupMenu() {
    const { menuClasses } = useSelector(state => state.menu);

    UserAuth();
    
    let MenuBlocks;
    if (Array.isArray(menuClasses) && menuClasses.length !== 0) {
        let groupOrderIdList = [];
        let groupOrderNameList = [];
        let groupOrderPriceList = [];
        menuClasses.map((menuClass) => {
            if (menuClass["presentEn"]) {
                menuClass["menus"].map((menu) => (
                    groupOrderIdList.push(menu["_id"]),
                    groupOrderNameList.push(menu["name"]),
                    groupOrderPriceList.push(menu["price"])
                ))
            }
        })
        
        MenuBlocks = menuClasses.map((menuClass,index) => (
            <GroupMenuBlock 
                title={menuClass["name"]}
                intro={menuClass["intro"]}
                menus = {menuClass["menus"]}
                deliveryEn = {menuClass["deliveryEn"]}
                pickupEn = {menuClass["pickupEn"]}
                presentEn = {menuClass["presentEn"]}
                menuIdList = {groupOrderIdList}
                menuNameList = {groupOrderNameList}
                priceList = {groupOrderPriceList}
                key={"group_menu_"+index}></GroupMenuBlock>
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
