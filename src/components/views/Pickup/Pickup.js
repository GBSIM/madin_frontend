import './Pickup.css';

import { UserAuth } from '../../library/function/Auth';
import { useSelector } from 'react-redux';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Banner from '../../library/ui/unit/Banner/Banner';
import PickupMenuBlock from '../../library/ui/pickup/PickupMenuBlock/PickupMenuBlock';
import PickupOrderSheet from '../../library/ui/pickup/PickupOrderSheet/PickupOrderSheet';

export default function Pickup() {
    UserAuth();
    const { menuClasses } = useSelector(state => state.menu);

    let MenuBlocks;
    if (Array.isArray(menuClasses) && menuClasses.length !== 0) {
        let pickupOrderIdList = [];
        let pickupOrderNameList = [];
        let pickupOrderPriceList = [];
        menuClasses.map((menuClass) => {
            if (menuClass["pickupEn"]) {
                menuClass["menus"].map((menu) => (
                    pickupOrderIdList.push(menu["_id"]),
                    pickupOrderNameList.push(menu["name"]),
                    pickupOrderPriceList.push(menu["price"])
                ))
            }
        })
        
        MenuBlocks = menuClasses.map((menuClass,index) => (
            <PickupMenuBlock 
                title={menuClass["name"]}
                intro={menuClass["intro"]}
                menus = {menuClass["menus"]}
                deliveryEn = {menuClass["deliveryEn"]}
                pickupEn = {menuClass["pickupEn"]}
                presentEn = {menuClass["presentEn"]}
                menuIdList = {pickupOrderIdList}
                menuNameList = {pickupOrderNameList}
                priceList = {pickupOrderPriceList}
                key={"pickup_menu_"+index}></PickupMenuBlock>
        ));
    }

    return (
        <div className='page'>
            <Header></Header>
            <Banner></Banner>
            {MenuBlocks}
            <div style={{'minHeight':'50px'}}></div>
            <PickupOrderSheet></PickupOrderSheet>
            <Footer></Footer>
        </div>
    )
}
