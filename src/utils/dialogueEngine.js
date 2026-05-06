const characterVoices = {
  cheongyeon: {
    pause: ['음...', '잠시만요.', '조용히 보면요.'],
    intro: (name) => `${name}님, 마음이 남긴 결부터 볼게요.`,
    empathy: ['쉽게 넘기긴 어려웠겠네요.', '마음이 아직 조금 남아 있어요.', '오래 붙잡고 있던 느낌이에요.'],
    read: ['흐름이 조금 흔들리고 있어요.', '지금은 답보다 온도를 봐야 해요.', '작은 신호가 더 크게 느껴졌겠어요.'],
    advice: ['서두르지 말고 한 번만 더 지켜봐요.', '말보다 반복되는 장면을 보세요.', '마음이 조용해지는 쪽을 고르세요.'],
  },
  baekwoo: {
    pause: ['괜찮아요.', '천천히 볼게요.', '잠깐 숨 돌려요.'],
    intro: (name) => `${name}님, 여기서는 솔직해도 괜찮아요.`,
    empathy: ['그 상황이면 지칠 만했어요.', '혼자 버티느라 힘들었겠어요.', '그 마음, 이상한 거 아니에요.'],
    read: ['확신보다 불안이 앞섰던 것 같아요.', '마음이 쉬고 싶어 하는 신호도 보여요.', '조금 더 다정한 기준이 필요해요.'],
    advice: ['오늘은 나를 몰아붙이지 마세요.', '작게 물어보고, 작게 쉬어가요.', '확인하되 내 마음도 같이 챙겨요.'],
  },
  jihyeok: {
    pause: ['잠깐만요.', '정리해볼게요.', '핵심만 보면요.'],
    intro: (name) => `${name}님, 감정과 사실을 나눠볼게요.`,
    empathy: ['지금은 불안이 더 커 보입니다.', '같은 고민이 반복됐겠네요.', '결정이 늦어진 이유가 있어요.'],
    read: ['말보다 반복된 행동을 봐야 합니다.', '지금은 기준 하나가 필요합니다.', '모호한 상태가 피로를 키우고 있어요.'],
    advice: ['기한을 정하고 확인하세요.', '한 번 묻고 반응을 보세요.', '조건 하나만 먼저 정리하세요.'],
  },
  seonyul: {
    pause: ['아...', '그 마음...', '잠시만.'],
    intro: (name) => `${name}, 네 마음이 머문 장면부터 볼게.`,
    empathy: ['쉽게 접히진 않았겠네요.', '기다리는 시간이 길었겠다.', '말 못 한 마음이 남아 있어.'],
    read: ['작은 연락도 크게 느껴졌을 거야.', '아직 끝난 장면은 아닌 것 같아.', '마음이 먼저 반응하고 있어.'],
    advice: ['혼자만 상상하지는 마.', '짧게라도 확인해봐.', '네 하루를 잃지 않는 쪽이 좋아.'],
  },
  hwashin: {
    pause: ['하.', '잠깐.', '바로 말할게요.'],
    intro: (name) => `${name}, 지금은 빙빙 돌릴 때가 아니에요.`,
    empathy: ['오래 끌어서 더 힘들어진 겁니다.', '이미 많이 참았네요.', '애매함이 사람 지치게 하죠.'],
    read: ['마음은 어느 정도 정해져 있어요.', '미루는 게 더 손해로 보여요.', '기준 없이 기다리면 반복됩니다.'],
    advice: ['기간을 정하고 물어보세요.', '답이 흐리면 방향을 바꾸세요.', '이번엔 행동으로 확인하세요.'],
  },
};

function pick(list = [], index = 0) {
  return list[index % list.length] || '';
}

function clean(text = '') {
  return String(text)
    .replace(/현재 선택값을 보면,?\s*/g, '')
    .replace(/분석 결과|패턴 분석|성향|유형|오행상|확률적으로/g, '')
    .replace(/당신은\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function shorten(text = '', max = 68) {
  const normalized = clean(text);
  if (normalized.length <= max) return normalized;
  const sentence = normalized.split(/(?<=[.!?。요])\s+/)[0];
  if (sentence && sentence.length <= max) return sentence;
  return `${normalized.slice(0, max - 1).trim()}...`;
}

function bubble(state, text) {
  return { speaker: 'character', state, text: shorten(text) };
}

export function applyCharacterTone(characterId, messageType, content) {
  const voice = characterVoices[characterId] || characterVoices.baekwoo;
  if (messageType === 'pause') return pick(voice.pause);
  if (messageType === 'advice') return pick(voice.advice);
  return shorten(content);
}

export function generateCharacterIntro(characterId, userInfo = {}) {
  const voice = characterVoices[characterId] || characterVoices.baekwoo;
  return [
    bubble('thinking', pick(voice.pause, 0)),
    bubble('smile', voice.intro(userInfo.name || '당신')),
  ];
}

export function generateAnalysisDialogue(characterId, profile = {}) {
  const voice = characterVoices[characterId] || characterVoices.baekwoo;
  return [
    bubble('thinking', pick(voice.empathy, 0)),
    bubble('serious', profile.behaviorExample || pick(voice.read, 0)),
    bubble('smile', pick(voice.advice, 0)),
  ];
}

export function generateTopicDialogue(characterId, topicInsight = {}) {
  const voice = characterVoices[characterId] || characterVoices.baekwoo;
  const lines = topicInsight.lines || [];
  return [
    bubble('serious', lines[0] || pick(voice.read, 1)),
    bubble('thinking', lines[2] || pick(voice.empathy, 1)),
  ];
}

export function generateFinalDialogue(characterId, summary = {}) {
  const voice = characterVoices[characterId] || characterVoices.baekwoo;
  return [
    bubble('thinking', pick(voice.pause, 1)),
    bubble('serious', summary.warning || pick(voice.read, 2)),
    bubble('mystical', summary.futureFlow || pick(voice.advice, 1)),
    bubble('smile', summary.topicAdvice || pick(voice.advice, 2)),
  ];
}

export function generateResultDialogues(characterId, summary) {
  return [
    ...generateCharacterIntro(characterId, { name: summary.userName }),
    ...generateAnalysisDialogue(characterId, summary.profile),
    ...generateTopicDialogue(characterId, summary.topicInsight),
    ...generateFinalDialogue(characterId, summary),
  ].map((item, index) => ({
    id: `engine-dialogue-${index}`,
    ...item,
  }));
}
