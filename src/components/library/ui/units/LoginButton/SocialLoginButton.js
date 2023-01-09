import './SocialLoginBox.css';

export default function SocialLoginButton(props) {
    if (props.clickEvent) {
        return (
            <a id={props.id} className='social-login-button' style={{'background':props.backgroundColor,'borderColor':props.borderColor}} onClick={()=>props.clickEvent()}>
                <img src={props.img} className='social-login-button-image' alt='social-logo'></img>
                <span className='social-login-button-text' style={{'color':props.textColor}}>{props.text}</span>
            </a>
        )
    } else {
        return (
            <a href='#' id={props.id} className='social-login-button' style={{'background':props.backgroundColor,'borderColor':props.borderColor}}>
                <img src={props.img} className='social-login-button-image' alt='social-logo'></img>
                <span className='social-login-button-text' style={{'color':props.textColor}}>{props.text}</span>
            </a>
        )
    }    
}