import './Main.css';

import axios from 'axios';
import { useEffect,useState } from 'react';

import Banner from '../../library/ui/components/Banner/Banner';
import MenuBlock from '../../library/ui/components/MenuBlock/MenuBlock';

export default function Main() {
    let MenuBlocks;

    const [menuClasses, setMenuClasses] = useState([]);

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
    }, []);

    MenuBlocks = menuClasses.map((menuClass,index) => (
        <MenuBlock
            name={menuClass["name"]}
            intro={menuClass["intro"]}                        
            menus={menuClass["menus"]}
            isDisplayOn={true}
            key={'main_menu_class_'+String(index)}></MenuBlock>
    ));

    return (
        <div className='page'>
            <Banner />
            <div className='main-menuclass-container'>
                {MenuBlocks}
            </div>
        </div>
    )
}