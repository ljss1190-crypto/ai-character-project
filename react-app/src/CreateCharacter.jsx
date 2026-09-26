

import { useRef, useState } from 'react';  // ⑦현재 선택된 탭을 기억하기 위해 useState을 불러옴
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

    // ==========================================
    // 설정 탭에서 사용하는 값
    // ==========================================

    // 캐릭터 공개 여부
    // public = 공개 / private = 비공개
    const [visibility, setVisibility] = useState('public');

    // 이용 등급
    // all = 전체 이용가 / adult = 성인 이용가
    const [contentRating, setContentRating] = useState('all');

    // 작품을 보는 사용자에게 보여줄 작가의 코멘트
    const [authorComment, setAuthorComment] = useState(''); 

    // ==========================================
    // 스타일 탭에서 사용하는 값
    // ==========================================

    // 난이도
    // easy = 쉬운 / normal = 보통
    // hard = 어려운 / extreme = 극한
    const [difficulty, setDifficulty] = useState('normal');

    // 전개 속도
    // fast = 빠른 / natural = 자연스러운 / slow = 느린
    const [storySpeed, setStorySpeed] = useState('natural');

    // 시점
    // first = 1인칭 / second = 2인칭 / third = 3인칭
    const [pointOfView, setPointOfView] = useState('third');

    // 시제
    // past = 과거 / present = 현재
    const [tense, setTense] = useState('past');

    // 응답 길이
    // short = 짧은 / medium = 중간 / long = 긴 / auto = 자동
    const [responseLength, setResponseLength] = useState('auto');

    // 표현 방식
    // dialogue = 대화 더하기
    // balanced = 기본
    // action = 행동 더하기
    const [expressionStyle, setExpressionStyle] = useState('balanced');

    // 분위기는 최대 2개를 선택할 수 있으므로 배열로 저장
    const [moods, setMoods] = useState([]);

    // 스토리텔링 스타일
    // 아직 우리 서비스의 스타일 이름을 정하기 전이므로
    // 기본값은 설정 안 함
    const [storytellingStyle, setStorytellingStyle] = useState('none');

    const introductionRef = useRef(null); // 캐릭터1 소개 textarea
    const secretRef = useRef(null); // 캐릭터1 비밀 textarea
    const addedIntroductionRefs = useRef([]); // 캐릭터2~10 소개 textarea들을 각각 저장하는 ref 배열
    const addedSecretRefs = useRef([]); // 캐릭터2~10 비밀 textarea들을 각각 저장하는 ref 배열
    const worldIntroductionRef = useRef(null); // 세계관 소개 textarea의 커서 위치를 사용하기 위한 ref
    const firstGreetingRef = useRef(null);  // 첫 멘트 textarea의 현재 커서 위치를 사용하기 위해 연결
    
                                                                
    const [characterImages, setCharacterImages] = useState([]); // 선택한 캐릭터 이미지를 저장
    const MAX_CHARACTER_IMAGES = 5;            // 캐릭터 이미지는 최대 5장까지 추가 가능

    const [coverImages, setCoverImages] = useState([]); // 선택한 여러 장의 커버 이미지를 배열에 저장
    const MAX_COVER_IMAGES = 3;                 // 커버 이미지는 최대 3장까지 추가 가능

    
    const MAX_CHARACTERS = 10;                  // 생성할 수 있는 캐릭터는 최대 10명

    const [characterCount, setCharacterCount] = useState(1); // 현재 만들어진 캐릭터 수를 기억함

    const [characters, setCharacters] = useState([  // 여러 캐릭터의 정보를 한곳에 저장하는 배열
        {
            name: '',
            gender: '',
            age: '',
            introduction: '',
            secret: '',
            images: [],
        }
    ]);

    // ==========================================
    // 현재 펼쳐져 있는 캐릭터 번호
    //
    // 0 = 캐릭터1
    // 1 = 캐릭터2
    // 2 = 캐릭터3
    // ...
    //
    // 처음 페이지를 열면 캐릭터1이 펼쳐져 있음
    // ==========================================
    const [openCharacterIndex, setOpenCharacterIndex] = useState(0);


    const [errors, setErrors] = useState({});

    
    const [toastMessage, setToastMessage] = useState(''); // 삭제 완료 알림 문구


    // ==========================================
// 단어의 마지막 한글에 받침이 있는지 확인
//
// 예:
// 토토 → 마지막 글자 '토' → 받침 없음 → false
// 루시엘 → 마지막 글자 '엘' → 받침 있음 → true
// ==========================================
function hasFinalConsonant(word) {

    // 단어가 비어 있으면 false
    if (!word) {
        return false;
    }

    // 단어의 마지막 글자를 가져옴
    const lastCharacter = word[word.length - 1];

    // 마지막 글자를 유니코드 숫자로 변환
    const code = lastCharacter.charCodeAt(0);

    // 마지막 글자가 한글 '가' ~ '힣' 범위가 아니면 false
    if (code < 0xAC00 || code > 0xD7A3) {
        return false;
    }

    // 한글 한 글자는 받침 여부를 28가지 값으로 구분할 수 있음
    // 나머지가 0 → 받침 없음
    // 나머지가 0이 아님 → 받침 있음
    return (code - 0xAC00) % 28 !== 0;
}

// ==========================================
// 단어의 받침 여부에 따라 알맞은 조사 선택
//
// 예:
// getKoreanParticle('토토', '이/가') → '가'
// getKoreanParticle('루시엘', '이/가') → '이'
//
// getKoreanParticle('토토', '은/는') → '는'
// getKoreanParticle('루시엘', '은/는') → '은'
// ==========================================
function getKoreanParticle(word, particle) {

    // 위에서 만든 함수로 받침 여부 확인
    const hasFinal = hasFinalConsonant(word);

    // 이/가
    if (particle === '이/가') {
        return hasFinal ? '이' : '가';
    }

    // 은/는
    if (particle === '은/는') {
        return hasFinal ? '은' : '는';
    }

    // 을/를
    if (particle === '을/를') {
        return hasFinal ? '을' : '를';
    }

    // 지원하지 않는 조사라면
    // 입력받은 내용을 그대로 반환
    return particle;
}


// ==========================================
// {{user}}, {{char1}}, {{char2}} 등의 토큰을
// 실제 이름으로 변환하고 한국어 조사도 자동 처리
//
// 예:
// {{char1}}{{이/가}}
// 토토 → 토토가
// 루시엘 → 루시엘이
// ==========================================
function replaceTemplateText(text, allCharacters) {

    if (!text) {
        return '';
    }

    let result = text;

    // ==========================================
    // 1. 유저 토큰 + 조사 처리
    //
    // 예:
    // {{user}}{{이/가}} → 사용자가
    // {{user}}{{은/는}} → 사용자는
    // {{user}}{{을/를}} → 사용자를
    // ==========================================
    const userName = '사용자';

    ['이/가', '은/는', '을/를'].forEach((particle) => {
        result = result.replaceAll(
            `{{user}}{{${particle}}}`,
            userName + getKoreanParticle(userName, particle)
        );
    });

    // 조사가 붙지 않은 일반 {{user}} 처리
    result = result.replaceAll(
        '{{user}}',
        userName
    );

    // ==========================================
    // 2. 캐릭터 토큰 + 조사 처리
    // ==========================================
    allCharacters.forEach((character, index) => {

        // 캐릭터 이름
        // 이름이 비어 있으면 캐릭터1, 캐릭터2... 사용
        const characterName =
            character.name || `캐릭터${index + 1}`;

        // 현재 캐릭터 토큰
        // 예: {{char1}}
        const characterToken =
            `{{char${index + 1}}}`;

        // 조사 3종 자동 처리
        ['이/가', '은/는', '을/를'].forEach((particle) => {

            result = result.replaceAll(
                `${characterToken}{{${particle}}}`,
                characterName +
                    getKoreanParticle(
                        characterName,
                        particle
                    )
            );
        });

        // 조사가 붙지 않은 일반 캐릭터 토큰 처리
        result = result.replaceAll(
            characterToken,
            characterName
        );
    });

    return result;
}



    // ==========================================
