

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/*
  BrowserRouter
  → React 사이트에서도 브라우저의 실제 주소(URL)를 사용해서
    페이지를 이동할 수 있게 해줌

  예:
  /                  → 홈
  /create            → 제작
  /create/character  → 캐릭터 만들기
*/
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import ScrollToTop from './ScrollToTop.jsx';


createRoot(document.getElementById('root')).render(

  <StrictMode>

    {/* App 전체에서 React Router를 사용할 수 있도록 감싸줌 */}
    <BrowserRouter>

      {/* 다른 페이지로 이동할 때 자동으로 맨 위로 이동 */}
      <ScrollToTop />

      <App />

    </BrowserRouter>

  </StrictMode>,

);

