const toneCopy = {
  mystic: {
    lead: '천천히 보면',
    advice: '서두르지 말고 작은 신호를 확인해보세요.',
    suffix: '흐름은 조용히 바뀌지만, 행동은 분명해야 합니다.',
  },
  warm: {
    lead: '다정하게 짚어보면',
    advice: '스스로를 몰아붙이지 말고 감정을 말할 자리를 만들어주세요.',
    suffix: '괜찮은 척만 하지 않아도 방향은 더 부드럽게 잡힙니다.',
  },
  logical: {
    lead: '구조적으로 보면',
    advice: '감정과 사실을 분리해서 기록한 뒤 선택 기준을 정하세요.',
    suffix: '반복되는 행동을 보면 다음 선택의 확률이 더 선명해집니다.',
  },
  poetic: {
    lead: '마음의 장면으로 보면',
    advice: '흔들리는 마음을 숨기기보다 부담 없는 말로 확인해봐.',
    suffix: '기다림이 길어질수록 네 마음을 먼저 지켜야 해.',
  },
  direct: {
    lead: '핵심만 보면',
    advice: '기간을 정하고 확인해라. 애매함을 오래 두지 마라.',
    suffix: '움직이지 않으면 같은 문제가 반복된다.',
  },
};

const topicExamples = {
  연애운: '예를 들어 답장이 늦을 때 바로 결론을 내리기보다, 상대의 반복된 태도를 보고 한 번은 직접 확인하는 편입니다.',
  금전운: '예를 들어 돈을 쓸 때도 즉흥적으로 쓰기보다 오래 고민하고, 납득할 이유가 생겼을 때 지갑을 여는 경향이 있습니다.',
  직업운: '예를 들어 업무를 맡으면 감으로 밀어붙이기보다 마감, 역할, 기대치를 먼저 확인해야 마음이 놓입니다.',
  사업운: '예를 들어 좋은 제안이 와도 바로 확장하기보다 비용, 사람, 책임 범위를 따져본 뒤 움직이는 편입니다.',
  '종합 운세': '예를 들어 관계와 일 중 하나가 흔들리면 바로 끊어내기보다 며칠 더 관찰하며 원인을 찾으려는 경향이 있습니다.',
};

function strongest(result) {
  return result?.ranked?.[0]?.key || 'earth';
}

const personalityByElement = {
  wood: '가능성이 보이면 먼저 길을 열어보려는 편이에요.',
  fire: '감정이 분명해지면 표현과 행동이 빨라지는 편이에요.',
  earth: '중요한 결정을 쉽게 바꾸지 않는 편이에요.',
  metal: '마음이 움직여도 기준이 맞는지 먼저 확인하는 편이에요.',
  water: '말보다 분위기와 작은 반응을 먼저 읽는 편이에요.',
};

export function analyzePersonality(result) {
  const key = strongest(result);
  const purpose = result?.form?.purpose || '종합 운세';
  return `${personalityByElement[key]} ${topicExamples[purpose] || topicExamples['종합 운세']}`;
}

export function generateAdvice(result) {
  const tone = toneCopy[result?.character?.tone] || toneCopy.warm;
  const card = result?.finalCard || {};
  return `${tone.advice} ${card.advice || ''}`.trim();
}

export function generateSummary(result) {
  const tone = toneCopy[result?.character?.tone] || toneCopy.warm;
  const card = result?.finalCard || {};
  return `${tone.lead} ${card.name || '당신'}님, 지금은 ${card.traitSummary || '조금 더 지켜보는 쪽'}에 가까워요. ${card.futureFlow || tone.suffix}`;
}

