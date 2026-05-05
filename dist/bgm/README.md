# BGM 업로드 안내

이 폴더는 사이트에서 사용할 배경음악 파일을 올리는 공간입니다.

## 폴더 구조

```txt
public/bgm/
  main/                  # 메인 화면 공통 BGM
  characters/
    cheongyeon/          # 청연 전용 BGM
    baekwoo/             # 백우 전용 BGM
    jihyeok/             # 지혁 전용 BGM
    seonyul/             # 선율 전용 BGM
    hwashin/             # 화신 전용 BGM
```

## 권장 파일명

- 메인 BGM: `public/bgm/main/bgm.mp3`
- 청연 BGM: `public/bgm/characters/cheongyeon/bgm.mp3`
- 백우 BGM: `public/bgm/characters/baekwoo/bgm.mp3`
- 지혁 BGM: `public/bgm/characters/jihyeok/bgm.mp3`
- 선율 BGM: `public/bgm/characters/seonyul/bgm.mp3`
- 화신 BGM: `public/bgm/characters/hwashin/bgm.mp3`

## 업로드 방법

1. 사용할 음악 파일을 준비합니다. 브라우저 호환성을 위해 `.mp3`를 권장합니다.
2. 파일명을 위 권장 파일명으로 바꿉니다.
3. 알맞은 폴더에 파일을 넣습니다.
4. 로컬에서 확인할 때는 `npm run dev` 실행 후 아래 경로가 열리는지 확인합니다.

```txt
/bgm/main/bgm.mp3
/bgm/characters/cheongyeon/bgm.mp3
/bgm/characters/baekwoo/bgm.mp3
/bgm/characters/jihyeok/bgm.mp3
/bgm/characters/seonyul/bgm.mp3
/bgm/characters/hwashin/bgm.mp3
```

현재는 업로드 공간만 준비되어 있습니다. 실제 자동 재생이나 캐릭터별 전환 기능을 쓰려면 앱 코드에 BGM 재생 로직을 추가해야 합니다.
