import './MenuBlock.css';

export default function MenuBlock(props) {
    return (
        <div className='menu-block-container'>
            <h2 className='menu-title'>{props.menuTitle}</h2>
            <div style={{"minHeight":'5px'}}></div>
            <span className='menu-intro'>{props.menuIntro}</span>
            <div style={{'minHeight':'30px'}}></div>
        </div>
    )
}