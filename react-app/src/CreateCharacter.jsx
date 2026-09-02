

import { useState } from 'react';             // ⑦현재 선택된 탭을 기억하기 위해 useState을 불러옴
import './CreateCharacter.css';               // ⑧ 캐릭터 생성 페이지 전용 CSS를 불러옴


/* CreateCharacter.jsx
→ 캐릭터 생성 화면을 만드는 컴포넌트
→ 캐릭터 이름, 성별, 나이, 소개 등의 입력 영역을 만들 예정
*/

function CreateCharacter () {                 // ① 캐릭터 생성 화면 컴포넌트 시작
    const [tab, setTab] = useState('persona');   // ⑨ 현재 선택된 탭을 기억함

    return (                                  // ② 화면에 보여줄 내용을 return
        <div className="create-page">

             {/* ③ 캐릭터 생성 페이지 상단 제목 */}
            <div className="create-header">
                <h2>캐릭터 만들기</h2>
                <button>생성</button>
            </div>

            
            {/* ④ 캐릭터 생성 단계 탭 */}
            <nav className="create-tabs">
                <button className={tab === 'persona' ? 'active' : ''} 
                onClick={() => setTab('persona')}>페르소나</button>

                <button className={tab === 'story' ? 'active' : ''} 
                onClick={() => setTab('story')}>스토리</button>

                <button className={tab === 'style' ? 'active' : ''} 
                onClick={() => setTab('style')}>스타일</button>

                <button className={tab === 'settings' ? 'active' : ''}
                onClick={() => setTab('settings')}>설정</button>
            </nav>

            {/* ⑤ 현재 선택된 단계의 내용이 들어갈 영역 */}
            <section className="create-content">

                 {/* ⑩ 페르소나 탭 */}
                {tab === 'persona' && (
                    <div className="persona-form">
                        <h3>기본 설정</h3>

                {/* ⑮ 캐릭터 이미지 */}
                <div className="form-group">
                    <label>캐릭터 이미지</label>
                    <button className="image-upload">+</button>
                    <p>캐릭터를 대표할 이미지를 추가해주세요.</p>
                </div>

                 {/* ⑯ 캐릭터 이름 */}
                <div className="form-group">
                    <label htmlFor="character-name">캐릭터 이름</label>
                    <input
                        id="character-name" 
                        type="text"
                        placeholder="캐릭터 이름을 입력해주세요."/>
                </div>
                    </div>
                )}
                
                {/* ⑪ 스토리 탭 */}
                {tab === 'story' && (
                    <div>
                        <h3>스토리 설정</h3>
                    </div>
                )}

                {/* ⑬ 스타일 탭 */}
                {tab === 'style' && (
                    <div>
                        <h3>스타일 설정</h3>
                    </div>
                )}

                {/* ⑭ 설정 탭 */}
                {tab === 'settings' && (
                    <div>
                        <h3>공개 설정</h3>
                    </div>
                )}
            </section>
            
        </div>
    );                                        // ② return 끝
}

export default CreateCharacter;               // ⑥ 다른 파일에서 사용할 수 있도록 내보내기