// 첫 멘트 textarea의 현재 커서 위치에 토큰 삽입
// 예: {{user}}, {{char1}}, {{char2}}
// ==========================================
function insertFirstGreetingToken(token) {
    // ref로 연결한 첫 멘트 textarea를 가져옴
    const textarea = firstGreetingRef.current;

    // textarea를 찾지 못했으면 아무것도 하지 않음
    if (!textarea) {
        return;
    }

    // 현재 커서 또는 드래그 선택 영역의 시작/끝 위치
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 커서 앞부분 + 토큰 + 커서 뒷부분을 합침
    const newText =
        firstGreeting.slice(0, start) +
        token +
        firstGreeting.slice(end);

    // 첫 멘트 최대 글자 수가 2000자이므로
    // 2000자를 넘으면 삽입하지 않음
    if (newText.length > 2000) {
        return;
    }

    // 변경된 내용을 첫 멘트 state에 저장
    setFirstGreeting(newText);

    // 토큰이 들어갔으므로 첫 멘트 필수 입력 오류도 제거
    setErrors((prevErrors) => ({
        ...prevErrors,
        firstGreeting: false,
    }));

    // React가 화면을 다시 그린 뒤
    // textarea에 다시 포커스를 주고
    // 삽입한 토큰 바로 뒤로 커서를 이동
    requestAnimationFrame(() => {
        textarea.focus();

        const newCursorPosition = start + token.length;

        textarea.setSelectionRange(
            newCursorPosition,
            newCursorPosition
        );
    });
}


        // ==========================================
// 캐릭터1 소개 textarea의 현재 커서 위치에 토큰 삽입
// 예: {{user}}, {{char1}}, {{char2}}
// ==========================================
function insertIntroductionToken(token) {
    const textarea = introductionRef.current;

    if (!textarea) {
        return;
    }

    // 현재 커서 또는 드래그 선택 영역 위치
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 현재 위치에 토큰 삽입
    const newText =
        introduction.slice(0, start) +
        token +
        introduction.slice(end);

    // 캐릭터 소개는 최대 2000자
    if (newText.length > 2000) {
        return;
    }

    setIntroduction(newText);

    // 토큰이 입력되었으므로 필수 입력 오류 제거
    setErrors((prevErrors) => ({
        ...prevErrors,
        introduction: false,
    }));

    // React가 화면을 다시 그린 뒤
    // 토큰 뒤로 커서를 이동
    requestAnimationFrame(() => {
        textarea.focus();

        const newCursorPosition = start + token.length;

        textarea.setSelectionRange(
            newCursorPosition,
            newCursorPosition
        );
    });
}

            // ==========================================
// 캐릭터2~10 소개 textarea에 토큰 삽입
//
// index 0 = 캐릭터2
// index 1 = 캐릭터3
// index 2 = 캐릭터4
// ...
// ==========================================
function insertAddedIntroductionToken(index, token) {

    // 현재 캐릭터의 소개 textarea 가져오기
    const textarea = addedIntroductionRefs.current[index];

    if (!textarea) {
        return;
    }

    // 현재 커서 또는 드래그 선택 영역의 시작/끝 위치
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // characters 배열 복사
    const newCharacters = [...characters];

    // 반복문의 index 0은 캐릭터2이므로
    // 실제 characters 배열 위치는 index + 1
    const actualIndex = index + 1;

    // 현재 캐릭터 소개 내용
    const currentText =
        newCharacters[actualIndex].introduction;

    // 커서 위치에 토큰 삽입
    const newText =
        currentText.slice(0, start) +
        token +
        currentText.slice(end);

    // 소개는 최대 2000자
    if (newText.length > 2000) {
        return;
    }

    // 현재 캐릭터의 소개만 변경
    newCharacters[actualIndex].introduction = newText;

    // 변경된 배열 저장
    setCharacters(newCharacters);

    // 해당 캐릭터의 소개 필수 오류 제거
    setErrors((prevErrors) => {
        const newCharacterErrors = [
            ...(prevErrors.characters || [])
        ];

        newCharacterErrors[index] = {
            ...newCharacterErrors[index],
            introduction: false,
        };

        return {
            ...prevErrors,
            characters: newCharacterErrors,
        };
    });

    // 화면 반영 후 같은 textarea에 커서를 다시 놓음
    requestAnimationFrame(() => {
        textarea.focus();

        const newCursorPosition =
            start + token.length;

        textarea.setSelectionRange(
            newCursorPosition,
            newCursorPosition
        );
    });
}

        // ==========================================
// 캐릭터1 비밀 textarea의 현재 커서 위치에 토큰 삽입
// 예: {{user}}, {{char1}}, {{char2}}
// ==========================================
function insertSecretToken(token) {
    const textarea = secretRef.current;

    if (!textarea) {
        return;
    }

    // 현재 커서 또는 드래그 선택 영역 위치
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 현재 위치에 토큰 삽입
    const newText =
        secret.slice(0, start) +
        token +
        secret.slice(end);

    // 캐릭터 비밀은 최대 2000자
    if (newText.length > 2000) {
        return;
    }

    setSecret(newText);

    // React가 화면을 다시 그린 뒤
    // 삽입한 토큰 바로 뒤로 커서를 이동
    requestAnimationFrame(() => {
        textarea.focus();

        const newCursorPosition = start + token.length;

        textarea.setSelectionRange(
            newCursorPosition,
            newCursorPosition
        );
    });
}

            // ==========================================
// 캐릭터2~10 비밀 textarea에 토큰 삽입
//
// index 0 = 캐릭터2
// index 1 = 캐릭터3
// index 2 = 캐릭터4
// ...
// ==========================================
function insertAddedSecretToken(index, token) {

    // 현재 캐릭터의 비밀 textarea 가져오기
    const textarea = addedSecretRefs.current[index];

    // textarea를 찾지 못하면 실행하지 않음
    if (!textarea) {
        return;
    }

    // 현재 커서 또는 드래그 선택 영역의 시작/끝 위치
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // characters 배열 복사
    const newCharacters = [...characters];

    // 반복문의 index 0은 캐릭터2이므로
    // 실제 characters 배열에서는 index + 1 위치
    const actualIndex = index + 1;

    // 현재 캐릭터의 기존 비밀 내용
    const currentText =
        newCharacters[actualIndex].secret;

    // 현재 커서 위치에 토큰 삽입
    const newText =
        currentText.slice(0, start) +
        token +
        currentText.slice(end);

    // 캐릭터 비밀은 최대 2000자
    if (newText.length > 2000) {
        return;
    }

    // 현재 캐릭터의 비밀 내용만 변경
    newCharacters[actualIndex].secret = newText;

    // 변경된 characters 배열 저장
    setCharacters(newCharacters);

    // React가 변경된 내용을 화면에 반영한 뒤
    // 같은 textarea에 다시 커서를 놓음
    requestAnimationFrame(() => {
        textarea.focus();

        const newCursorPosition =
            start + token.length;

        textarea.setSelectionRange(
            newCursorPosition,
            newCursorPosition
        );
    });
}

    // ==========================================