export function buildResultSteps(result) {
  const card = result.finalCard;
  return [
    { key: 'personality', title: '지금 마음', body: generateSummary(result), state: 'mystical' },
    { key: 'behavior', title: '자주 하던 선택', body: card.behavior, state: 'thinking' },
    { key: 'topic', title: '상담에서 보인 것', body: card.choiceReading, state: 'serious' },
    { key: 'caution', title: '주의점', body: `${card.caution} 예를 들어 이미 마음이 지쳤는데도 상대나 상황을 더 이해하려고만 하면 정작 내 기준이 흐려질 수 있습니다.`, state: 'serious' },
    { key: 'future', title: '미래 흐름', body: `${card.futureFlow} 예를 들어 이번 주 안에 작은 확인 대화나 지출 점검처럼 바로 실행 가능한 행동을 하나 정하면 흐름이 선명해집니다.`, state: 'fan-open' },
    { key: 'advice', title: '조언', body: `${generateAdvice(result)} 예를 들어 답을 기다리기만 하지 말고 날짜, 금액, 역할처럼 확인 가능한 기준 하나를 정해 움직여보세요.`, state: 'smile' },
  ];
}

const elementProfiles = {
  wood: {
    label: '목',
    words: ['성장 지향', '계획성', '관계 확장', '시작하는 힘'],
    line: '가능성이 보이면 작은 시작부터 열어보려 해요.',
    example: '예를 들어 관계나 일에서 막힌 부분이 생기면, 한 번에 결론내기보다 연락, 조사, 작은 제안처럼 시작 가능한 행동부터 찾습니다.',
  },
  fire: {
    label: '화',
    words: ['표현력', '열정', '추진력', '감정의 속도'],
    line: '감정이 분명해지면 표현과 실행으로 이어지는 속도가 빠른 편입니다.',
    example: '예를 들어 마음이 움직이면 연락 빈도나 말투가 먼저 달라지고, 일에서도 분위기가 좋을 때 빠르게 밀어붙이는 모습이 나옵니다.',
  },
  earth: {
    label: '토',
    words: ['안정감', '현실성', '신중함', '버티는 힘'],
    line: '쉽게 흔들리지 않고 오래 지켜본 뒤 판단해요.',
    example: '예를 들어 돈을 쓸 때도 즉흥적으로 결제하기보다, 정말 필요한지 며칠씩 생각한 뒤 움직이는 편일 수 있습니다.',
  },
  metal: {
    label: '금',
    words: ['판단력', '결단력', '기준', '정리하는 힘'],
    line: '마음이 움직여도 기준과 책임을 먼저 확인해요.',
    example: '예를 들어 이직이나 관계 정리 앞에서 감정만 보지 않고, 조건과 반복된 행동을 비교한 뒤 결론을 내리려 합니다.',
  },
  water: {
    label: '수',
    words: ['감성', '직관', '유연함', '깊은 생각'],
    line: '말보다 분위기와 작은 반응을 깊게 읽어요.',
    example: '예를 들어 상대의 답장이 짧아지거나 회의 분위기가 바뀌면, 이유를 오래 생각하고 다음 반응을 조심스럽게 고릅니다.',
  },
};

const traitText = {
  emotion_depth: '감정을 깊게 품는 편',
  attachment: '관계를 쉽게 놓지 않는 편',
  self_focus: '내 회복과 기준을 중요하게 보는 편',
  risk_avoidance: '위험을 먼저 줄이려는 편',
  risk_taking: '기회가 보이면 감수할 줄 아는 편',
  planning: '계획과 확인을 중시하는 편',
  impulse: '마음이 움직일 때 속도가 빨라지는 편',
  stability: '안정과 지속성을 우선하는 편',
  growth: '성장 가능성을 크게 보는 편',
  relationship_focus: '사람과의 연결을 중요하게 보는 편',
  money_control: '돈의 흐름을 통제하려는 편',
  career_ambition: '커리어 성취욕이 있는 편',
  business_drive: '사업을 밀고 가는 힘이 있는 편',
  decision_delay: '결정을 오래 붙잡는 편',
  direct_action: '필요하면 직접 움직이는 편',
  fire_expression: '표현으로 흐름을 바꾸려는 편',
  metal_standard: '기준과 원칙을 세우는 편',
};

function sortElementEntries(elements) {
  return Object.entries(elements || {})
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value);
}

