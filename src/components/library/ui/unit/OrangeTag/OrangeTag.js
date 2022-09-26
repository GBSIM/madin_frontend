import './OrangeTag.css';

export default function OrangeTag(props) {
    return (
        <div className='orange-tag-container'>
            <span className='orange-tag-text'>{props.tag}</span>
        </div>
    )
}