// 세계관 소개 textarea의 현재 커서 위치에 토큰 삽입
// 예: {{user}}, {{char1}}, {{char2}}
// ==========================================
function insertWorldIntroductionToken(token) {
    // ref로 연결한 세계관 소개 textarea 가져오기
    const textarea = worldIntroductionRef.current;

    // textarea를 찾지 못하면 아무것도 하지 않음
    if (!textarea) {
        return;
    }

    // 현재 커서 또는 드래그 선택 영역의 시작/끝 위치
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 커서 앞부분 + 토큰 + 커서 뒷부분을 합침
    const newText =
        worldIntroduction.slice(0, start) +
        token +
        worldIntroduction.slice(end);

    // 세계관 소개 최대 글자 수는 2000자
    if (newText.length > 2000) {
        return;
    }

    // 변경된 내용을 state에 저장
    setWorldIntroduction(newText);

    // 토큰이 들어갔으므로 필수 입력 오류 제거
    setErrors((prevErrors) => ({
        ...prevErrors,
        worldIntroduction: false,
    }));

    // React가 화면을 다시 그린 뒤
    // textarea에 다시 포커스를 주고
    // 삽입한 토큰 바로 뒤로 커서를 이동
    requestAnimationFrame(() => {
        textarea.focus();

        const newCursorPosition = start + token.length;

        textarea.setSelectionRange(
            newCursorPosition,
            newCursorPosition
        );
    });
}

            // ==========================================