export function analyzeElements(elements) {
  const sorted = sortElementEntries(elements);
  const strongElement = sorted[0]?.key || 'earth';
  const weakElement = sorted[sorted.length - 1]?.key || 'fire';
  const strongProfile = elementProfiles[strongElement];
  const weakProfile = elementProfiles[weakElement];
  return {
    strongElement,
    weakElement,
    strongWords: strongProfile.words,
    weakWords: weakProfile.words,
    elementSummary: `${strongProfile.label}의 흐름이 가장 강하고 ${weakProfile.label}의 흐름이 가장 약하게 잡힙니다. 행동으로 보면 ${strongProfile.line}`,
    behaviorBase: strongProfile.example,
  };
}

export function calculateTraitScores(answers = []) {
  const scores = {};
  for (const answer of answers) {
    for (const trait of answer.traits || []) {
      scores[trait] = (scores[trait] || 0) + 1;
    }
  }
  for (const trait of Object.keys(traitText)) {
    scores[trait] = scores[trait] || 0;
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const topTraits = sorted.filter(([, score]) => score > 0).slice(0, 3).map(([trait]) => trait);
  const weakTraits = [...sorted].sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0])).slice(0, 2).map(([trait]) => trait);
  return { topTraits, weakTraits, scores };
}

export function analyzeAnswerPatterns(answers = []) {
  const tagScores = {};
  const values = [];
  for (const answer of answers) {
    values.push(answer.value);
    for (const tag of answer.tags || []) {
      tagScores[tag] = (tagScores[tag] || 0) + 1;
    }
  }
  const mainTags = Object.entries(tagScores)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 4)
    .map(([tag]) => tag);
  return { mainTags, values, tagScores };
}

export function generatePersonalityProfile(elements, answers = []) {
  const elementResult = analyzeElements(elements);
  const traitResult = calculateTraitScores(answers);
  const topTraitWords = traitResult.topTraits.map((trait) => traitText[trait]).filter(Boolean);
  const mainTrait = topTraitWords[0] || '상황을 오래 관찰하는 편';
  const personalityLine = `${mainTrait}이에요. 중요한 선택 앞에서는 바로 움직이기보다 한 번 더 확인하려 해요.`;
  const behaviorExample = buildBehaviorExample(answers, elementResult, traitResult.topTraits);
  const strength = buildStrength(traitResult.topTraits, elementResult.strongElement);
  const caution = buildCaution(traitResult.weakTraits, traitResult.topTraits);
  return {
    ...elementResult,
    ...traitResult,
    personalityLine,
    behaviorExample,
    strength,
    caution,
  };
}

function buildBehaviorExample(answers, elementResult, topTraits) {
  const picked = answers.find((answer) => answer.selectedChoice) || {};
  if (topTraits.includes('money_control')) {
    return `예를 들어 "${picked.selectedChoice || '돈의 기준을 세우는 선택'}"처럼 답한 흐름을 보면, 지출이나 투자 전에 근거를 확인하고 움직이는 편입니다.`;
  }
  if (topTraits.includes('attachment') || topTraits.includes('emotion_depth')) {
    return `예를 들어 "${picked.selectedChoice || '감정을 오래 보는 선택'}"처럼 답한 흐름을 보면, 상대의 작은 반응도 그냥 넘기지 않고 마음속에서 여러 번 되짚는 편입니다.`;
  }
  if (topTraits.includes('career_ambition')) {
    return `예를 들어 "${picked.selectedChoice || '성장 쪽 선택'}"처럼 답한 흐름을 보면, 일이 편한지만 보지 않고 다음 단계에서 얻을 성장과 보상을 함께 따집니다.`;
  }
  if (topTraits.includes('business_drive')) {
    return `예를 들어 "${picked.selectedChoice || '사업을 밀고 가는 선택'}"처럼 답한 흐름을 보면, 기회가 보일 때 실행 가능성과 자금 흐름을 동시에 계산합니다.`;
  }
  return elementResult.behaviorBase;
}

function buildStrength(topTraits, strongElement) {
  if (topTraits.includes('planning') || topTraits.includes('stability')) {
    return '이런 모습은 실수를 줄이고 오래 갈 선택을 만드는 데 도움이 됩니다.';
  }
  if (topTraits.includes('direct_action') || topTraits.includes('risk_taking')) {
    return '기회가 왔을 때 생각만 하지 않고 움직일 수 있는 힘이 있어요.';
  }
  if (topTraits.includes('relationship_focus') || topTraits.includes('emotion_depth')) {
    return '사람 마음을 세심하게 읽는 힘이 있어요.';
  }
  return `${elementProfiles[strongElement].words[0]}이 강해서 복잡한 상황에서도 자기 방식으로 중심을 잡는 힘이 있습니다.`;
}

