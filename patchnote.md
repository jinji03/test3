## [2026-05-06]

### 개선사항
- questionVariants prefix 표시 제거
- 질문 문장을 짧은 실제 대화체로 자연화
- 선택지를 속마음 독백형 문장으로 전면 수정
- resultContext 기반 누적 감정 bridge dialogue 추가
- 선택 후 thinking → bridge → 다음 질문 흐름 적용
- validateQuestion 검수 기준 강화 및 fallback 질문 처리 추가
- 결과 말풍선을 상담 마무리 구조로 보강
- 서비스 방향을 감정 몰입형 캐릭터 상담 UX로 고정
- AGENTS.md에 운명상담소 대화/UX 상시 지침 추가
- dialogueEngine.js를 리포트형 결과 출력에서 짧은 상담 말풍선 흐름으로 개편
- 말풍선 타이핑 속도 랜덤화와 문장부호 pause 적용
- 질문 반응과 결과 진입 문구를 짧은 공감형 대화로 수정
- 결과 화면의 일부 리포트형 라벨을 상담 정리형 표현으로 변경
- 카카오톡 공유 결과 링크를 Cloudflare Pages clean URL인 /share 기준으로 수정
- 캐릭터/상담실 PNG 이미지 50개 리사이즈 및 압축
- 카카오톡 공유 링크를 배포 도메인 기준으로 고정
- 공유 결과 URL을 해시 방식에서 쿼리 파라미터 방식으로 변경
- 모바일 메인 배너에서 캐릭터 이미지가 보이도록 hero 이미지 영역 반응형 구조 수정
- 카카오 JavaScript SDK 자동 로드 및 앱 키 초기화 추가
- 카카오톡 feed 템플릿 공유 버튼 구현
- 상담 주제별 질문을 6단계 flow 구조로 재구성
- questionDB 600개를 5개 주제 x 6단계 x 20변형 방식으로 유지
- 질문 선택 엔진을 stage 순서, askedQuestionIds, recentTags, recentChoicePatterns 기반으로 수정
- 선택지 context를 resultContext에 누적해 결과 생성에 반영
- resultContext 기반 말풍선형 결과 문장 생성 강화
- 질문 품질 검수용 validateQuestion 함수 추가

### 수정 파일
- AGENTS.md
- src/utils/dialogueEngine.js
- src/components/ChatBubble.jsx
- src/data/questionDB600.js
- src/pages/ResultPage.jsx
- src/pages/ConsultationPage.jsx
- src/data/dialogue.js
- src/data/characters.js
- src/data/data.js
- src/utils/fortune.js
- src/utils/fortuneEngine.js
- src/utils/share.js
- src/pages/HomePage.jsx
- src/styles.css
- scripts/optimize-png-assets.mjs
- public/characters/*
- public/backgrounds/*
- patchnote.md

### 문제 해결
- 설문지 같은 질문 prefix 반복 문제 개선
- 선택지의 설명체/문진표 느낌 감소
- 질문-선택지 정합성 검수 강화
- 이전 답변을 기억하지 못하고 바로 다음 질문으로 넘어가던 문제 개선
- 결과가 분석문처럼 보이던 문제 완화
- 대화가 길고 설명처럼 느껴지던 문제 완화
- 캐릭터가 결과 출력기처럼 보이던 문제 개선
- GPT식 분석 말투와 금지 표현 노출 감소
- 결과가 긴 리포트처럼 느껴지는 문제 완화
- 질문 흐름이 랜덤처럼 느껴지는 문제 감소
- 질문과 선택지의 의미 범위 불일치 개선
- 같은 stage, 같은 tags, 같은 선택지 구조 반복 방지
- 추상적인 선택지를 실제 상황/행동/감정 문장으로 변경
- 결과가 사용자의 실제 선택값과 더 직접적으로 연결되도록 개선
- 카카오톡 공유 버튼이 placeholder에 머물던 문제 해결
- 로컬 origin 또는 해시 링크 때문에 카카오톡 공유 링크가 열리지 않던 문제 개선
- /share.html 리다이렉트에서 쿼리 파라미터가 사라져 공유 결과가 열리지 않던 문제 개선
- 초기 페이지 로딩을 무겁게 만들던 대용량 PNG 자산 용량 감소
- 모바일 메인 배너 이미지가 숨겨지거나 잘려 보이지 않던 문제 해결

### 다음 개선 후보
- 실제 사용자 테스트로 말풍선 길이와 클릭 템포 조정
- 결과 상세 화면을 카드형 상담 기록 중심으로 재구성
- 캐릭터별 효과음과 표정 전환 타이밍 세분화