// 첫 멘트 내레이터 표시
//
// 글자를 드래그해서 선택한 경우:
// 토토가 문을 열었다.
// → *토토가 문을 열었다.*
//
// 아무것도 선택하지 않은 경우:
// → **
// 그리고 두 별표 사이에 커서를 둠
// → *|*
// ==========================================
function insertFirstGreetingNarrator() {
    // 첫 멘트 textarea 가져오기
    const textarea = firstGreetingRef.current;

    // textarea를 찾지 못하면 실행하지 않음
    if (!textarea) {
        return;
    }

    // 현재 커서 또는 드래그 영역의 시작/끝 위치
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 드래그해서 선택한 글자
    const selectedText = firstGreeting.slice(start, end);

    let newText;
    let newCursorPosition;

    // ==========================================
    // 글자를 드래그해서 선택한 경우
    // 선택한 글자의 앞뒤에 * 하나씩 붙임
    // ==========================================
    if (selectedText) {
        newText =
            firstGreeting.slice(0, start) +
            '*' +
            selectedText +
            '*' +
            firstGreeting.slice(end);

        // 완성된 문장 뒤로 커서 이동
        newCursorPosition = end + 2;
    }

    // ==========================================
    // 아무것도 선택하지 않은 경우
    // **를 넣고 두 별표 사이에 커서를 둠
    // ==========================================
    else {
        newText =
            firstGreeting.slice(0, start) +
            '**' +
            firstGreeting.slice(end);

        // *|* 상태가 되도록 가운데로 커서 이동
        newCursorPosition = start + 1;
    }

    // 첫 멘트 최대 글자 수는 2000자
    if (newText.length > 2000) {
        return;
    }

    // 변경된 내용을 저장
    setFirstGreeting(newText);

    // React가 화면을 다시 그린 다음
    // textarea로 포커스를 돌리고 커서를 이동
    requestAnimationFrame(() => {
        textarea.focus();

        textarea.setSelectionRange(
            newCursorPosition,
            newCursorPosition
        );
    });
}

    function handleCreate () {


        // 캐릭터 2번부터 마지막 캐릭터까지 필수값 검사
    const addedCharacterErrors = characters.slice(1).map((character) => ({
        images: character.images.length === 0,
        name: character.name.trim() === '',
        gender: character.gender === '',
        introduction: character.introduction.trim() === '',
    }));


        const newErrors = {
            characterImages: characterImages.length === 0,
            coverImages: coverImages.length === 0,
            name: name.trim() === '',
            gender: gender === '',
            introduction: introduction.trim() === '',
            title: title.trim() === '',
            worldIntroduction: worldIntroduction.trim() === '',
            firstGreeting: firstGreeting.trim() === '',

            characters: addedCharacterErrors,
        };
        
        setErrors(newErrors);

        // 캐릭터 2번부터 마지막 캐릭터까지
        // 필수값이 하나라도 비어 있는지 확인
        const hasAddedCharacterErrors = addedCharacterErrors.some(
            (characterError) =>
                characterError.images ||
                characterError.name ||
                characterError.gender ||
                characterError.introduction
        );

        // 캐릭터 1, 스토리, 캐릭터 2~10 중
        // 필수값이 하나라도 비어 있으면 생성을 멈춤
        if (
            newErrors.characterImages ||
            newErrors.coverImages ||
            newErrors.name ||
            newErrors.gender ||
            newErrors.introduction ||
            newErrors.title ||
            newErrors.worldIntroduction ||
            newErrors.firstGreeting ||
            hasAddedCharacterErrors
        ) {
            return;
        }

       // ==========================================
// 캐릭터 1~10의 정보를 하나의 배열로 합치기
// ==========================================

const allCharacters = [
    // 캐릭터 1
    // 캐릭터 1은 현재 별도의 state를 사용하고 있으므로
    // 여기서 하나의 객체로 만들어 배열 첫 번째에 넣음
    {
        name: name,
        gender: gender,
        age: age,
        introduction: introduction,
        secret: secret,
        images: characterImages,
    },

    // 캐릭터 2~10
    // characters[0]은 사용하지 않고 있으므로 제외하고,
    // characters[1]부터 마지막까지 가져와 뒤에 붙임
    ...characters.slice(1),
];


// ==========================================
// 하나의 스토리 데이터로 최종 정리
// ==========================================

const storyData = {
    // 스토리 정보
    title: title,
    
    // ==========================================
    // 설정 정보
    // ==========================================

    // 공개 / 비공개
    visibility: visibility,

    // 전체 이용가 / 성인 이용가
    contentRating: contentRating,

    // 작가의 코멘트
    authorComment: authorComment,

    // ==========================================
    // 스타일 정보
    // ==========================================

    // 난이도
    difficulty: difficulty,

    // 전개 속도
    storySpeed: storySpeed,

    // 시점
    pointOfView: pointOfView,

    // 시제
    tense: tense,

    // 응답 길이
    responseLength: responseLength,

    // 표현 방식
    expressionStyle: expressionStyle,

    // 선택한 분위기 목록
    moods: moods,

    // 스토리텔링 스타일
    storytellingStyle: storytellingStyle,

    // 세계관 안의 {{user}}, {{char1}}, {{char2}} 등도 치환
    worldIntroduction: replaceTemplateText(
        worldIntroduction,
        allCharacters
    ),

    // 첫 멘트 안의 {{user}}, {{char1}}, {{char2}} 등을
    // 실제 사용자/캐릭터 이름으로 바꿔서 저장
    firstGreeting: replaceTemplateText(
        firstGreeting,
        allCharacters
    ),
    coverImages: coverImages,

    // 위에서 합친 캐릭터 1~10
    characters: allCharacters,
};


// 현재는 서버로 보내기 전이므로
// 브라우저 콘솔에서 데이터가 제대로 만들어졌는지 확인
console.log(storyData);

}

    return (                                  // ② 화면에 보여줄 내용을 return
        <div 
        className="create-page">

             {/* ③ 캐릭터 생성 페이지 상단 제목 */}
            <div className="create-header">
                <h2>캐릭터 만들기</h2>
                <button onClick={handleCreate}>생성</button>
            </div>

            
            <nav className="create-tabs">
    <button
        type="button"
        className={tab === 'persona' ? 'active' : ''}
        onClick={() => setTab('persona')}
    >
        페르소나
    </button>

    <button
        type="button"
        className={tab === 'story' ? 'active' : ''}
        onClick={() => setTab('story')}
    >
        스토리
    </button>

    <button
        type="button"
        className={tab === 'style' ? 'active' : ''}
        onClick={() => setTab('style')}
    >
        스타일
    </button>

    <button
        type="button"
        className={tab === 'settings' ? 'active' : ''}
        onClick={() => setTab('settings')}
    >
        설정
    </button>
</nav>

            {/* ⑤ 현재 선택된 단계의 내용이 들어갈 영역 */}
            <section className="create-content">

                            
            {/* ⑩ 페르소나 탭 */}
            {tab === 'persona' && (
                <div className="persona-form">
                    <h3>기본 설정</h3>

        {/* ==========================================
        캐릭터1 접기/펼치기 헤더
        - 현재는 헤더만 먼저 추가
        - 실제 입력 영역 접기/펼치기는 다음 단계에서 연결
        ========================================== */}
    <button
        type="button"
        className="character-toggle-header"
        onClick={() =>
            setOpenCharacterIndex(
                openCharacterIndex === 0 ? null : 0
            )
        }
    >
        {openCharacterIndex === 0 ? '▼' : '▶'} 캐릭터1
        {name.trim() !== '' ? ` (${name})` : ''}
    </button>  

        {/* 캐릭터1이 선택되어 있을 때만 입력 영역을 보여줌 */}
        {openCharacterIndex === 0 && (
        <>

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
                    className={
                        errors.characterImages
                            ? 'image-upload error'
                            : 'image-upload'
                        }
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


            {/* 캐릭터 이름 */}
<div className="form-group">
    <label>
        캐릭터 이름 <span className="required">*</span>
    </label>

    {/* 캐릭터 1 이름 입력칸 */}
    <input
        type="text"
        className={errors.name ? 'error' : ''}
        value={name}
        maxLength={20}
        onChange={(e) => {
            setName(e.target.value);

            // 이름을 입력하면 빨간 테두리를 바로 없앰
            if (e.target.value.trim() !== '') {
                setErrors({
                    ...errors,
                    name: false,
                });
            }
        }}
        placeholder="캐릭터 이름을 입력해주세요."
    />

    {/* 이름 글자 수 표시 */}
    <p className="character-count">
        {name.length} / 20
    </p>
</div>
            
            {/* 캐릭터 성별 */}
<div className="form-group">
    <label>
        성별 <span className="required">*</span>
    </label>

    {/* 캐릭터 1의 성별 버튼 영역 */}
    <div
        className={
            errors.gender
                ? 'gender-buttons error'
                : 'gender-buttons'
        }
    >
        {/* 여성 선택 */}
        <button
            type="button"
            className={gender === '여성' ? 'selected' : ''}
            onClick={() => {
                // 캐릭터 1 성별을 여성으로 저장
                setGender('여성');

                // 성별을 선택하면 빨간 오류 표시를 없앰
                setErrors({
                    ...errors,
                    gender: false,
                });
            }}
        >
            여성
        </button>

        {/* 남성 선택 */}
        <button
            type="button"
            className={gender === '남성' ? 'selected' : ''}
            onClick={() => {
                // 캐릭터 1 성별을 남성으로 저장
                setGender('남성');

                // 성별을 선택하면 빨간 오류 표시를 없앰
                setErrors({
                    ...errors,
                    gender: false,
                });
            }}
        >
            남성
        </button>

        {/* 기타 선택 */}
        <button
            type="button"
            className={gender === '기타' ? 'selected' : ''}
            onClick={() => {
                // 캐릭터 1 성별을 기타로 저장
                setGender('기타');

                // 성별을 선택하면 빨간 오류 표시를 없앰
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
                ref={introductionRef}
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

                {/* 캐릭터1 소개 토큰 버튼 */}
<div className="token-buttons">

    {/* 유저 토큰 */}
    <button
        type="button"
        onClick={() => insertIntroductionToken('{{user}}')}
    >
        + 유저
    </button>

    {/* 현재 만들어진 캐릭터 수만큼 토큰 버튼 생성 */}
    {characters.map((_, index) => (
        <button
            key={index}
            type="button"
            onClick={() =>
                insertIntroductionToken(
                    `{{char${index + 1}}}`
                )
            }
        >
            + 캐릭터{index + 1}
            {index === 0
                ? (name.trim() !== '' ? ` (${name})` : '')
                : (characters[index].name.trim() !== ''
                    ? ` (${characters[index].name})`
                    : '')
            }
        </button>
    ))}

</div>

            <p className="character-count">
                {introduction.length} / 2000
            </p>
        </div>

            {/* 비밀 설정 */}
        <div className="form-group">
            <label htmlFor="character-secret">캐릭터 비밀</label>
            <textarea
                id="character-secret"
                ref={secretRef}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                maxLength={2000}
                placeholder="캐릭터의 비밀을 입력해주세요."
            />

            {/* 캐릭터1 비밀 토큰 버튼 */}
<div className="token-buttons">

    {/* 유저 토큰 */}
    <button
        type="button"
        onClick={() => insertSecretToken('{{user}}')}
    >
        + 유저
    </button>

    {/* 현재 만들어진 캐릭터 수만큼 토큰 버튼 생성 */}
    {characters.map((_, index) => (
        <button
            key={index}
            type="button"
            onClick={() =>
                insertSecretToken(
                    `{{char${index + 1}}}`
                )
            }
        >
            + 캐릭터{index + 1}
            {index === 0
                ? (name.trim() !== '' ? ` (${name})` : '')
                : (characters[index].name.trim() !== ''
                    ? ` (${characters[index].name})`
                    : '')
            }
        </button>
    ))}

</div>

            <p className="character-count">
                {secret.length} / 2000
            </p>
        </div>

        </>
    )}

            {characters.slice(1).map((character, index) => (
                <div key={index}>

                    <div className="character-block-header">
                        <button
                            type="button"
                            className="character-toggle-header"
                            onClick={() =>
                                setOpenCharacterIndex(
                                    openCharacterIndex === index + 1
                                        ? null
                                        : index + 1
                                )
                            }
                        >
                            {openCharacterIndex === index + 1 ? '▼' : '▶'} 캐릭터{index + 2}
                            {character.name.trim() !== '' ? ` (${character.name})` : ''}
                        </button>

                        <button
                            type="button"
                            className="character-delete-button"
                            onClick={() => {
    // ================================
    // 캐릭터 2~10 삭제 처리
    // ================================

    // 반복문의 index 0은 캐릭터 2이므로
    // 실제 characters 배열 위치는 index + 1
    const actualIndex = index + 1;

    // 선택한 캐릭터를 배열에서 삭제
    const newCharacters = characters.filter(
        (_, i) => i !== actualIndex
    );

    // 변경된 캐릭터 배열 저장
    setCharacters(newCharacters);

    // 현재 캐릭터 수 1 감소
    setCharacterCount(characterCount - 1);

    // ==========================================
    // 캐릭터 삭제 후 펼쳐진 캐릭터 위치 조정
    // ==========================================

    // 현재 펼쳐진 캐릭터를 삭제한 경우
    // 캐릭터1을 펼침
    if (openCharacterIndex === actualIndex) {
        setOpenCharacterIndex(0);
    }

    // 현재 펼쳐진 캐릭터보다 앞쪽 캐릭터를 삭제한 경우
    // 배열 번호가 하나씩 앞으로 당겨지므로
    // 펼쳐진 위치도 1 감소시킴
    else if (openCharacterIndex > actualIndex) {
        setOpenCharacterIndex(openCharacterIndex - 1);
    }

    // 이미 오류 정보가 만들어져 있다면
    // 삭제한 캐릭터의 오류 정보도 같이 삭제
    if (errors.characters) {
        const newCharacterErrors = errors.characters.filter(
            (_, errorIndex) => errorIndex !== index
        );

        setErrors({
            ...errors,
            characters: newCharacterErrors,
        });
    }

    // 삭제 완료 알림
    setToastMessage('캐릭터가 삭제되었습니다.');

    setTimeout(() => {
        setToastMessage('');
    }, 2500);
}}
                        >
                            삭제
                        </button>
                </div>

            {/* ================================ */}
{/* 캐릭터 2~10 반복 영역 - 이미지 */}
{/* ================================ */}

{/* 현재 선택된 캐릭터의 입력 영역만 펼쳐서 보여줌 */}
{openCharacterIndex === index + 1 && (
    <>

<div className="form-group">
    <label>
        캐릭터 이미지 <span className="required">*</span>
    </label>

    {/* 캐릭터 2~10 이미지 파일 선택 */}
    <input
        type="file"
        id={`character-image-input-${index + 2}`}
        className="image-file-input"
        accept="image/*"
        onChange={(e) => {
            // 방금 선택한 이미지 파일 1개
            const newImage = e.target.files[0];

            // 이미지가 있고, 현재 캐릭터 이미지가 5장 미만일 때만 추가
            if (
                newImage &&
                character.images.length < MAX_CHARACTER_IMAGES
            ) {
                // 전체 characters 배열을 복사
                const newCharacters = [...characters];

                // 현재 반복 중인 캐릭터의 이미지 배열에 추가
                // index 0 = 캐릭터 2이므로 실제 배열 위치는 index + 1
                newCharacters[index + 1].images = [
                    ...newCharacters[index + 1].images,
                    newImage
                ];

                // 변경된 characters 저장
                setCharacters(newCharacters);

                // 현재 캐릭터의 이미지 필수 오류만 제거
                const newCharacterErrors = [
                    ...(errors.characters || [])
                ];

                newCharacterErrors[index] = {
                    ...newCharacterErrors[index],
                    images: false,
                };

                setErrors({
                    ...errors,
                    characters: newCharacterErrors,
                });
            }
        }}
    />

    {/* + 버튼과 이미지 미리보기 영역 */}
    <div className="character-images">

        {/* 이미지가 5장보다 적을 때만 + 버튼 표시 */}
        {character.images.length < MAX_CHARACTER_IMAGES && (
            <label
                htmlFor={`character-image-input-${index + 2}`}
                className={
                    errors.characters?.[index]?.images
                        ? 'image-upload error'
                        : 'image-upload'
                }
            >
                +
            </label>
        )}

        {/* 현재 캐릭터의 이미지들을 하나씩 표시 */}
        {character.images.map((image, imageIndex) => (
            <div
                className="image-preview-box"
                key={imageIndex}
            >
                <img
                    src={URL.createObjectURL(image)}
                    alt="캐릭터 이미지 미리보기"
                    className="character-image-preview"
                />

                {/* 현재 이미지 삭제 */}
                <button
                    type="button"
                    className="image-delete-button"
                    onClick={() => {
                        const newCharacters = [...characters];

                        newCharacters[index + 1].images =
                            newCharacters[index + 1].images.filter(
                                (_, i) => i !== imageIndex
                            );

                        setCharacters(newCharacters);
                    }}
                >
                    ×
                </button>
            </div>
        ))}

    </div>

    <p>캐릭터를 대표할 이미지를 추가해주세요.</p>
</div>

            {/* 캐릭터 이름  */}
<div className="form-group">
    <label>
        캐릭터 이름 <span className="required">*</span>
    </label>

    {/* 캐릭터 2~10 이름 입력칸 */}
    <input
        type="text"
        className={
            errors.characters?.[index]?.name ? 'error' : ''
        }
        value={character.name}
        maxLength={20}
        onChange={(e) => {
            // 여러 캐릭터 정보를 복사
            const newCharacters = [...characters];

            // 현재 캐릭터 이름 변경
            newCharacters[index + 1].name = e.target.value;

            // 변경된 캐릭터 정보 저장
            setCharacters(newCharacters);

            // 이름이 입력되면 해당 캐릭터의 이름 오류만 바로 없앰
            if (e.target.value.trim() !== '') {
                const newCharacterErrors = [
                    ...(errors.characters || [])
                ];

                newCharacterErrors[index] = {
                    ...newCharacterErrors[index],
                    name: false,
                };

                setErrors({
                    ...errors,
                    characters: newCharacterErrors,
                });
            }
        }}
        placeholder="캐릭터 이름을 입력해주세요."
    />

    {/* 이름 글자 수 표시 */}
    <p className="character-count">
        {character.name.length} / 20
    </p>
</div>

            {/* ============================= */}
{/* 캐릭터 2~10 반복 영역 - 성별*/}
{/* ============================= */}

<div className="form-group">
    <label>
        성별 <span className="required">*</span>
    </label>

    {/* 현재 반복 중인 캐릭터의 성별 오류가 있으면 빨간 테두리 표시 */}
    <div
        className={
            errors.characters?.[index]?.gender
                ? 'gender-buttons error'
                : 'gender-buttons'
        }
    >
        {/* 여성 선택 버튼 */}
        <button
            type="button"
            className={
                character.gender === '여성'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                // characters 배열을 복사
                const newCharacters = [...characters];

                // 현재 반복 중인 캐릭터의 성별을 여성으로 변경
                // index 0은 실제 characters 배열에서는 캐릭터 2이므로 +1
                newCharacters[index + 1].gender = '여성';

                // 변경된 캐릭터 정보 저장
                setCharacters(newCharacters);

                // 해당 캐릭터의 성별 오류만 제거
                const newCharacterErrors = [
                    ...(errors.characters || [])
                ];

                newCharacterErrors[index] = {
                    ...newCharacterErrors[index],
                    gender: false,
                };

                setErrors({
                    ...errors,
                    characters: newCharacterErrors,
                });
            }}
        >
            여성
        </button>

        {/* 남성 선택 버튼 */}
        <button
            type="button"
            className={
                character.gender === '남성'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                // characters 배열을 복사
                const newCharacters = [...characters];

                // 현재 반복 중인 캐릭터의 성별을 남성으로 변경
                newCharacters[index + 1].gender = '남성';

                // 변경된 캐릭터 정보 저장
                setCharacters(newCharacters);

                // 해당 캐릭터의 성별 오류만 제거
                const newCharacterErrors = [
                    ...(errors.characters || [])
                ];

                newCharacterErrors[index] = {
                    ...newCharacterErrors[index],
                    gender: false,
                };

                setErrors({
                    ...errors,
                    characters: newCharacterErrors,
                });
            }}
        >
            남성
        </button>

        {/* 기타 선택 버튼 */}
        <button
            type="button"
            className={
                character.gender === '기타'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                // characters 배열을 복사
                const newCharacters = [...characters];

                // 현재 반복 중인 캐릭터의 성별을 기타로 변경
                newCharacters[index + 1].gender = '기타';

                // 변경된 캐릭터 정보 저장
                setCharacters(newCharacters);

                // 해당 캐릭터의 성별 오류만 제거
                const newCharacterErrors = [
                    ...(errors.characters || [])
                ];

                newCharacterErrors[index] = {
                    ...newCharacterErrors[index],
                    gender: false,
                };

                setErrors({
                    ...errors,
                    characters: newCharacterErrors,
                });
            }}
        >
            기타
        </button>
    </div>
</div>


            {/* 캐릭터 나이 */}
        <div className="form-group">
            <label>나이</label>

            <input
                type="text"
                value={character.age}
                maxLength={20}
                onChange={(e) => {
                    const newCharacters = [...characters];
                    newCharacters[index + 1].age = e.target.value;
                    setCharacters(newCharacters);
                }}
                placeholder="25살, 500살, 나이 불명"
            />
        </div>

        {/* 캐릭터 소개 */}
        <div className="form-group">
            <label>
                    캐릭터 소개 <span className="required">*</span>
            </label>

            <textarea
                ref={(element) => {
                addedIntroductionRefs.current[index] = element;
                }}
                className={
                    errors.characters?.[index]?.introduction ? 'error' : ''
            }
                value={character.introduction}
                maxLength={2000}
                onChange={(e) => {
    // ================================
    // 캐릭터 2~10 소개 입력 처리
    // ================================

    // 전체 캐릭터 배열을 복사
    const newCharacters = [...characters];

    // 현재 캐릭터의 소개 내용을 변경
    // index 0 = 캐릭터 2이므로 실제 배열 위치는 index + 1
    newCharacters[index + 1].introduction = e.target.value;

    // 변경된 캐릭터 정보 저장
    setCharacters(newCharacters);

    // 소개를 한 글자라도 입력하면
    // 현재 캐릭터의 '소개 필수 오류'만 바로 제거
    if (e.target.value.trim() !== '') {
        const newCharacterErrors = [
            ...(errors.characters || [])
        ];

        newCharacterErrors[index] = {
            ...newCharacterErrors[index],
            introduction: false,
        };

        setErrors({
            ...errors,
            characters: newCharacterErrors,
        });
    }
}}
                placeholder="캐릭터 소개를 입력해주세요."
            />

            {/* 캐릭터2~10 소개 토큰 버튼 */}
<div className="token-buttons">

    {/* 유저 토큰 */}
    <button
        type="button"
        onClick={() =>
            insertAddedIntroductionToken(
                index,
                '{{user}}'
            )
        }
    >
        + 유저
    </button>

    {/* 현재 만들어진 캐릭터 수만큼 캐릭터 토큰 버튼 생성 */}
    {characters.map((_, tokenIndex) => (
        <button
            key={tokenIndex}
            type="button"
            onClick={() =>
                insertAddedIntroductionToken(
                    index,
                    `{{char${tokenIndex + 1}}}`
                )
            }
        >
            + 캐릭터{tokenIndex + 1}

            {tokenIndex === 0
                ? (name.trim() !== ''
                    ? ` (${name})`
                    : '')
                : (characters[tokenIndex].name.trim() !== ''
                    ? ` (${characters[tokenIndex].name})`
                    : '')
            }
        </button>
    ))}

</div>

            <p className="character-count">
                {character.introduction.length} / 2000
            </p>
        </div>


        {/* 캐릭터 비밀 */}
        <div className="form-group">
            <label>캐릭터 비밀</label>

            <textarea
                ref={(element) => {
                addedSecretRefs.current[index] = element;
                }}

                value={character.secret}
                maxLength={2000}
                onChange={(e) => {
                    const newCharacters = [...characters];
                    newCharacters[index + 1].secret = e.target.value;
                    setCharacters(newCharacters);
                }}
                placeholder="캐릭터의 비밀을 입력해주세요."
        />

             {/* 캐릭터2~10 비밀 토큰 버튼 */}
<div className="token-buttons">

    {/* 유저 토큰 */}
    <button
        type="button"
        onClick={() =>
            insertAddedSecretToken(
                index,
                '{{user}}'
            )
        }
    >
        + 유저
    </button>

    {/* 현재 만들어진 캐릭터 수만큼 캐릭터 토큰 버튼 생성 */}
    {characters.map((_, tokenIndex) => (
        <button
            key={tokenIndex}
            type="button"
            onClick={() =>
                insertAddedSecretToken(
                    index,
                    `{{char${tokenIndex + 1}}}`
                )
            }
        >
            + 캐릭터{tokenIndex + 1}

            {tokenIndex === 0
                ? (name.trim() !== ''
                    ? ` (${name})`
                    : '')
                : (characters[tokenIndex].name.trim() !== ''
                    ? ` (${characters[tokenIndex].name})`
                    : '')
            }
        </button>
    ))}

</div>   

        <p className="character-count">
            {character.secret.length} / 2000
        </p>
    </div> 
        
        </>
    )}

    </div>
    ))}
    {/* 위에 div는 반복되는 캐릭터 입력 영역의 div 끝(한 명 전체 끝) */}

            {/* 캐릭터 추가 버튼 */}
            {characterCount < MAX_CHARACTERS && (
                <button
                    type="button"
                    className="character-add-button"

                    onClick={() => {
                        setCharacterCount(characterCount + 1);

                        setCharacters([
                            ...characters,
                            {
                                name: '',
                                gender: '',
                                age: '',
                                introduction: '',
                                secret: '',
                                images: [],
                            }
                        ]);
                        
                        // 새로 추가한 캐릭터를 자동으로 펼치기
                        // characters.length가 새 캐릭터의 번호(index)가 됨
                        setOpenCharacterIndex(characters.length);
                    }}
                >
                    + 캐릭터 추가 {characterCount} / {MAX_CHARACTERS}
                </button>
        )}

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
                ref={worldIntroductionRef}
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

            {/* ==========================================
                세계관 소개 토큰 버튼
                - 유저 버튼은 {{user}} 삽입
                - 캐릭터 버튼은 현재 캐릭터 수만큼 자동 생성
            ========================================== */}
            <div className="token-buttons">

                {/* 유저 토큰 */}
                <button
                    type="button"
                    onClick={() =>
                        insertWorldIntroductionToken('{{user}}')
                    }
                >
                    + 유저
                </button>

                {/* 캐릭터1 ~ 현재 만들어진 캐릭터 수만큼 자동 생성 */}
                {characters.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() =>
                            insertWorldIntroductionToken(
                                `{{char${index + 1}}}`
                            )
                        }
                    >
                        + 캐릭터{index + 1}
                        {index === 0
                            ? (name.trim() !== '' ? ` (${name})` : '')
                            : (characters[index].name.trim() !== ''
                                ? ` (${characters[index].name})`
                                : '')
                        }
                    </button>
                ))}

            </div>

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
                ref={firstGreetingRef}
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

            {/* ==========================================
    첫 멘트 토큰 버튼
    - 유저 버튼은 {{user}} 삽입
    - 캐릭터 버튼은 현재 만들어진 캐릭터 수만큼 자동 생성
========================================== */}
<div className="token-buttons">

        {/* 내레이터 표시 */}
    <button
        type="button"
        onClick={insertFirstGreetingNarrator}
    >
        + 내레이터
    </button>

    {/* 유저 토큰 */}
    <button
        type="button"
        onClick={() => insertFirstGreetingToken('{{user}}')}
    >
        + 유저
    </button>

    {/* 
        characters 배열 길이만큼 캐릭터 버튼 생성

        캐릭터가 1명일 때:
        + 캐릭터1

        캐릭터가 2명일 때:
        + 캐릭터1 + 캐릭터2

        버튼을 누르면 각각
        {{char1}}, {{char2}} ... 가 삽입됨
    */}
    {characters.map((_, index) => (
        <button
            key={index}
            type="button"
            onClick={() =>
                insertFirstGreetingToken(
                    `{{char${index + 1}}}`
                )
            }
        >
            + 캐릭터{index + 1}
{index === 0
    ? (name.trim() !== '' ? ` (${name})` : '')
    : (characters[index].name.trim() !== ''
        ? ` (${characters[index].name})`
        : '')
}
        </button>
    ))}

    </div>
        

        {/* 첫 멘트 글자 수 표시 */}
        <p className="character-count">
            {firstGreeting.length} / 2000
        </p>

        {/* 첫 멘트 form-group 끝 */}
        </div>

        {/* 스토리 입력 영역 끝 */}
        </div>
        )}      


            {/* ==========================================
            ⑫ 스타일 탭
            ========================================== */}
            {tab === 'style' && (
                <div className="style-form">

                <h3>스타일 설정</h3>

            {/* ==========================================
            진행 방식
            ========================================== */}
        <div className="style-section">

            <h4>진행 방식</h4>

            {/* ==========================================
                난이도

                easy    = 쉬운
                normal  = 보통
                hard    = 어려운
                extreme = 극한
            ========================================== */}
            <div className="form-group">

                <label>난이도</label>

                <div className="style-option-buttons">

                    <button
                        type="button"
                        className={
                            difficulty === 'easy'
                                ? 'selected'
                                : ''
                        }
                        onClick={() => {
                            setDifficulty('easy');
                        }}
                    >
                        쉬운
                    </button>

                    <button
                        type="button"
                        className={
                            difficulty === 'normal'
                                ? 'selected'
                                : ''
                        }
                        onClick={() => {
                            setDifficulty('normal');
                        }}
                    >
                        보통
                    </button>

                    <button
                        type="button"
                        className={
                            difficulty === 'hard'
                                ? 'selected'
                                : ''
                        }
                        onClick={() => {
                            setDifficulty('hard');
                        }}
                    >
                        어려운
                    </button>

                    <button
                        type="button"
                        className={
                            difficulty === 'extreme'
                                ? 'selected'
                                : ''
                        }
                        onClick={() => {
                            setDifficulty('extreme');
                        }}
                    >
                        극한
                    </button>

                </div>

                    <p>
    캐릭터들이 각자의 성격과 상황에 맞춰 개연성 있게 행동해요.
</p>

</div>

{/* ==========================================
    전개 속도

    fast    = 빠른
    natural = 자연스러운
    slow    = 느린
========================================== */}
<div className="form-group">

    <label>전개 속도</label>

    <div className="style-option-buttons">

        {/* 빠른 */}
        <button
            type="button"
            className={
                storySpeed === 'fast'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setStorySpeed('fast');
            }}
        >
            빠른
        </button>

        {/* 자연스러운 */}
        <button
            type="button"
            className={
                storySpeed === 'natural'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setStorySpeed('natural');
            }}
        >
            자연스러운
        </button>

        {/* 느린 */}
        <button
            type="button"
            className={
                storySpeed === 'slow'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setStorySpeed('slow');
            }}
        >
            느린
        </button>

    </div>

    <p>
    이야기에 맞춰 전개 속도를 조절해요.