function buildCaution(weakTraits, topTraits) {
  if (topTraits.includes('decision_delay')) {
    return '다만 너무 오래 재면 이미 충분히 보인 신호 앞에서도 좋은 타이밍을 놓칠 수 있습니다.';
  }
  if (topTraits.includes('impulse') || topTraits.includes('risk_taking')) {
    return '다만 순간의 확신만 믿으면 비용, 감정, 책임 범위를 나중에 수습해야 할 수 있습니다.';
  }
  if (weakTraits.includes('direct_action')) {
    return '다만 확인만 반복하면 상대나 상황이 당신의 의도를 알아차리기 어렵습니다.';
  }
  return '다만 익숙한 방식만 고집하면 새 기회가 와도 변화의 폭을 작게 잡을 수 있습니다.';
}

export function generateTopicInsight(topic, answers = [], profile) {
  const key = normalizeTopicKey(topic);
  const selectedLabels = answers.map((answer) => answer.selectedChoice).filter(Boolean).slice(0, 3).join(', ');
  const base = {
    love: {
      title: '연애 흐름',
      lines: [
        `연애에서는 ${profile.topTraits.includes('attachment') ? '마음을 쉽게 접기보다 오래 지켜보는 편' : '상대의 태도와 내 감정을 함께 확인하는 편'}입니다.`,
        `선택값 중 ${selectedLabels || '현재 답변'}이 보여주듯, 상대를 대할 때 확신과 안정감을 같이 원합니다.`,
        `주의할 패턴은 혼자 추측하는 시간이 길어지는 것입니다.`,
        '지금 필요한 행동은 부담 없는 질문 하나로 상대의 반복된 태도를 확인하는 것입니다.',
      ],
    },
    money: {
      title: '재물 흐름',
      lines: [
        `돈을 볼 때는 ${profile.topTraits.includes('money_control') ? '새는 돈을 막고 싶어 하는 마음' : '안정과 기회 사이에서 흔들리는 마음'}이 보여요.`,
        `선택값 중 ${selectedLabels || '현재 답변'}이 수입, 지출, 투자 판단에 함께 반영됩니다.`,
        '부동산이나 사업자금처럼 큰 금액은 감정보다 상환 가능성과 현금 흐름을 먼저 보는 편이 좋습니다.',
        '재물 흐름 조언은 한 달 지출 기준과 투자 한도를 숫자로 정해두는 것입니다.',
      ],
    },
    job: {
      title: '직업 흐름',
      lines: [
        `일에서는 ${profile.topTraits.includes('career_ambition') ? '성장과 보상을 분명히 확인하려는 패턴' : '안정성과 적합도를 함께 보는 패턴'}이 강합니다.`,
        `선택값 중 ${selectedLabels || '현재 답변'}이 이직, 적성, 연봉, 인간관계 판단에 영향을 줍니다.`,
        '커리어 고민은 감정의 피로와 실제 성장 가능성을 나눠서 봐야 선명해집니다.',
        '직업운 조언은 현재 자리에서 얻을 것과 옮겼을 때 얻을 것을 표로 비교하는 것입니다.',
      ],
    },
    business: {
      title: '사업 흐름',
      lines: [
        `사업에서는 ${profile.topTraits.includes('business_drive') ? '기회를 실행으로 바꾸려는 힘' : '위험을 줄이고 검증하려는 힘'}이 먼저 보입니다.`,
        `선택값 중 ${selectedLabels || '현재 답변'}이 자금, 파트너, 확장 판단에 직접 연결됩니다.`,
        '불안해도 기회는 보고 있어요. 대신 돈과 책임은 먼저 정해야 합니다.',
        '사업운 조언은 큰 확장보다 작게 실험하고 숫자로 다음 결정을 잡는 것입니다.',
      ],
    },
    general: {
      title: '종합 흐름',
      lines: [
        `현재 삶의 핵심 흐름은 ${profile.topTraits.map((trait) => traitText[trait]).filter(Boolean).join(', ') || '균형을 다시 잡는 과정'}입니다.`,
        `선택값 중 ${selectedLabels || '현재 답변'}이 관계, 돈, 일, 컨디션을 함께 건드리고 있습니다.`,
        '올해 방향성은 한 번에 바꾸는 것보다 우선순위를 좁히는 쪽이 맞습니다.',
        '주의할 점은 모든 문제를 동시에 해결하려다 체력과 판단력이 같이 흐려지는 것입니다.',
      ],
    },
  };
  return base[key] || base.general;
}

