

import './App.css';

import Create from './Create';
import CreateCharacter from './CreateCharacter';

/*
  Routes = 현재 주소(URL)에 맞는 화면을 보여줌
  Route  = 주소와 화면을 연결함
  Link   = React 안에서 다른 주소로 이동함
*/
import { Routes, Route, Link } from 'react-router-dom';


function App() {

  return (
    <>

      {/* ==========================================
          사이트 공통 상단 메뉴
      ========================================== */}
      <header>

        {/* 사이트 제목 */}
        <h1>AI Character</h1>


        {/* ==========================================
            페이지 이동 메뉴

            Link를 사용하면 화면 전체를 새로고침하지 않고
            React 안에서 URL을 변경할 수 있음
        ========================================== */}
        <nav>

          {/* 홈으로 이동 */}
          <Link to="/">
            홈
          </Link>


          {/*
            탐색 페이지는 아직 만들지 않았기 때문에
            현재는 화면 이동 기능을 연결하지 않음
          */}
          <a href="#">
            탐색
          </a>


          {/* 제작 메인 페이지로 이동 */}
          <Link to="/create">
            캐릭터 만들기
          </Link>

        </nav>


        {/* 로그인 기능은 나중에 연결 */}
        <button>
          로그인
        </button>

      </header>



      {/* ==========================================
          페이지의 주요 내용
      ========================================== */}
      <main>

        <Routes>


          {/* ==========================================
              홈

              주소:
              /
          ========================================== */}
          <Route
            path="/"
            element={

              <section className="character-section">

                <h2>추천 캐릭터</h2>


                {/* 캐릭터 카드들을 담는 영역 */}
                <div className="character-list">


                  {/* 캐릭터 한 명의 카드 */}
                  <div className="character-card">


                    {/* 캐릭터 이미지가 들어갈 영역 */}
                    <div className="character-image"></div>


                    {/* 캐릭터 이름 */}
                    <h3>
                      캐릭터 이름
                    </h3>


                    {/* 캐릭터 소개 */}
                    <p>
                      캐릭터의 소개가 표시되는 곳입니다.
                    </p>


                  </div>

                </div>

              </section>

            }
          />



          {/* ==========================================
              제작 메인 화면

              주소:
              /create

              여기에서 '캐릭터 만들기'를 누르면
              /create/character 로 이동함
          ========================================== */}
          <Route
            path="/create"
            element={
              <Create />
            }
          />



          {/* ==========================================
              실제 캐릭터 생성 화면

              주소:
              /create/character

              지금까지 만든
              페르소나 / 스토리 / 스타일 / 설정
              화면이 여기에 표시됨
          ========================================== */}
          <Route
            path="/create/character"
            element={
              <CreateCharacter />
            }
          />


        </Routes>

      </main>

    </>
  );
}


export default App;