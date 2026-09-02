
import './App.css';        // App.css에 작성한 디자인을 App.jsx에 불러온다.
import CreateCharacter from './CreateCharacter'; // 캐릭터 생성 화면 컴포넌트를 불러온다.
import { useState } from 'react'; // 화면의 상태(현재 어떤 화면인지)를 기억하기 위해 useState를 불러옴


/* App.jsx
→ 실제 화면 구조
→ 제목, 메뉴, 버튼, 카드 등 */


function App() {            // ① 함수 시작 (App이라는 화면 덩어리 컴포넌트를 만든다.)
  const [page, setPage] = useState('home'); // 현재 보여줄 화면을 기억함. 처음 화면은 home(메인)
  return (                  // ② return 시작 (화면에 보여줄 내용을 적는 곳)
    <>                      {/* ⑥ Fragment 시작 = header와 main을 하나로 묶음 */} 
            
    <header> 

      {/* ③ h1 = 사이트에서 가장 중요한 큰 제목 */}
      <h1>AI Character</h1>

      {/* ④ nav = 페이지를 이동하는 메뉴들을 묶는 영역 */}
      <nav>
        {/* a = 클릭해서 다른 곳으로 이동할 때 사용하는 링크 */}
        <a href="#" onClick={() => setPage('home')}>홈</a>
        <a href="#">탐색</a>

        {/* 캐릭터 만들기를 클릭하면 page를 create로 변경 */}
        <a href="#" onClick={() => setPage('create')}>캐릭터 만들기</a>
      </nav>

      {/* ⑤ button = 사용자가 클릭할 수 있는 버튼 */}
      <button>로그인</button>

    </header>

      {/* ⑦ main = 페이지의 주요 내용을 넣는 영역 */}
      <main>

      {/* ⑨ page가 create이면 캐릭터 생성 화면을 보여줌 */}
      {page === 'create' && <CreateCharacter />}

      {/* section = 관련된 내용을 하나의 구역으로 묶음 */}
      {/* ⑩ page가 home일 때만 추천 캐릭터 영역을 보여줌 */}
      {page === 'home' && (
        <section className="character-section">

          {/* h2 = h1보다 한 단계 아래의 제목 */}
          <h2>추천 캐릭터</h2>


          {/* ⑧ 캐릭터 카드들을 담는 영역 */}
          <div className="character-list">          {/* 큰 상자 */}


          {/* 캐릭터 한 명의 정보를 담는 카드 */}
          <div className="character-card">          {/* 카드 한 장 */}


          {/* 캐릭터 이미지가 들어갈 영역 */}
            <div className="character-image"></div>


          {/* 캐릭터 이름 */}
          <h3>캐릭터 이름</h3>

          {/* 캐릭터의 짧은 소개 */}
          <p>캐릭터의 소개가 표시되는 곳입니다.</p>

          </div>                                     {/* character-card 끝 */}

          </div>                                     {/* character-list 끝 */}

        </section>

        )}  {/* ⑩ home 화면 조건 끝 */}

      </main>
    </>
  );                        // ② return 끝 -> 그래서 ;가 여기!
}                           // ① 함수 끝

export default App;         // 다른 파일에서 이 App을 사용할 수 있게 내보내기

