import './Mileage.css';

export default function Mileage(props) {
    const maximumMileage = 12;
    let mileageBarWidthPercentage = 0;
    if (props.mileage) {
        mileageBarWidthPercentage = props.mileage/12 * 100;
    }

    let remainedMileageToCoupon = maximumMileage - props.mileage;

    return (
        <div className='mileage'>
            <div className='mileage-first-row'>
                <h2 className='mileage-title'>Mileage</h2>
                <div className='mileage-container'>
                    <h1 className='mileage-user'>{props.mileage}</h1>    
                    <h1 className='mileage-maximum'>/{maximumMileage}</h1>    
                </div>
            </div>
            <div style={{'minHeight':'12px'}}></div>
            <div className='mileage-bar-frame'>
                    <div className='mileage-bar' style={{'width':mileageBarWidthPercentage+'%'}}></div>
            </div>
            <div style={{'minHeight':'5px'}}></div>
            <div className='mileage-guide-container'>
                <span className='mileage-guide'>
                    다음 보상까지 {remainedMileageToCoupon}개 남았어요.
                </span>
            </div>
        </div>
    )
}