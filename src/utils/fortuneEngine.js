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
  wood: '당신은 가능성이 보이면 먼저 길을 열어보려는 편입니다.',
  fire: '당신은 감정이 분명해지면 표현과 행동이 빨라지는 편입니다.',
  earth: '당신은 중요한 결정을 쉽게 바꾸지 않는 편입니다.',
  metal: '당신은 마음이 움직여도 기준이 맞는지 먼저 확인하는 편입니다.',
  water: '당신은 말보다 분위기와 작은 반응을 먼저 읽는 편입니다.',
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
  return `${tone.lead} ${card.name || '당신'}님은 ${card.traitSummary || '상황을 오래 관찰하는 사람'}입니다. ${card.behavior || analyzePersonality(result)} ${tone.suffix}`;
}

export function buildResultSteps(result) {
  const card = result.finalCard;
  return [
    { key: 'personality', title: '핵심 성향', body: generateSummary(result), state: 'mystical' },
    { key: 'behavior', title: '행동 패턴', body: `${card.behavior} 실제로는 중요한 메시지를 보내기 전 여러 번 문장을 고치거나, 돈과 일의 선택에서도 확신이 생길 때까지 자료를 더 찾는 모습으로 나타납니다.`, state: 'thinking' },
    { key: 'topic', title: '주제 해석', body: `${card.choiceReading} 예를 들어 상담 중 고른 답변처럼 애매한 상황에서는 감정보다 반복되는 행동을 기준으로 판단하는 편이 좋습니다.`, state: 'serious' },
    { key: 'caution', title: '주의점', body: `${card.caution} 예를 들어 이미 마음이 지쳤는데도 상대나 상황을 더 이해하려고만 하면 정작 내 기준이 흐려질 수 있습니다.`, state: 'serious' },
    { key: 'future', title: '미래 흐름', body: `${card.futureFlow} 예를 들어 이번 주 안에 작은 확인 대화나 지출 점검처럼 바로 실행 가능한 행동을 하나 정하면 흐름이 선명해집니다.`, state: 'fan-open' },
    { key: 'advice', title: '조언', body: `${generateAdvice(result)} 예를 들어 답을 기다리기만 하지 말고 날짜, 금액, 역할처럼 확인 가능한 기준 하나를 정해 움직여보세요.`, state: 'smile' },
  ];
}

const elementProfiles = {
  wood: {
    label: '목',
    words: ['성장 지향', '계획성', '관계 확장', '시작하는 힘'],
    line: '가능성이 보이면 작은 시작점을 만들어 흐름을 열어보는 성향이 강합니다.',
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
    line: '쉽게 흔들리지 않고 중요한 결정을 오래 지켜본 뒤 판단하는 성향이 강합니다.',
    example: '예를 들어 돈을 쓸 때도 즉흥적으로 결제하기보다, 정말 필요한지 며칠씩 생각한 뒤 움직이는 편일 수 있습니다.',
  },
  metal: {
    label: '금',
    words: ['판단력', '결단력', '기준', '정리하는 힘'],
    line: '마음이 움직여도 기준과 책임 범위를 먼저 확인하는 성향이 강합니다.',
    example: '예를 들어 이직이나 관계 정리 앞에서 감정만 보지 않고, 조건과 반복된 행동을 비교한 뒤 결론을 내리려 합니다.',
  },
  water: {
    label: '수',
    words: ['감성', '직관', '유연함', '깊은 생각'],
    line: '겉으로 드러난 말보다 분위기와 작은 반응을 깊게 읽는 성향이 강합니다.',
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
  const personalityLine = `당신은 ${mainTrait}이고, 중요한 선택 앞에서는 ${elementProfiles[elementResult.strongElement].line}`;
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
    return '이런 성향은 실수를 줄이고 오래 유지할 수 있는 선택을 만드는 데 강점이 됩니다.';
  }
  if (topTraits.includes('direct_action') || topTraits.includes('risk_taking')) {
    return '이런 성향은 기회가 왔을 때 흐름을 놓치지 않고 실제 행동으로 바꾸는 데 강점이 됩니다.';
  }
  if (topTraits.includes('relationship_focus') || topTraits.includes('emotion_depth')) {
    return '이런 성향은 사람의 마음을 세심하게 읽고 관계를 깊게 이해하는 데 강점이 됩니다.';
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
        `돈을 다룰 때는 ${profile.topTraits.includes('money_control') ? '흐름을 통제하고 기준을 세우려는 성향' : '안정과 기회 사이를 비교하는 성향'}이 보입니다.`,
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
        '리스크 성향은 나쁘지 않지만, 결정 전 비용과 책임자를 분명히 해야 합니다.',
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

export function generateFinalSummary(consultationData) {
  const profile = generatePersonalityProfile(consultationData.elements, consultationData.answers);
  const topicInsight = generateTopicInsight(consultationData.topic, consultationData.answers, profile);
  const warning = generateWarnings(consultationData.topic, profile);
  const luckKeywords = generateLuckKeywords(consultationData.topic, profile);
  const topicAdvice = topicInsight.lines[topicInsight.lines.length - 1];
  const userName = consultationData.userInfo?.name || '당신';
  const characterName = consultationData.characterName || consultationData.characterId || '상담가';
  const shareText = `운명상담소에서 내 사주 상담을 받아봤어요.\n\n상담가: ${characterName}\n상담 주제: ${topicInsight.title}\n핵심 성향: ${profile.personalityLine}\n오늘의 조언: ${topicAdvice}\n\n결과 확인하기: [공유 링크]`;
  return {
    userName,
    characterId: consultationData.characterId,
    characterName,
    topic: consultationData.topic,
    elementSummary: profile.elementSummary,
    personalityLine: profile.personalityLine,
    behaviorExample: profile.behaviorExample,
    topicAdvice,
    warning,
    futureFlow: buildFutureFlow(consultationData.topic, profile),
    luckKeywords,
    shareText,
    profile,
    topicInsight,
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
