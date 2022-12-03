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
                <h2 className='mileage-title'>Madin mileage</h2>
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
                    {remainedMileageToCoupon}개만 더 모으면 원하는 음료 또는 디저트가 무료!
                </span>
            </div>
        </div>
    )
}