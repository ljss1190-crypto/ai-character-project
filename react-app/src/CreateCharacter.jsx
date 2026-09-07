

import { useState } from 'react';             // ⑦현재 선택된 탭을 기억하기 위해 useState을 불러옴
import './CreateCharacter.css';               // ⑧ 캐릭터 생성 페이지 전용 CSS를 불러옴


/* CreateCharacter.jsx
→ 캐릭터 생성 화면을 만드는 컴포넌트
→ 캐릭터 이름, 성별, 나이, 소개 등의 입력 영역을 만들 예정
*/

function CreateCharacter () {                 // ① 캐릭터 생성 화면 컴포넌트 시작
    const [tab, setTab] = useState('persona');   // ⑨ 현재 선택된 탭을 기억함
    const [name, setName] = useState('');        // 캐릭터 이름 입력값을 기억함
    const [gender, setGender] = useState('');    // 캐릭터 성별 선택값을 기억함
    const [age, setAge] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [secret, setSecret] = useState('');
    const [title, setTitle] = useState('');
    const [worldIntroduction, setWorldIntroduction] = useState('');
    const [firstGreeting, setFirstGreeting] = useState('');


    function handleCreate () {

    const character = {

        name: name,
        gender: gender,
        age: age,
        introduction: introduction,
        secret: secret,
        title: title,
        worldIntroduction: worldIntroduction,
        firstGreeting: firstGreeting,
    };

    console.log(character);
}

    return (                                  // ② 화면에 보여줄 내용을 return
        <div className="create-page">

             {/* ③ 캐릭터 생성 페이지 상단 제목 */}
            <div className="create-header">
                <h2>캐릭터 만들기</h2>
                <button onClick={handleCreate}>생성</button>
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
                placeholder="캐릭터 이름을 입력해주세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
            />
            <p className="character-count">{name.length} / 20</p>
        </div>

            {/* 캐릭터 성별 */}
        <div className="form-group">
            <label>성별</label>

            <div className="gender-buttons">
                <button
                    className={gender === '여성' ? 'selected' : ''}
                    onClick={() => setGender('여성')}>여성</button>

                <button
                    className={gender === '남성' ? 'selected' : ''}
                    onClick={() => setGender('남성')}>남성</button>

                <button
                    className={gender === '기타' ? 'selected' : ''}
                    onClick={() => setGender('기타')}>기타</button>
            </div>
        </div>

        {/* 캐릭터 나이 */}
        <div className="form-group">
            <label htmlFor="character-age">나이</label>
            <input
                id="character-age"
                type="text"
                placeholder="25살, 500살, 나이 불명"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                maxLength={20}
            />
        </div>

        {/* 캐릭터 소개 */}
        <div className="form-group">
            <label htmlFor="character-introduction">캐릭터 소개</label>
            <textarea
                id="character-introduction"
                placeholder="캐릭터 소개를 입력해주세요."
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                maxLength={2000}
            />
            <p className="character-count">
                {introduction.length} / 2000
            </p>
        </div>

        {/* 비밀 설정 */}
        <div className="form-group">
            <label htmlFor="character-secret">캐릭터 비밀</label>
            <textarea
                id="character-secret"
                placeholder="캐릭터의 비밀을 입력해주세요."
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                maxLength={2000}
            />
            <p className="character-count">
                {secret.length} / 2000
            </p>
        </div>

    </div>
    )}

                
                {/* ⑪ 스토리 탭 */}
                {tab === 'story' && (
            <div className="story-form">
                <h3>스토리 설정</h3>

        <div className="form-group">
            <label>커버 이미지</label>
            <button className="image-upload">+</button>
            <p>스토리를 대표할 이미지를 추가해주세요.</p>
        </div>

        <div className="form-group">
            <label htmlFor="story-title">제목</label>
            <input
                id="story-title"
                type="text"
                placeholder="스토리 제목을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={30}
            />
            <p className="character-count">{title.length} / 30</p>
        </div>

        <div className="form-group">
            <label htmlFor="world-introduction">세계관 소개</label>
            <textarea
                id="world-introduction"
                placeholder="세계관을 소개해주세요."
                value={worldIntroduction}
                onChange={(e) => setWorldIntroduction(e.target.value)}
                maxLength={2000}
            />
            <p className="character-count">
                {worldIntroduction.length} / 2000
            </p>
        </div>

        <div className="form-group">
            <label htmlFor="first-greeting">첫 멘트</label>
            <textarea
                id="first-greeting"
                placeholder="캐릭터가 처음 건네는 말을 입력해주세요."
                value={firstGreeting}
                onChange={(e) => setFirstGreeting(e.target.value)}
                maxLength={2000}
            />
            <p className="character-count">
                {firstGreeting.length} / 2000
            </p>
        </div>

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

