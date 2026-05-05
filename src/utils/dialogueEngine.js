const toneRules = {
  cheongyeon: {
    wrap: (text) => `조용히 보면, ${text}`,
    intro: (name) => `${name}님, 지금 선택의 결을 천천히 살펴보겠습니다.`,
    thinking: '잠시만요. 답변 사이에 남은 흐름을 보고 있어요.',
  },
  baekwoo: {
    wrap: (text) => `괜찮아요. ${text}`,
    intro: (name) => `${name}님, 천천히 같이 볼게요. 지금까지 답한 것만으로도 충분히 흐름이 보여요.`,
    thinking: '잠시 쉬어가도 괜찮아요. 선택한 답변들을 따뜻하게 묶어볼게요.',
  },
  jihyeok: {
    wrap: (text) => `현재 선택값을 보면, ${text}`,
    intro: (name) => `${name}님의 답변을 기준으로 패턴을 분석하겠습니다.`,
    thinking: '답변 데이터를 확인 중입니다. 감정과 행동 패턴을 분리해서 보겠습니다.',
  },
  seonyul: {
    wrap: (text) => `그 마음을 따라가 보면, ${text}`,
    intro: (name) => `${name}, 네가 고른 답들 안에 아직 남아 있는 장면이 있어.`,
    thinking: '잠시만. 네 마음이 어디서 오래 머물렀는지 보고 있어.',
  },
  hwashin: {
    wrap: (text) => `지금은 분명히 말할게요. ${text}`,
    intro: (name) => `${name}, 답은 이미 꽤 나왔다. 이제 미루지 말고 정리하자.`,
    thinking: '선택값 확인한다. 복잡하게 돌리지 않고 핵심만 볼 거다.',
  },
};

export function applyCharacterTone(characterId, messageType, content) {
  const tone = toneRules[characterId] || toneRules.baekwoo;
  if (messageType === 'raw') return content;
  return tone.wrap(content);
}

export function generateCharacterIntro(characterId, userInfo = {}) {
  const tone = toneRules[characterId] || toneRules.baekwoo;
  return [
    { speaker: 'character', state: 'thinking', text: tone.thinking },
    { speaker: 'character', state: 'smile', text: tone.intro(userInfo.name || '당신') },
  ];
}

export function generateAnalysisDialogue(characterId, profile) {
  return [
    {
      speaker: 'character',
      state: 'mystical',
      text: applyCharacterTone(characterId, 'analysis', profile.personalityLine),
    },
    {
      speaker: 'character',
      state: 'smile',
      text: profile.behaviorExample,
    },
    {
      speaker: 'character',
      state: 'thinking',
      text: `${profile.strength} 예를 들어 중요한 선택을 앞두고도 기준을 세우면 감정에만 끌려가지 않습니다.`,
    },
  ];
}

export function generateTopicDialogue(characterId, topicInsight) {
  return topicInsight.lines.map((line, index) => ({
    speaker: 'character',
    state: ['serious', 'mystical', 'thinking', 'smile'][index % 4],
    text: index === 0 ? applyCharacterTone(characterId, 'topic', line) : line,
  }));
}

export function generateFinalDialogue(characterId, summary) {
  return [
    {
      speaker: 'character',
      state: 'serious',
      text: summary.warning,
    },
    {
      speaker: 'character',
      state: 'mystical',
      text: summary.futureFlow,
    },
    {
      speaker: 'character',
      state: 'smile',
      text: applyCharacterTone(characterId, 'final', `${summary.topicAdvice} 키워드는 ${summary.luckKeywords.slice(0, 3).join(', ')}입니다.`),
    },
  ];
}

export function generateResultDialogues(characterId, summary) {
  return [
    ...generateCharacterIntro(characterId, { name: summary.userName }),
    ...generateAnalysisDialogue(characterId, summary.profile),
    ...generateTopicDialogue(characterId, summary.topicInsight),
    ...generateFinalDialogue(characterId, summary),
  ].map((bubble, index) => ({
    id: `engine-dialogue-${index}`,
    ...bubble,
  }));
}
