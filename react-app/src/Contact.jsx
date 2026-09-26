

import './LegalPage.css';


/* ==========================================
    문의하기 페이지

    현재는 서비스 개발 단계이므로
    실제 문의 전송 기능은 아직 연결하지 않음.

    추후 문의/신고 시스템을 구현할 때
    실제 접수 기능을 연결할 예정.
========================================== */

function Contact() {

    return (
        <section className="legal-page">


            {/* 페이지 제목 */}
            <div className="legal-header">

                <h2>
                    문의하기
                </h2>

                <p>
                    서비스 이용과 관련된 문의를 안내합니다.
                </p>

            </div>


            {/* 문의 안내 */}
            <div className="legal-content">


                <div className="legal-section">

                    <h3>서비스 문의</h3>

                    <p>
                        AI Character 이용 중 발생한 문제나
                        서비스와 관련된 문의사항을 접수할 수 있습니다.
                    </p>

                    <p>
                        현재 서비스는 개발 단계이며,
                        정식 문의 접수 기능은 서비스 오픈 전에
                        제공될 예정입니다.
                    </p>

                </div>


                <div className="legal-section">

                    <h3>문의 가능한 내용</h3>

                    <ul>
                        <li>서비스 이용 관련 문의</li>
                        <li>계정 관련 문의</li>
                        <li>캐릭터 및 콘텐츠 관련 문의</li>
                        <li>결제 관련 문의</li>
                        <li>개인정보 관련 문의</li>
                        <li>서비스 오류 및 기타 문의</li>
                    </ul>

                </div>


                <div className="legal-section">

                    <h3>콘텐츠 신고</h3>

                    <p>
                        공개 캐릭터 또는 콘텐츠에 대한 신고 기능은
                        추후 서비스 내 신고 시스템을 통해
                        제공될 예정입니다.
                    </p>

                </div>


                <div className="legal-section">

                    <h3>문의 접수 방법</h3>

                    <p>
                        문의 접수 기능과 고객센터 이메일은
                        정식 서비스 오픈 전에 안내될 예정입니다.
                    </p>

                </div>


            </div>

        </section>
    );
}


export default Contact;