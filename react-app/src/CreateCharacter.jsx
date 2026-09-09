

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

                                                                
    const [characterImages, setCharacterImages] = useState([]); // 선택한 캐릭터 이미지를 저장
    const MAX_CHARACTER_IMAGES = 5;            // 캐릭터 이미지는 최대 5장까지 추가 가능

    const [coverImages, setCoverImages] = useState([]); // 선택한 여러 장의 커버 이미지를 배열에 저장
    const MAX_COVER_IMAGES = 3;                 // 커버 이미지는 최대 3장까지 추가 가능
    const [errors, setErrors] = useState({});


    function handleCreate () {

        const newErrors = {
            characterImages: characterImages.length === 0,
            coverImages: coverImages.length === 0,
            name: name.trim() === '',
            gender: gender === '',
            introduction: introduction.trim() === '',
            title: title.trim() === '',
            worldIntroduction: worldIntroduction.trim() === '',
            firstGreeting: firstGreeting.trim() === '',
        };
        
        setErrors(newErrors);

        if (
            newErrors.characterImages ||
            newErrors.coverImages ||
            newErrors.name || 
            newErrors.gender || 
            newErrors.introduction || 
            newErrors.title || 
            newErrors.worldIntroduction || 
            newErrors.firstGreeting
        ) {
            return;
        }

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
            <label>
                캐릭터 이미지 <span className="required">*</span>
            </label>

            {/* 이미지 파일을 선택하는 입력칸 */}
            <input
                type="file"
                id="character-image-input"
                className="image-file-input"
                accept="image/*"
                onChange={(e) => {
                    const newImage = e.target.files[0];

                    if (newImage && characterImages.length < MAX_CHARACTER_IMAGES) {
                        setCharacterImages([...characterImages, newImage]);

                        // 이미지가 추가되면 이미지 필수 입력 오류를 없앰
                        if (errors.characterImages) {
                            setErrors({ ...errors, characterImages: false });
                        }
                    }
                }}
            />

            {/* 캐릭터 이미지들을 가로로 배치하는 영역 */}
            <div className="character-images">

            {/* 이미지가 최대 개수보다 적을 때만 + 버튼을 표시 */}
            {characterImages.length < MAX_CHARACTER_IMAGES && (
                <label
                    htmlFor="character-image-input"
                    className={errors.characterImages ? 'image-upload error' : 'image-upload'}
                >
                    +
                </label>
            )}
            

            {/* 선택한 캐릭터 이미지들을 하나씩 미리보기로 표시 */}
            {characterImages.map((image, index) => (
                <div className="image-preview-box" key={index}>

                <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt="캐릭터 이미지 미리보기"
                    className="character-image-preview"
                />

                {/* 이 이미지를 삭제하는 버튼 */}
                <button
                    type="button"
                    className="image-delete-button"
                    onClick={() => {
                        const newImages = characterImages.filter((_, i) => i !== index);
                        setCharacterImages(newImages);
                    }}
                >
                    ×
                </button>

                </div>
            ))}

        </div>
            <p>캐릭터를 대표할 이미지를 추가해주세요.</p>
        </div>

            {/* ⑯ 캐릭터 이름 */}
        <div className="form-group">
            <label htmlFor="character-name">
                캐릭터 이름 <span className="required">*</span>
                </label>

            <input
                id="character-name"
                type="text"
                className={errors.name ? 'error' : ''}
                value={name}
                onChange={(e) => {
                    setName(e.target.value);

                    // 캐릭터 이름을 입력하면 오류 표시를 바로 없앰
                    if (e.target.value.trim() !== '') {
                        setErrors({
                            ...errors,
                            name: false,
                        });
                    }
                }}

                maxLength={20}
                placeholder="캐릭터 이름을 입력해주세요."
            />
            <p className="character-count">{name.length} / 20</p>
        </div>

            {/* 캐릭터 성별 */}
        <div className="form-group">
            <label>
                성별 <span className="required">*</span>
                </label>

            <div className={errors.gender ? 'gender-buttons error' : 'gender-buttons'}>
                <button
                    className={gender === '여성' ? 'selected' : ''}
                    onClick={() => {
                        setGender('여성');

                    // 성별을 선택하면 오류 표시를 바로 없앰
                    setErrors({
                        ...errors,
                        gender: false,
                    });
                }}
            >
                여성
            </button>

                <button
                    className={gender === '남성' ? 'selected' : ''}
                    onClick={() => {
                        setGender('남성');

                        // 성별을 선택하면 오류 표시를 바로 없앰
                        setErrors({
                            ...errors,
                            gender: false,
                        });
                    }}
                >
                    남성
                </button>

                <button
                    className={gender === '기타' ? 'selected' : ''}
                    onClick={() => {
                        setGender('기타');

                        // 성별을 선택하면 오류 표시를 바로 없앰
                        setErrors({
                            ...errors,
                            gender: false,
                        });
                    }}
                >
                    기타
                </button>
            </div>
        </div>

        {/* 캐릭터 나이 */}
        <div className="form-group">
            <label htmlFor="character-age">나이</label>
            <input
                id="character-age"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                maxLength={20}
                placeholder="25살, 500살, 나이 불명"
            />
        </div>

        {/* 캐릭터 소개 */}
        <div className="form-group">
            <label htmlFor="character-introduction">
                캐릭터 소개 <span className="required">*</span>
                </label>
            <textarea
                id="character-introduction"
                className={errors.introduction ? 'error' : ''}
                value={introduction}
                onChange={(e) => {
                    setIntroduction(e.target.value);

                    // 캐릭터 소개를 입력하면 오류 표시를 바로 없앰
                    if (e.target.value.trim() !== '') {
                        setErrors({
                            ...errors,
                            introduction: false,
                        });
                    }
                }}
                maxLength={2000}
                placeholder="캐릭터 소개를 입력해주세요."
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
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                maxLength={2000}
                placeholder="캐릭터의 비밀을 입력해주세요."
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

    <label>
        커버 이미지 <span className="required">*</span>
    </label>

    {/* 실제 커버 이미지 파일을 선택하는 입력칸 */}
    <input
        type="file"
        id="cover-image-input"
        className="image-file-input"
        accept="image/*"
        onChange={(e) => {
            const newImage = e.target.files[0];

            if (newImage && coverImages.length < MAX_COVER_IMAGES) {
                setCoverImages([...coverImages, newImage]);

                // 커버 이미지가 추가되면 필수 입력 오류를 없앰
                if (errors.coverImages) {
                    setErrors({ ...errors, coverImages: false });
                }
            }
        }}
    />

        
    {/* 커버 이미지와 + 버튼을 가로로 나란히 배치 */}
    <div className="character-images">

    {/* 커버 이미지가 최대 개수보다 적을 때만 + 버튼을 표시 */}
    {coverImages.length < MAX_COVER_IMAGES && (
        <label
            htmlFor="cover-image-input"
            className={errors.coverImages ? 'image-upload error' : 'image-upload'}
        >
            +
        </label>
    )}

    {/* 선택한 커버 이미지들을 하나씩 미리보기로 표시 */}
    {coverImages.map((image, index) => (
        <div className="image-preview-box" key={index}>

            <img
                src={URL.createObjectURL(image)}
                alt="커버 이미지 미리보기"
                className="character-image-preview"
            />

            {/* 이 커버 이미지를 삭제하는 버튼 */}
            <button
                type="button"
                className="image-delete-button"
                onClick={() => {
                    const newImages = coverImages.filter((_, i) => i !== index);
                    setCoverImages(newImages);
                }}
            >
                ×
            </button>

        </div>
    ))}

</div>
    <p>스토리를 대표할 이미지를 추가해주세요.</p>

</div>

        <div className="form-group">
            <label htmlFor="story-title">
                제목 <span className="required">*</span>
                </label>
            <input
                id="story-title"
                type="text"
                className={errors.title ? 'error' : ''}
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);

                    // 스토리 제목을 입력하면 오류 표시를 바로 없앰
                    if (e.target.value.trim() !== '') {
                        setErrors({
                            ...errors,
                            title: false,
                        });
                    }
                }}

                maxLength={30}
                placeholder="스토리 제목을 입력해주세요."
            />
            <p className="character-count">{title.length} / 30</p>
        </div>

        <div className="form-group">
            <label htmlFor="world-introduction">
                세계관 소개 <span className="required">*</span>
                </label>
            <textarea
                id="world-introduction"
                className={errors.worldIntroduction ? 'error' : ''}
                value={worldIntroduction}
                onChange={(e) => {
                    setWorldIntroduction(e.target.value);

                    // 세계관 소개를 입력하면 오류 표시를 바로 없앰
                    if (e.target.value.trim() !== '') {
                        setErrors({
                            ...errors,
                            worldIntroduction: false,
                        });
                    }
                }}
                maxLength={2000}
                placeholder="세계관을 소개해주세요."
            />
            <p className="character-count">
                {worldIntroduction.length} / 2000
            </p>
        </div>

        <div className="form-group">
            <label htmlFor="first-greeting">
                첫 멘트 <span className="required">*</span>
                </label>
            <textarea
                id="first-greeting"
                className={errors.firstGreeting ? 'error' : ''}
                value={firstGreeting}
                onChange={(e) => {
                    setFirstGreeting(e.target.value);

                    // 첫 멘트를 입력하면 오류 표시를 바로 없앰
                    if (e.target.value.trim() !== '') {
                        setErrors({
                            ...errors,
                            firstGreeting: false,
                        });
                    }
                }}
                maxLength={2000}
                placeholder="처음 상황을 입력해주세요."
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