export function generateWarnings(topic, profile) {
  const key = normalizeTopicKey(topic);
  const warningByTopic = {
    love: '상대의 마음을 혼자 결론내리면 불안이 커질 수 있습니다. 예를 들어 답장이 늦은 하루만 보고 관계 전체를 판단하지 않는 편이 좋습니다.',
    money: '숫자 기준 없이 움직이면 지출과 투자가 섞일 수 있습니다. 예를 들어 생활비 계좌와 투자금을 분리해두는 행동이 필요합니다.',
    job: '감정적으로 지친 상태에서 이직을 결정하면 조건 확인이 흐려질 수 있습니다. 예를 들어 연봉, 역할, 성장 가능성을 따로 적어보세요.',
    business: '확장 욕심과 불안이 동시에 커지면 결정이 흔들릴 수 있습니다. 예를 들어 다음 지출의 회수 기간을 먼저 계산해야 합니다.',
    general: '문제가 여러 개로 느껴질수록 한 번에 해결하려 하지 않는 편이 좋습니다. 예를 들어 이번 주에는 하나의 영역만 정리해보세요.',
  };
  return `${warningByTopic[key] || warningByTopic.general} ${profile.caution}`;
}

export function generateLuckKeywords(topic, profile) {
  const key = normalizeTopicKey(topic);
  const topicKeywords = {
    love: ['확인', '표현', '관계 온도'],
    money: ['현금 흐름', '기준', '절제'],
    job: ['성장', '조건 비교', '역할'],
    business: ['검증', '자금', '파트너'],
    general: ['정리', '균형', '회복'],
  };
  const traitKeywords = profile.topTraits.map((trait) => traitText[trait]?.split(' ')[0]).filter(Boolean);
  return [...new Set([...(topicKeywords[key] || topicKeywords.general), ...traitKeywords])].slice(0, 5);
}

function compactCounselText(text = '', max = 82) {
  const cleaned = String(text)
    .replace(/현재 선택값을 보면,?\s*/g, '')
    .replace(/분석 결과|패턴 분석|성향|유형|오행상|확률적으로/g, '')
    .replace(/당신은\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= max) return cleaned;
  const first = cleaned.split(/(?<=[.!?。요])\s+/)[0];
  if (first && first.length <= max) return first;
  return `${cleaned.slice(0, max - 1).trim()}...`;
}

function labelFromContext(context = {}, key, dictionary, fallback) {
  return dictionary[context[key]] || fallback;
}

