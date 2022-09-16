import './Menu.css';

import DesktopHeader from '../../library/ui/header/DesktopHeader/DesktopHeader';

export default function Menu() {
    return (
        <div className='page'>
            <DesktopHeader></DesktopHeader>
            <div className='menu-frame-container'>
                <div className='menu-container'>
                    <div className='menu-contents-container'>
                        <h1 className='menu-title'>Lemon Madeleine</h1>
                        <span className='menu-subtitle'>레몬 마들렌</span>
                        <div style={{height:'60px'}}></div>
                        <span className='menu-contents'>상큼한 레몬과 달콤한 마들렌의 조합</span>
                        <div style={{height:'5px'}}></div>
                        <span className='menu-contents'>마딘의 시그니쳐 메뉴에요.</span>
                        <div style={{height:'30px'}}></div>
                        <span className='menu-contents'>마딘의 첫 오픈부터 지금까지</span>
                        <div style={{height:'5px'}}></div>
                        <span className='menu-contents'>가장 많이 사랑 받는 디저트입니다.</span>
                    </div>
                    <div className='menu-picture-container'></div>
                </div>
            </div>
            
        </div>
    )
}
