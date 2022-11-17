import './MenuBlock.css';

import Menu from '../../units/Menu/Menu';

export default function MenuBlock(props) {
    let Menus;
    if (props.menus) {
        Menus = props.menus.map((menu,index) => (
            <Menu 
                imageUrl={menu["imageUrl"]}
                name={menu["name"]}
                price={menu["price"]}
                key={'menu_'+String(index)}/>
        ))
    }

    if(props.isDisplayOn) {
        return (
            <div className='menu-block'>
                <h2 className='menu-block-name'>{props.name}</h2>
                <div style={{'minHeight':'5px'}}></div>
                <span className='menu-block-intro'>{props.intro}</span>
                <div style={{'minHeight':'30px'}}></div>
                <div className='menu-block-menu-container'>
                    {Menus}
                </div>
            </div>
        )
    }    
}