function generateContextInsight(topic, context = {}, answers = []) {
  const key = normalizeTopicKey(context.topic || topic);
  const picked = answers.map((answer) => answer.selectedChoice).filter(Boolean).slice(-2).join(', ');
  const base = {
    love: () => {
      const status = labelFromContext(context, 'relationship_status', {
        uncertain: '지금 관계는 확실하게 정리되지 않은 상태에 가까워요.',
        has_interest: '마음에 걸리는 사람이 있어서 작은 신호도 그냥 지나가기 어렵습니다.',
        in_relationship: '이미 이어진 관계 안에서 다음 온도를 확인하려는 흐름입니다.',
        single: '지금은 사람보다 내 마음의 속도를 먼저 보는 시기입니다.',
      }, '관계의 현재 위치를 먼저 확인하려는 흐름입니다.');
      const signal = labelFromContext(context, 'partner_signal', {
        mixed: '상대 반응이 일정하지 않아 작은 말투 하나에도 마음이 흔들릴 수 있습니다.',
        passive: '상대가 먼저 확실히 다가오지 않아 기다림이 길어지기 쉽습니다.',
        steady_action: '상대는 말보다 반복되는 행동으로 마음을 보여주는 쪽에 가깝습니다.',
        distant: '요즘 거리가 느껴져 혼자 이유를 되짚는 시간이 늘 수 있습니다.',
      }, '상대의 반복되는 태도를 기준으로 봐야 합니다.');
      const action = labelFromContext(context, 'user_action_style', {
        waiting: '먼저 밀어붙이기보다 상대가 확실한 신호를 주길 기다리는 편이네요.',
        ask_directly: '답답함이 커지면 돌려 말하기보다 직접 확인하려는 편입니다.',
        think_alone: '겉으로 티를 내기보다 혼자 문장과 장면을 오래 되감는 편입니다.',
        create_distance: '상처받을 것 같으면 마음이 커지기 전에 거리를 두려는 편입니다.',
      }, '당신의 행동 방식은 관계의 속도를 결정하는 핵심입니다.');
      return {
        personalityLine: `${status} ${signal}`,
        behaviorExample: `${action} 예를 들어 연락이 애매하게 이어질 때도 바로 결론내기보다 다음 반응을 한 번 더 보는 모습으로 나타납니다.`,
        topicAdvice: '지금 필요한 건 추측을 줄이는 작은 확인입니다. 부담 없는 말로 상대의 반복된 태도를 확인해보세요.',
        warning: '애매함을 오래 두면 마음만 먼저 지칩니다. 기다리더라도 스스로 정한 기한은 필요합니다.',
        futureFlow: '가까운 흐름에서는 짧은 대화 하나가 관계의 온도를 분명하게 만들 수 있습니다.',
        luckKeywords: ['확인', '관계 온도', '기다림'],
      };
    },
    money: () => ({
      personalityLine: labelFromContext(context, 'money_focus', {
        income_shortage: '지금 돈 고민은 수입이 현실을 충분히 받쳐주지 못한다는 감각에서 시작됩니다.',
        spending_leak: '돈이 새는 느낌이 있어 지출의 이유를 다시 확인해야 하는 흐름입니다.',
        saving_difficulty: '저축이 쌓이지 않는 답답함이 현재 재물 고민의 중심입니다.',
        investment_property: '투자나 큰 자산 결정을 앞두고 기회와 손실을 함께 보고 있습니다.',
      }, '현재 돈의 흐름을 다시 정리하려는 시기입니다.'),
      behaviorExample: `${labelFromContext(context, 'spending_style', {
        stress_spend: '스트레스를 받으면 충동적으로 결제하고 뒤늦게 마음이 무거워질 수 있습니다.',
        delayed_spend: '큰돈을 쓰기 전 며칠씩 고민하며 납득할 이유를 찾는 편입니다.',
        time_value_spend: '필요하다고 판단하면 돈보다 시간을 아끼는 선택을 하기도 합니다.',
        support_spend: '내 몫보다 주변을 위해 쓰는 돈이 커질 때가 있습니다.',
      }, '돈을 쓸 때 감정과 필요를 함께 따지는 편입니다.')} 최근 선택값 ${picked || '전체 답변'}이 이 패턴을 보여줍니다.`,
      topicAdvice: '한 달 지출 기준과 투자 한도를 숫자로 정해두세요. 감정 소비와 기회 비용을 분리해야 합니다.',
      warning: '기준 없이 절약만 하거나 기회만 좇으면 돈의 압박이 반복됩니다.',
      futureFlow: '가까운 흐름에서는 고정비, 저축, 선택 지출을 나누는 순간 부담이 줄어듭니다.',
      luckKeywords: ['현금 흐름', '지출 기준', '정리'],
    }),
    job: () => ({
      personalityLine: labelFromContext(context, 'job_status', {
        employed_unsure: '현재 자리에 있으면서도 마음은 다음 가능성을 계속 비교하고 있습니다.',
        considering_change: '이직이나 전환을 감정이 아니라 실제 선택지로 올려둔 상태입니다.',
        between_jobs: '잠시 멈춘 듯 보여도 다음 일을 고르기 위해 기준을 다시 세우는 중입니다.',
        stable_but_stuck: '안정은 있지만 성장감이 부족해 방향 점검이 필요한 흐름입니다.',
      }, '커리어의 현재 위치를 다시 확인하는 흐름입니다.'),
      behaviorExample: `${labelFromContext(context, 'decision_style', {
        compare_conditions: '커리어 결정을 할 때 조건과 연봉을 비교해야 마음이 놓입니다.',
        sustainability_first: '오래 버틸 수 있는지부터 따져보는 편입니다.',
        take_opportunity: '기회가 왔다고 느끼면 흐름을 놓치지 않으려 합니다.',
        deliberate_after_advice: '조언을 들어도 마지막 결정은 오래 붙잡는 편입니다.',
      }, '일의 선택 앞에서 기준을 먼저 찾는 편입니다.')} 예를 들어 제안이 와도 역할, 보상, 지속 가능성을 따로 보려 합니다.`,
      topicAdvice: '지금은 감정 피로와 실제 조건을 분리해야 합니다. 현재 자리에서 얻는 것과 옮겼을 때 얻는 것을 적어보세요.',
      warning: '지친 마음만으로 결정하면 조건 확인이 흐려질 수 있습니다.',
      futureFlow: '가까운 흐름에서는 역할과 보상을 분리해 비교할 때 다음 선택이 선명해집니다.',
      luckKeywords: ['조건 비교', '역할', '성장'],
    }),
    business: () => ({
      personalityLine: labelFromContext(context, 'business_stage', {
        idea_validation: '지금 사업은 아이템을 검증하며 실패 비용을 줄여야 하는 단계입니다.',
        early_market: '작게 시작한 뒤 고객 반응으로 방향을 조정하는 흐름입니다.',
        revenue_scaling: '매출은 보이지만 확장 타이밍과 자금 판단이 핵심입니다.',
        pre_start: '아직 시작 전이라 실행보다 기준 정리가 먼저 필요한 상태입니다.',
      }, '사업의 현재 단계를 다시 점검하는 흐름입니다.'),
      behaviorExample: `${labelFromContext(context, 'risk_attitude', {
        test_before_spend: '큰돈을 쓰기 전 작게 실험해야 움직일 수 있습니다.',
        bounded_risk: '손실 범위를 정해두면 실행 속도가 올라갑니다.',
        slow_under_uncertainty: '불확실성이 크면 결정이 늦어지는 편입니다.',
        accept_big_upside: '기회가 충분히 크다고 느끼면 부담도 감수할 수 있습니다.',
      }, '리스크 앞에서는 실행과 확인 사이를 오갑니다.')} 예를 들어 확장 전에 비용, 고객 반응, 책임자를 먼저 확인하려 합니다.`,
      topicAdvice: '큰 확장보다 작은 검증을 먼저 두세요. 다음 지출의 회수 기준을 숫자로 정해야 합니다.',
      warning: '불안과 욕심이 동시에 커지면 우선순위가 흐려집니다.',
      futureFlow: '가까운 흐름에서는 작게 테스트하고 숫자로 다음 결정을 잡을 때 안정됩니다.',
      luckKeywords: ['검증', '자금', '우선순위'],
    }),
    general: () => ({
      personalityLine: labelFromContext(context, 'life_focus', {
        relationships: '요즘 삶의 중심에는 관계와 마음의 거리감이 크게 들어와 있습니다.',
        money_work: '돈과 일의 현실 문제가 현재 흐름을 가장 강하게 흔들고 있습니다.',
        self_recovery: '지금은 성과보다 컨디션과 마음 회복이 먼저 필요한 시기입니다.',
        direction: '올해 방향을 다시 정하려는 마음이 가장 크게 보입니다.',
      }, '삶의 우선순위를 다시 좁혀야 하는 흐름입니다.'),
      behaviorExample: `${labelFromContext(context, 'current_state', {
        busy_unclear: '바쁘게 움직이지만 마음속 정리는 아직 따라오지 못한 상태입니다.',
        stuck: '멈춰 있는 느낌 때문에 작은 선택도 크게 느껴질 수 있습니다.',
        organizing: '조금씩 정리하며 균형을 되찾는 중입니다.',
        chance_pressure: '기회와 부담이 함께 늘어 판단 에너지가 많이 쓰입니다.',
      }, '현재 리듬은 선택 피로와 연결되어 있습니다.')} 예를 들어 모든 문제를 한 번에 풀려 하기보다 하나씩 순서를 잡아야 편해집니다.`,
      topicAdvice: '이번 주에는 하나의 영역만 정리하세요. 관계, 돈, 일, 컨디션 중 가장 급한 것 하나면 충분합니다.',
      warning: '모든 문제를 동시에 해결하려 하면 체력과 판단력이 같이 흐려질 수 있습니다.',
      futureFlow: '가까운 흐름에서는 우선순위를 하나로 좁힐수록 마음이 회복됩니다.',
      luckKeywords: ['우선순위', '회복', '균형'],
    }),
  };
  return (base[key] || base.general)();
}

