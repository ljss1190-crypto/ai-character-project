
    import './Create.css';
/* ==========================================
    Create.jsx

    캐릭터를 실제로 입력하는 페이지로 들어가기 전
    보여주는 '제작' 메인 화면

    App.jsx에서 onCreateCharacter 함수를 받아서
    '캐릭터 만들기' 버튼을 눌렀을 때
    실제 CreateCharacter.jsx 화면으로 이동함
========================================== */

import { useNavigate } from 'react-router-dom';

function Create() {

    const navigate = useNavigate();

    return (
        <section className="create-menu-page">

            {/* 제작 페이지 제목 */}
            <div className="create-menu-header">
                <h2>제작</h2>

                <p>
                    나만의 AI 캐릭터와 이야기를 만들어보세요.
                </p>
            </div>


            {/* ==========================================
                새 캐릭터 만들기
            ========================================== */}
            <div className="create-menu-section">

                <h3>새로 만들기</h3>

                <button
                    type="button"
                    className="create-menu-card"
                    onClick={() => navigate('/create/character')}
                >
                    <span className="create-menu-plus">
                        +
                    </span>

                    <strong>
                        캐릭터 만들기
                    </strong>

                    <span className="create-menu-description">
                        캐릭터의 성격, 세계관과 이야기 설정을
                        직접 만들어보세요.
                    </span>
                </button>

            </div>


            {/* ==========================================
                나중에 Supabase를 연결하면
                사용자가 만든 캐릭터 목록이 표시될 영역
            ========================================== */}
            <div className="create-menu-section">

                <h3>내가 만든 캐릭터</h3>

                <div className="my-character-empty">
                    아직 만든 캐릭터가 없습니다.
                </div>

            </div>

        </section>
    );
}

export default Create;