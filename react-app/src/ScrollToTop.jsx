

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


/* ==========================================
    ScrollToTop.jsx

    다른 페이지로 이동할 때
    이전 페이지에서 사용하던 스크롤 위치를 유지하지 않고
    새 페이지의 맨 위에서 시작하도록 해주는 기능

    예:
    Footer에서 이용약관 클릭
    → /terms 이동
    → 자동으로 페이지 맨 위로 이동
========================================== */

function ScrollToTop() {

    /*
    현재 브라우저의 주소 정보를 가져옴

    예:
    /
    /create
    /terms
    /privacy
    /ai-policy
    */
    const { pathname } = useLocation();


    /*
        pathname이 변경될 때마다 실행됨.

        즉, 다른 페이지로 이동했을 때만
        스크롤을 맨 위로 올림.
    */
    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pathname]);


    /*
        이 컴포넌트는 화면에 직접 보여주는 것이 없음.
        스크롤 기능만 실행하므로 null을 반환함.
    */
    return null;
}


export default ScrollToTop;