import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory';
import './MenuBlock.css';

export default function MenuBlock(props) {
    let Menus;
    if (Array.isArray(props.menus) && props.menus.length !== 0) {
        Menus = props.menus.map((menu) => (
            <Menu
                image={menu.imageUrl}
                name={menu.name}
                price={menu.price}
                id = {menu._id}
                quantity={props.quantityList[props.menuIdList.indexOf(menu._id)]}
                key={'menu_'+menu.name}></Menu>
        ))
    }
    
    return (
        <div className='menu-block-container'>
            <h2 className='menu-title'>{props.title}</h2>
            <div style={{"minHeight":'5px'}}></div>
            <span className='menu-intro'>{props.intro}</span>
            <div style={{'minHeight':'30px'}}></div>
            <div className='menu-menus-container'>
                {Menus}
            </div>
        </div>
    )
}

function Menu(props) {
    return (
        <div className='menu-container'>
            <div className='menu-image-container'>
                <img src={props.image} className='menu-image' alt={props.name}></img>
            </div>
            <div style={{'minHeight':'9px'}}></div>
            <div className='menu-quantity-container'>
                <button className='menu-quantity-button'></button>
                <span className='menu-quantity'>{props.quantity}</span>
                <button className='menu-quantity-button'></button>
            </div>
            <div style={{'minHeight':'7px'}}></div>
            <div className='menu-name-container'>
                <span className='menu-name'>{props.name}</span>
            </div>
            <div className='menu-price-container'>
                <span className='menu-price'>{props.price.toLocaleString()}원</span>
            </div>
        </div>
    )
}