export function generateFinalSummary(consultationData) {
  const profile = generatePersonalityProfile(consultationData.elements, consultationData.answers);
  const topicInsight = generateTopicInsight(consultationData.topic, consultationData.answers, profile);
  const contextInsight = generateContextInsight(consultationData.topic, consultationData.resultContext, consultationData.answers);
  const warning = contextInsight.warning || generateWarnings(consultationData.topic, profile);
  const luckKeywords = [...new Set([...(contextInsight.luckKeywords || []), ...generateLuckKeywords(consultationData.topic, profile)])].slice(0, 5);
  const topicAdvice = contextInsight.topicAdvice || topicInsight.lines[topicInsight.lines.length - 1];
  const userName = consultationData.userInfo?.name || '당신';
  const characterName = consultationData.characterName || consultationData.characterId || '상담가';
  const personalityLine = compactCounselText(contextInsight.personalityLine || profile.personalityLine);
  const behaviorExample = compactCounselText(contextInsight.behaviorExample || profile.behaviorExample);
  const futureFlow = compactCounselText(contextInsight.futureFlow || buildFutureFlow(consultationData.topic, profile));
  const compactAdvice = compactCounselText(topicAdvice);
  const compactWarning = compactCounselText(warning);
  const shareText = `운명상담소에서 상담받았어요.\n\n상담가: ${characterName}\n상담 주제: ${topicInsight.title}\n마지막 말: ${personalityLine}\n오늘의 조언: ${compactAdvice}\n\n결과 확인하기: [공유 링크]`;
  return {
    userName,
    characterId: consultationData.characterId,
    characterName,
    topic: consultationData.topic,
    elementSummary: profile.elementSummary,
    personalityLine,
    behaviorExample,
    topicAdvice: compactAdvice,
    warning: compactWarning,
    futureFlow,
    luckKeywords,
    shareText,
    profile: { ...profile, personalityLine, behaviorExample },
    topicInsight,
    resultContext: consultationData.resultContext || {},
  };
}

