import './AboutInformation.css';

export default function AboutInformation() {
    return (
        <div className='about-information-container'>
            <div className='about-information'>
                <div className='about-contact'>
                    <h3 className='about-title'>Contact us</h3>
                    <div className='about-contact-container'>
                        <div className='about-contact-content-container'>
                            <span className='about-subtitle'>Address</span>
                            <span className='about-text'>경기 고양시 덕양구 원흥1로52 1층 Madin</span>
                        </div>
                        <div className='about-contact-content-container'>
                            <span className='about-subtitle'>Opening hours</span>
                            <span className='about-text'>12:00 ~ 20:00 / 월, 목 휴무</span>
                        </div>
                        <div className='about-contact-content-container'>
                            <span className='about-subtitle'>TEL</span>
                            <span className='about-text'>0507-1356-4770</span>
                        </div>
                    </div>
                </div>
                <div className='about-madin-information'>
                    <h3 className='about-title'>Information</h3>
                    <div className='about-madin-information-row-container'>
                        <div className='about-madin-information-row'>
                            <span className='about-madin-information-text'>법인명(상호): 마딘베이커리</span>
                            <div className='about-madin-information-divider'></div>
                            <span className='about-madin-information-text'>사업자등록번호: 261-201-120120</span>
                        </div>
                        <div className='about-madin-information-row'>
                            <span className='about-madin-information-text'>통신판매업: 제 3012-경기고양-01125호</span>
                            <div className='about-madin-information-divider'></div>
                            <span className='about-madin-information-text'>개인정보보호 책임자: 심규빈</span>
                        </div>
                        <div className='about-madin-information-row'>
                            <span className='about-madin-information-text'>주소: 경기도 고양시 덕양구 원흥1로52 1층 Madin</span>
                            <div className='about-madin-information-divider'></div>
                            <span className='about-madin-information-text'>대표이사: 이지원</span>
                        </div>
                        <div className='about-madin-information-row'>
                            <span className='about-madin-information-text'>카카오톡 문의: madin_official</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}