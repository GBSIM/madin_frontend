import './UserClass.css';

export default function UserClass(props) {
    let ClassBox;    
    switch (props.class) {
        case 0:
            ClassBox = 
                <div className='user-class-class-container'>
                    <h3 className='user-class-class'>Green</h3>    
                </div>
            break;
        case 1:
            ClassBox = 
                <div className='user-class-class-container orange'>
                    <h3 className='user-class-class'>Orange</h3>    
                </div>
            break;
        default:
            ClassBox = 
                <div className='user-class-class-container'>
                    <h3 className='user-class-class'>Green</h3>    
                </div>
    }

    return (
        <div className='user-class'>
            <div className='user-class-row'>
                {ClassBox}
                <h1 className='user-class-name'>{props.name}님</h1>
            </div>
            <div style={{'minHeight':'5px'}}></div>
            <button className='user-class-guide'>
                <span className='user-class-guide-text'>Madin의 등급 제도가 궁금하다면?</span>
            </button>
        </div>
    )
}