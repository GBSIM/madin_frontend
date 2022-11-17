import './Menu.css';

export default function Menu(props) {
    return (
        <div className='menu'>
            <div className='menu-image-container'>
                <img className='menu-image' src={props.imageUrl}></img>                
            </div>
            <span className='menu-name'>{props.name}</span>
            <span className='menu-price'>{props.price.toLocaleString()}</span>
        </div>
    )
}