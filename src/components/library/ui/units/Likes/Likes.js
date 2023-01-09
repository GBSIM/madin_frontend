import './Likes.css';
import './Like.css';

import Like from './Like';

export default function Likes(props) {
    let LikeMenus;
    if (props.menus.length > 0) {
        LikeMenus = props.menus.map((menu,index) => (
            <Like
                isOn={props.likes.includes(menu["_id"])}
                menuId={menu["_id"]}
                image={menu["imageUrl"]}
                name={menu["name"]}
                price={menu["price"]}
                options={menu["options"]}
                key={'like_menu_'+String(index)}></Like>
        ))
    }

    console.log(props.likes);
    let LikesGuide;
    if (props.likes.length === 0 || !props.likes) {
        LikesGuide =
            <div className='likes-guide'>
                <span className='likes-guide-text'>
                    관심 상품을 추가해주세요.
                </span>
            </div>
    }

    return (
        <div className='likes'>
            <h1 className='likes-title'>관심 상품</h1>
            <div className='likes-spacer'></div>
            <div className='likes-container'>
                {LikesGuide}
                {LikeMenus}
            </div>
        </div>
    )
}




