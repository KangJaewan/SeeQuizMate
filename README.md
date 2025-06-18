# QuizMate

**QuizMate**는 사용자에게 퀴즈를 제공하고, 퀴즈 선택 → 문제 목록 → 문제 풀이의 흐름을 직관적인 UI로 구현한 웹 애플리케이션입니다.

---

## 🚀 기능 소개

- 📁 **폴더 기반 퀴즈 선택**: 퀴즈 폴더를 선택하여 관련 문제를 불러오는 팝업 UI 제공
- ✅ **퀴즈 선택 및 필터링**: 사용자가 원하는 퀴즈 조건 선택
- 🧪 **퀴즈 목록 표시**: 선택한 조건에 따른 퀴즈 리스트 출력
- 📝 **퀴즈 풀이**: 선택한 퀴즈를 즉시 풀이 가능
- 🎭 **마스코트 인터랙션**: 재미 요소로 마스코트와 말풍선 애니메이션 포함

---

## 🛠️ 기술 스택

- **Frontend**: React, TypeScript, TailwindCSS
- **UI 구성**: Flex/Grid 레이아웃, 카드 컴포넌트 기반 디자인
- **애니메이션**: CSS 키프레임을 활용한 마스코트 애니메이션

---

## 📂 프로젝트 구조

```
project/
├── public/
│   └── image-43.png               # 로고
│   └── quizmate----1.png         # 마스코트 이미지
├── src/
│   ├── components/
│   │   ├── Popup/FolderPopup.tsx # 폴더 선택 팝업
│   │   └── ui/card.tsx           # 카드 컴포넌트
│   └── screens/
│       └── QuizMateSite/
│           ├── QuizMateSite.tsx  # 메인 페이지
│           └── sections/
│               ├── QuizSelectionSection.tsx
│               ├── QuizListSection.tsx
│               └── QuizViewSection.tsx
```

---

## 📦 설치 및 실행

```bash
# 프로젝트 클론
git clone https://github.com/your-username/quizmate.git
cd quizmate

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

---

## 📸 미리보기

| 메인 화면 | 폴더 선택 |
|-----------|-----------|
| ![Main](/Users/kangjaewan/code/seeq_quiz/project/public/main.png) | ![Mascot](./public/quizmate----1.png) |

---

## 📌 기타 참고 사항

- 해당 프로젝트는 퀴즈 문항, 선택지, 정답 등의 로직을 외부 API 또는 로컬 JSON으로 연동 가능합니다.
- 절대경로를 사용하는 경우 `vite.config.ts`에 `alias` 설정이 필요합니다.

---

## 🧑‍💻 기여 방법

1. 이슈 확인 또는 생성
2. 포크 → 브랜치 생성 → 수정 → PR 제출

---

## 📃 라이선스

MIT License

---

필요에 따라 `API 연동 방식`, `RAG`, `백엔드 구조` 등을 추가할 수도 있어요. 
