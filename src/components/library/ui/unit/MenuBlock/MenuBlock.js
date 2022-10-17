import './MenuBlock.css';

export default function MenuBlock(props) {
    return (
        <div className='menu-block-container'>
            <h2 className='menu-title'>{props.menuTitle}</h2>
            <span className='menu-intro'>{props.menuIntro}</span>
            <div style={{'minHeight':'30px'}}></div>
        </div>
    )
}