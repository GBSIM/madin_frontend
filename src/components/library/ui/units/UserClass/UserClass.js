import './UserClass.css';

export default function UserClass(props) {
    let classText = "green";
    switch (props.class) {
        case 0:
            classText="green"
        case 1:
            classText="yellow"
        case 2:
            classText="orange"
        default:
            classText="green"
    }

    return (
        <div className='user-class'>
            <div className='user-class-row'>
                <div className='user-class-class-container'>
                    <h3 className='user-class-class'>{classText}</h3>    
                </div>
                <h1 className='user-class-name'>{props.name}</h1>
            </div>
            <div style={{'minHeight':'5px'}}></div>
            <button className='user-class-guide'>
                <span className='user-class-guide-text'>Madin의 등급 제도가 궁금하다면?</span>
            </button>
        </div>
    )
}