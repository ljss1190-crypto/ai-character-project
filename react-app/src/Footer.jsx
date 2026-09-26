

import './Footer.css';
import { Link } from 'react-router-dom';


/* ==========================================
    Footer.jsx

    사이트 모든 페이지 아래에 공통으로 표시되는 영역

    이용약관 / 개인정보처리방침 /
    AI 캐릭터 정책 / 청소년보호정책 /
    문의하기 링크와 서비스 정보를 표시함
========================================== */

function Footer() {

    return (
        <footer className="site-footer">

            <div className="footer-inner">


                {/* ==========================================
                    서비스 이름
                ========================================== */}
                <div className="footer-brand">
                    AI Character
                </div>


                {/* ==========================================
                    서비스 관련 정책 및 문의 링크
                ========================================== */}
                <nav className="footer-links">

                    <Link to="/terms">
                        이용약관
                    </Link>

                    <Link to="/privacy">
                        개인정보처리방침
                    </Link>

                    <Link to="/ai-policy">
                        AI 캐릭터 정책
                    </Link>

                    <Link to="/youth-protection">
                        청소년보호정책
                    </Link>

                    <Link to="/contact">
                        문의하기
                    </Link>

                </nav>


                <div className="footer-divider"></div>


                {/* ==========================================
                    사업자 정보

                    현재는 서비스 개발 단계이므로
                    실제 정보 대신 준비 중으로 표시

                    정식 서비스 오픈 시
                    실제 사업자 정보로 교체하면 됨
                ========================================== */}
                <div className="footer-business">

                    <div>
                        <span>상호명</span>
                        <p>AI Character</p>
                    </div>

                    <div>
                        <span>대표자</span>
                        <p>준비 중</p>
                    </div>

                    <div>
                        <span>사업자등록번호</span>
                        <p>준비 중</p>
                    </div>

                    <div>
                        <span>통신판매업신고번호</span>
                        <p>준비 중</p>
                    </div>

                    <div>
                        <span>고객센터</span>
                        <p>준비 중</p>
                    </div>

                    <div>
                        <span>이메일</span>
                        <p>준비 중</p>
                    </div>

                </div>


                {/* 개발 단계 안내 */}
                <p className="footer-business-notice">
                    사업자 정보는 정식 서비스 오픈 시 표시됩니다.
                </p>


                {/* ==========================================
                    저작권 표시
                ========================================== */}
                <p className="footer-copyright">
                    © 2026 AI Character. All rights reserved.
                </p>


            </div>

        </footer>
    );
}


export default Footer;