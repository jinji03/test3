# 운명각 MVP

웹 기반 사주팔자 상담 MVP입니다. 사용자가 5명의 운명가 중 한 명을 선택하고 기본 정보를 입력하면, 해시 기반 더미 로직으로 오행 비율과 상담 문장을 생성합니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 Vite가 안내하는 로컬 주소로 접속하면 됩니다.

## Cloudflare Pages 배포 설정

```txt
Build command: npm run build
Build output directory: dist
Node.js version: 22.16.0
```

루트의 `.node-version`과 `.nvmrc`가 Cloudflare Pages 빌드에서 Node.js 22.16.0을 사용하도록 고정합니다.

Cloudflare Pages의 Root directory는 비워두거나 저장소 루트(`/`)로 설정해야 합니다. Root directory를 `dist`로 지정하면 Cloudflare가 `dist/dist`를 찾게 되어 배포가 실패할 수 있습니다.

## 구조

- `src/pages`: 메인, 입력, 결과 화면
- `src/components`: 캐릭터 카드, 폼, 게이지, 말풍선 등 UI 컴포넌트
- `src/data`: 운명가 캐릭터 데이터
- `src/utils`: 오행 계산 및 결과 문장 생성 로직
- `public/bgm`: 메인 BGM과 캐릭터별 BGM 업로드 공간

## BGM 업로드

BGM 파일은 `public/bgm` 아래에 넣으면 정적 파일로 제공됩니다.

- 메인 BGM: `public/bgm/main/bgm.mp3`
- 청연 BGM: `public/bgm/characters/cheongyeon/bgm.mp3`
- 백우 BGM: `public/bgm/characters/baekwoo/bgm.mp3`
- 지혁 BGM: `public/bgm/characters/jihyeok/bgm.mp3`
- 선율 BGM: `public/bgm/characters/seonyul/bgm.mp3`
- 화신 BGM: `public/bgm/characters/hwashin/bgm.mp3`

자세한 업로드 안내는 `public/bgm/README.md`를 참고하세요.

## MVP 범위

- 실제 사주 계산 엔진은 포함하지 않습니다.
- 같은 이름, 생년월일, 시간, 성별, 상담 목적을 입력하면 같은 오행 결과가 나오도록 결정적 해시 계산을 사용합니다.
- 결과 문구는 단정적 예언이 아니라 성향과 흐름 중심의 표현으로 생성됩니다.
