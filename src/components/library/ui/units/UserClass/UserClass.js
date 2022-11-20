import './UserClass.css';

export default function UserClass(props) {
    return (
        <div className='user-class'>
            <span className='user-class-text'>{props.class}</span>
        </div>
    )
}