</p>

</div>

{/* 진행 방식 영역 끝 */}
</div>


{/* ==========================================
    스토리 연출
========================================== */}
<div className="style-section">

    <h4>스토리 연출</h4>

    {/* ==========================================
        시점

        first  = 1인칭
        second = 2인칭
        third  = 3인칭
    ========================================== */}
    <div className="form-group">

        <label>시점</label>

        <div className="style-option-buttons">

            {/* 1인칭 */}
            <button
                type="button"
                className={
                    pointOfView === 'first'
                        ? 'selected'
                        : ''
                }
                onClick={() => {
                    setPointOfView('first');
                }}
            >
                1인칭
            </button>

            {/* 2인칭 */}
            <button
                type="button"
                className={
                    pointOfView === 'second'
                        ? 'selected'
                        : ''
                }
                onClick={() => {
                    setPointOfView('second');
                }}
            >
                2인칭
            </button>

            {/* 3인칭 */}
            <button
                type="button"
                className={
                    pointOfView === 'third'
                        ? 'selected'
                        : ''
                }
                onClick={() => {
                    setPointOfView('third');
                }}
            >
                3인칭
            </button>

        </div>

        <p>
            이야기를 서술하는 시점을 선택해주세요.
        </p>

    </div>


    {/* ==========================================
        시제

        past    = 과거
        present = 현재
    ========================================== */}
    <div className="form-group">

        <label>시제</label>

        <div className="style-option-buttons">

            {/* 과거 */}
            <button
                type="button"
                className={
                    tense === 'past'
                        ? 'selected'
                        : ''
                }
                onClick={() => {
                    setTense('past');
                }}
            >
                과거
            </button>

            {/* 현재 */}
            <button
                type="button"
                className={
                    tense === 'present'
                        ? 'selected'
                        : ''
                }
                onClick={() => {
                    setTense('present');
                }}
            >
                현재
            </button>

        </div>

        <p>
    이야기의 서술 시제를 선택해주세요.