function buildFutureFlow(topic, profile) {
  const key = normalizeTopicKey(topic);
  const opening = {
    love: '가까운 흐름에서는 작은 표현과 확인 대화가 관계의 온도를 선명하게 만듭니다.',
    money: '가까운 흐름에서는 지출 기준을 세우는 순간 돈의 압박이 줄어듭니다.',
    job: '가까운 흐름에서는 역할과 조건을 분리해서 볼 때 다음 선택이 명확해집니다.',
    business: '가까운 흐름에서는 큰 확장보다 작은 검증이 더 좋은 판단 재료가 됩니다.',
    general: '가까운 흐름에서는 우선순위를 하나로 좁힐수록 컨디션이 회복됩니다.',
  };
  return `${opening[key] || opening.general} 예를 들어 이번 주 안에 ${profile.topTraits.includes('direct_action') ? '바로 실행할 일 하나를 정하면' : '확인할 기준 하나를 적어두면'} 다음 선택이 가벼워집니다.`;
}

function normalizeTopicKey(topic) {
  const map = { career: 'job', total: 'general', 연애: 'love', 연애운: 'love', 재물: 'money', 금전운: 'money', 직업: 'job', 직업운: 'job', 사업: 'business', 사업운: 'business', '종합 운세': 'general' };
  return map[topic] || topic || 'general';
}
