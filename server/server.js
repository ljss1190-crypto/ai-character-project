

const express = require('express');          // ① 설치한 Express를 이 파일에서 사용하기 위해 불러옴

const app = express();                       // ② Express를 실행해서 백엔드 서버를 만듬

app.use(express.json());                     // ③ 프론트에서 보낸 JSON 데이터를 서버가 읽을 수 있게 함

const port = 3000;                           // ④ 서버가 사용할 포트 번호를 3000으로 정함

const characters = [];                       // ⑤ 캐릭터 정보를 임시로 저장할 배열

// ⑥ 캐릭터 생성 요청을 받는 곳
app.post('/characters', (req, res) => {
    const character = req.body;              // ⑦ 프론트에서 보낸 캐릭터 정보를 꺼냄

    characters.push(character);              // ⑧ 받은 캐릭터 정보를 characters 배열에 추가

    console.log(character);                  // ⑨ 받은 정보를 터미널에서 확인

    res.json({ message: '캐릭터 정보를 받았습니다.' });  // ⑩ 프론트에 응답을 보냄
});

// ⑬ 저장된 캐릭터 목록을 요청받는 곳

app.get('/characters', (req, res) => {
    res.json(characters);                    // ⑭ characters 배열을 JSON으로 보내줌
});

app.listen(port, () => {                     // ⑪ 3000번 포트에서 서버를 실행함
    console.log(`서버 실행 중: http://localhost:${port}`); // ⑫ 서버가 켜져있는지 터미널에 표시
});



