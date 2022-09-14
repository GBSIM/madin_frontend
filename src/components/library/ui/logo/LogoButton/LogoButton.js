import './LogoButton.css';

export default function LogoButton(props) {
    return (
        <button className='logo-button' style={{width:props.width}}>
            <img src={require('../../../images/madin_logo.png')}></img>
        </button>
    )
}