</p>

</div>


{/* ==========================================
    응답 길이

    short  = 짧은
    medium = 중간
    long   = 긴
    auto   = 자동
========================================== */}
<div className="form-group">

    <label>응답 길이</label>

    <div className="style-option-buttons">

        {/* 짧은 */}
        <button
            type="button"
            className={
                responseLength === 'short'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setResponseLength('short');
            }}
        >
            짧은
        </button>

        {/* 중간 */}
        <button
            type="button"
            className={
                responseLength === 'medium'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setResponseLength('medium');
            }}
        >
            중간
        </button>

        {/* 긴 */}
        <button
            type="button"
            className={
                responseLength === 'long'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setResponseLength('long');
            }}
        >
            긴
        </button>

        {/* 자동 */}
        <button
            type="button"
            className={
                responseLength === 'auto'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setResponseLength('auto');
            }}
        >
            자동
        </button>

    </div>

    <p>
        이야기 흐름에 맞는 응답 길이를 선택해주세요.
    </p>

</div>


{/* ==========================================
    표현 방식

    dialogue = 대화 더하기
    balanced = 기본
    action   = 행동 더하기
========================================== */}
<div className="form-group">

    <label>표현 방식</label>

    <div className="style-option-buttons">

        {/* 대화를 더 많이 표현 */}
        <button
            type="button"
            className={
                expressionStyle === 'dialogue'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setExpressionStyle('dialogue');
            }}
        >
            대화 더하기
        </button>

        {/* 대화와 행동을 균형 있게 표현 */}
        <button
            type="button"
            className={
                expressionStyle === 'balanced'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setExpressionStyle('balanced');
            }}
        >
            기본
        </button>

        {/* 행동과 묘사를 더 많이 표현 */}
        <button
            type="button"
            className={
                expressionStyle === 'action'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setExpressionStyle('action');
            }}
        >
            행동 더하기
        </button>

    </div>

    <p>
    대사와 행동의 표현 비중을 선택해주세요.
    </p>

    </div>

    {/* 스토리 연출 영역 끝 */}
    </div>


    {/* ==========================================
        분위기

        - 최대 2개까지 선택 가능
        - 이미 선택한 분위기를 다시 누르면 선택 해제
    ========================================== */}
    <div className="style-section">

        <h4>분위기 <span className="style-sub-text">(최대 2개 선택)</span></h4>

        <div className="mood-buttons">

            {[
                ['romance', '로맨스'],
                ['healing', '힐링'],
                ['drama', '드라마'],
                ['fantasy', '판타지'],
                ['action', '액션'],
                ['mystery', '미스터리'],
                ['horror', '호러'],
            ].map(([value, label]) => (

                <button
                    key={value}
                    type="button"
                    className={
                        moods.includes(value)
                            ? 'selected'
                            : ''
                    }
                    onClick={() => {

                        // 이미 선택된 분위기를 다시 누르면 선택 해제
                        if (moods.includes(value)) {
                            setMoods(
                                moods.filter((mood) => mood !== value)
                            );
                            return;
                        }

                        // 분위기는 최대 2개까지만 선택 가능
                        if (moods.length >= 2) {
                            return;
                        }

                        // 선택한 분위기를 배열에 추가
                        setMoods([
                            ...moods,
                            value
                        ]);
                    }}
                >
                    {label}
                </button>

            ))}

        </div>

    </div>


    {/* ==========================================
        스토리텔링 스타일

        캐릭터의 성격이나 설정 자체를 바꾸는 기능이 아니라
        AI가 이야기를 표현하고 서술하는 방식을 선택함
    ========================================== */}
    <div className="style-section">

        <h4>스토리텔링 스타일</h4>

        <div className="storytelling-style-buttons">

            {[
                ['none', '설정 안 함'],
                ['cinematic', '시네마틱'],
                ['literary', '문학적 서술'],
                ['lightNovel', '라이트노벨'],
                ['webNovel', '웹소설'],
                ['dialogueDrama', '대화극'],
                ['emotional', '감정 중심'],
                ['descriptive', '묘사 중심'],
                ['cozyDaily', '코지 데일리'],
                ['darkNarrative', '다크 서사'],
                ['immersiveFantasy', '몰입형 판타지'],
                ['classicNarrative', '고전 서사'],
            ].map(([value, label]) => (

                <button
                    key={value}
                    type="button"
                    className={
                        storytellingStyle === value
                            ? 'selected'
                            : ''
                    }
                    onClick={() => {
                        setStorytellingStyle(value);
                    }}
                >
                    {label}
                </button>

            ))}

        </div>

        <p className="style-description">
            캐릭터 설정은 유지하면서 이야기의 문체와 연출 방식을 조절해요.
        </p>

    </div>


    {/* 스타일 전체 영역 끝 */}
    </div>
    )}

                {/* ==========================================
                    ⑭ 설정 탭
                ========================================== */}
                {tab === 'settings' && (
                    <div className="settings-form">

                    <h3>공개 설정</h3>

        {/* ==========================================
            공개 여부

            public  = 공개
            private = 비공개
        ========================================== */}
        <div className="form-group">

            <label>공개 여부</label>

            <div className="setting-option-buttons">

                {/* 공개 버튼 */}
                <button
                    type="button"
                    className={
                        visibility === 'public'
                            ? 'selected'
                            : ''
                    }
                    onClick={() => {
                        setVisibility('public');
                    }}
                >
                    공개
                </button>

                {/* 비공개 버튼 */}
                <button
                    type="button"
                    className={
                        visibility === 'private'
                            ? 'selected'
                            : ''
                    }
                    onClick={() => {
                        setVisibility('private');
                    }}
                >
                    비공개
                </button>

            </div>

            <p>
                공개하면 다른 사용자가 캐릭터를 볼 수 있습니다.
            </p>

        </div>

             {/* ==========================================
    이용 등급

    all   = 전체 이용가
    adult = 성인 이용가
========================================== */}
<div className="form-group">

    <label>이용 등급</label>

    <div className="setting-option-buttons">

        {/* 전체 이용가 버튼 */}
        <button
            type="button"
            className={
                contentRating === 'all'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setContentRating('all');
            }}
        >
            전체 이용가
        </button>

        {/* 성인 이용가 버튼 */}
        <button
            type="button"
            className={
                contentRating === 'adult'
                    ? 'selected'
                    : ''
            }
            onClick={() => {
                setContentRating('adult');
            }}
        >
            성인 이용가
        </button>

    </div>

    <p>
        작품의 내용에 맞는 이용 등급을 선택해주세요.
    </p>

</div>       

            {/* ==========================================
    작가의 코멘트
    - 작품을 보는 사용자에게 보여줄 짧은 설명
    - 선택 입력
========================================== */}
<div className="form-group">

    <label>작가의 코멘트</label>

    <textarea
        value={authorComment}
        maxLength={500}
        onChange={(e) => {
            setAuthorComment(e.target.value);
        }}
        placeholder="작품에 대한 코멘트를 입력해주세요."
    />

    {/* 현재 입력한 글자 수 표시 */}
    <p className="character-count">
        {authorComment.length} / 500
    </p>

</div>

    </div>
)}

            </section>
            
            {/* 삭제 완료 토스트 알림 */}
            {toastMessage && (
                <div className="toast-message">
                    ✓ {toastMessage}
                </div>
            )}
        </div>
    );                                        // ② return 끝
}

export default CreateCharacter;               // ⑥ 다른 파일에서 사용할 수 있도록 내보내기

