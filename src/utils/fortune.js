import { characters } from '../data/characters.js';
import { generateFinalSummary } from './fortuneEngine.js';

const elementLabels = {
  wood: '목(木)',
  fire: '화(火)',
  earth: '토(土)',
  metal: '금(金)',
  water: '수(水)',
};

const elementMeaning = {
  wood: '성장, 시작, 관계 확장',
  fire: '표현, 열정, 주목받는 힘',
  earth: '안정, 신뢰, 현실 감각',
  metal: '판단, 정리, 원칙과 성과',
  water: '감정, 직관, 적응력과 지혜',
};

const behaviorLanguage = {
  wood: {
    trait: '관계가 시작되면 먼저 가능성을 찾는 편입니다',
    example: '예를 들어 마음에 드는 사람이 생기면 대화 주제를 만들거나 작은 약속을 제안하면서 흐름을 열어보려는 경향이 있습니다.',
    strength: '새로운 흐름을 만드는 힘이 있어 정체된 관계나 상황에 먼저 숨을 불어넣을 수 있습니다.',
    advice: '관계를 키우고 싶을수록 상대의 속도도 함께 확인하면 좋습니다.',
    caution: '혼자 앞서가면 상대가 부담을 느낄 가능성이 있습니다.',
    futureFlow: '가까운 흐름에서는 작은 제안이나 짧은 대화가 다음 기회를 여는 계기가 될 가능성이 있습니다.',
    keywords: ['성장', '시작', '확장'],
  },
  fire: {
    trait: '감정이 분명해지면 표현으로 이어지는 속도가 빠른 편입니다',
    example: '예를 들어 좋아하는 마음이 커지면 연락 빈도가 늘고, 상대가 알아차릴 만큼 표정이나 말투에 티가 나는 경향이 있습니다.',
    strength: '표현력이 좋아 상대가 당신의 마음을 비교적 빨리 알아차릴 수 있습니다.',
    advice: '표현은 장점이지만 중요한 말은 감정이 조금 가라앉은 뒤 전하면 더 선명하게 닿습니다.',
    caution: '순간의 분위기만 보고 결론을 내리면 나중에 마음이 흔들릴 가능성이 있습니다.',
    futureFlow: '앞으로는 감정을 숨기기보다 정리해서 말할 때 관계나 기회가 더 빠르게 움직일 수 있습니다.',
    keywords: ['표현', '열정', '직진'],
  },
  earth: {
    trait: '쉽게 흔들리지 않고 관계를 오래 지켜보는 편입니다',
    example: '예를 들어 누군가를 좋아하게 되면 바로 포기하기보다 상대의 말과 행동을 계속 관찰하며 신뢰할 수 있는지 확인하는 경향이 있습니다.',
    strength: '한 번 신뢰가 생기면 오래 지키는 힘이 있어 주변 사람에게 안정감을 줍니다.',
    advice: '천천히 보는 힘은 좋지만 마음을 숨기기만 하면 상대가 확신을 얻기 어렵습니다.',
    caution: '안정을 원해서 변화를 미루면 좋은 타이밍을 놓칠 가능성이 있습니다.',
    futureFlow: '가까운 시기에는 서두른 변화보다 꾸준한 확인과 현실적인 약속이 흐름을 안정시킬 수 있습니다.',
    keywords: ['안정', '신뢰', '지속'],
  },
  metal: {
    trait: '마음이 있어도 기준이 맞는지 먼저 따져보는 편입니다',
    example: '예를 들어 호감이 생겨도 상대의 말버릇, 약속을 지키는 태도, 생활 방식이 맞는지 조용히 체크하는 경향이 있습니다.',
    strength: '기준이 분명해서 애매한 관계나 위험한 선택에 오래 끌려가지 않는 힘이 있습니다.',
    advice: '기준은 관계를 지켜주지만, 모든 감정을 점수처럼 판단하지 않는 여유도 필요합니다.',
    caution: '완벽한 확신을 기다리다 보면 관계가 차갑게 느껴질 가능성이 있습니다.',
    futureFlow: '앞으로는 기준을 낮추기보다 우선순위를 정리할 때 선택이 더 가벼워질 가능성이 있습니다.',
    keywords: ['기준', '정리', '선택'],
  },
  water: {
    trait: '상대의 분위기와 작은 반응을 민감하게 읽는 편입니다',
    example: '예를 들어 답장이 조금 늦거나 말투가 달라지면 이유를 오래 생각하고, 상대의 감정 변화를 먼저 알아차리는 경향이 있습니다.',
    strength: '공감과 직감이 좋아 말로 드러나지 않은 분위기도 빠르게 파악할 수 있습니다.',
    advice: '직감은 소중하지만 확인되지 않은 생각은 대화로 점검하는 편이 안정적입니다.',
    caution: '상대의 마음을 혼자 추측하면 불안이 커질 가능성이 있습니다.',
    futureFlow: '가까운 흐름에서는 혼자 추측하는 시간을 줄이고 직접 확인할수록 마음이 안정될 가능성이 있습니다.',
    keywords: ['감정', '직감', '적응'],
  },
};

const purposeGuides = {
  연애운: ['연애 성향', '끌리는 상대 유형', '주의해야 할 연애 패턴', '가까운 시기의 흐름'],
  궁합: ['관계에서 편해지는 지점', '서로 부딪히기 쉬운 지점', '맞춰가면 좋은 대화 방식', '관계의 흐름'],
  금전운: ['돈을 버는 방식', '지출 습관', '투자와 리스크 감각', '주의할 시기'],
  직업운: ['일하는 방식', '강점이 드러나는 환경', '이직과 성장 가능성', '주의할 업무 패턴'],
  사업운: ['사업 감각', '파트너십 흐름', '확장 타이밍', '리스크 관리'],
  '올해 운세': ['올해의 중심 흐름', '관계와 일의 균형', '기회가 열리는 지점', '조심할 과속'],
  '종합 운세': ['전체 기질', '관계 흐름', '일과 돈의 방향', '가까운 시기의 조언'],
};

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededNumber(seed, salt) {
  const next = hashString(`${seed}:${salt}`);
  return 18 + (next % 83);
}

function normalizeElements(raw) {
  const total = Object.values(raw).reduce((sum, value) => sum + value, 0);
  const normalized = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, Math.round((value / total) * 100)]),
  );
  const diff = 100 - Object.values(normalized).reduce((sum, value) => sum + value, 0);
  normalized.water += diff;
  return normalized;
}

export function calculateElements(form) {
  const seed = [
    form.name.trim(),
    form.birthDate,
    form.birthTimeUnknown ? 'unknown' : form.birthTime,
    form.gender,
    form.purpose,
    form.consultationTopic || '',
    form.consultationSummary || '',
  ].join('|');

  return normalizeElements({
    wood: seededNumber(seed, 'wood'),
    fire: seededNumber(seed, 'fire'),
    earth: seededNumber(seed, 'earth'),
    metal: seededNumber(seed, 'metal'),
    water: seededNumber(seed, 'water'),
  });
}

function sortedElements(elements) {
  return Object.entries(elements)
    .map(([key, value]) => ({ key, value, label: elementLabels[key], meaning: elementMeaning[key] }))
    .sort((a, b) => b.value - a.value);
}

function sentenceByTone(tone, strong, weak, purpose, form) {
  const name = form.name.trim() || '당신';
  const strongText = behaviorLanguage[strong.key];
  const weakText = behaviorLanguage[weak.key];
  const shared = {
    mystic: [
      `${name}님, 처음 한 번만 짚어보면 ${strong.label}의 흐름이 가장 크게 보입니다. 그래서 ${strongText.trait}.`,
      strongText.example,
      `${purpose}에서는 마음이 보내는 작은 신호를 무시하지 않는 것이 중요합니다. ${weakText.advice}`,
    ],
    warm: [
      `${name}님, 처음 한 번만 보면 ${strong.label}의 흐름이 따뜻하게 살아 있어요. 그래서 ${strongText.trait}.`,
      strongText.example,
      `${purpose}에서는 스스로를 몰아붙이지 않는 게 제일 중요해요. ${weakText.advice}`,
    ],
    logical: [
      `${name}님의 입력값을 기준으로 보면 ${strong.label} 비중이 가장 높습니다. 행동 패턴으로 바꾸면 ${strongText.trait}.`,
      strongText.example,
      `${purpose} 관점에서는 강점을 키우는 전략과 보완 장치를 분리해야 합니다. ${weakText.advice}`,
    ],
    poetic: [
      `${name}, 처음 한 번만 말하면 ${strong.label}의 흐름이 가장 먼저 반짝여. 그래서 ${strongText.trait}.`,
      strongText.example,
      `${purpose}의 흐름은 네가 흔들리는 바로 그곳에 힌트가 숨어 있어. ${weakText.advice}`,
    ],
    direct: [
      `${name}, 처음 한 번만 짚으면 ${strong.label} 흐름이 강하게 잡힌다. 행동으로 보면 ${strongText.trait}.`,
      strongText.example,
      `${purpose}에서는 망설임을 줄이는 게 핵심이다. ${weakText.advice}`,
    ],
  };

  return shared[tone];
}

function purposeReading(tone, purpose, strong, weak) {
  const sections = purposeGuides[purpose] || purposeGuides['종합 운세'];
  const strongText = behaviorLanguage[strong.key];
  const weakText = behaviorLanguage[weak.key];
  const toneOpeners = {
    mystic: '흐름을 따라 살펴보면 마음이 먼저 알아차리는 장면이 있습니다.',
    warm: '조심스럽고 다정하게 말씀드리면 편안함을 회복하는 일이 먼저예요.',
    logical: '구조적으로 분석하면 기준과 감정을 분리해서 보는 편이 효율적입니다.',
    poetic: '네 마음의 장면으로 보면 끌림과 불안이 같은 자리에 앉아 있어.',
    direct: '핵심만 말하면 기준을 정하고 움직이는 편이 낫다.',
  };
  const endings = {
    mystic: strongText.example,
    warm: '예를 들어 연락을 기다리며 지칠 때는 답을 재촉하기보다 내 하루를 안정시키는 선택이 도움이 됩니다.',
    logical: '예를 들어 상대의 말보다 반복되는 행동을 기록해보면 판단이 훨씬 선명해집니다.',
    poetic: '예를 들어 보고 싶은 마음이 커질수록, 그 마음이 나를 아프게 하는지 따뜻하게 하는지 바라보면 좋아.',
    direct: '예를 들어 애매한 관계가 길어지면 기간을 정하고 대화를 시도하는 편이 낫다.',
  };
  return sections.map((section, index) => {
    const focus = index % 2 === 0 ? strongText : weakText;
    return `${section}: ${toneOpeners[tone]} ${focus.trait}. ${endings[tone]}`;
  });
}

function answerBasedEmpathy(form) {
  const summary = form.consultationSummary || '';
  if (summary.includes('애매') || summary.includes('확신')) {
    return '상대가 애매하게 나오면 더 신경 쓰는 편이죠? 그럴수록 마음을 혼자 키우기보다 확인할 수 있는 말을 남기는 편이 좋습니다.';
  }
  if (summary.includes('고민') || summary.includes('확인')) {
    return '결정을 오래 붙잡는 편이죠? 그 신중함은 장점이지만, 실행 기한이 없으면 마음이 계속 지칠 수 있습니다.';
  }
  if (summary.includes('기분') || summary.includes('감')) {
    return '마음이 움직이면 흐름을 빠르게 타는 편이죠? 그 감각은 좋지만, 중요한 선택 앞에서는 하루 정도 시간을 두면 더 안정적입니다.';
  }
  return '겉으로는 괜찮아 보여도 속으로는 오래 생각하는 편이죠? 그 마음을 혼자만의 숙제로 두지 않는 것이 중요합니다.';
}

function buildChoiceReading(form) {
  const answers = Object.values(form.consultationAnswers || {}).filter(Boolean);
  const joined = answers.map((answer) => answer.selectedChoice || answer).join(', ');
  if (!answers.length) {
    return '선택 답변이 많지 않아 기본 사주 흐름을 중심으로 읽었습니다. 그래도 지금의 성향은 행동 패턴에서 충분히 드러납니다.';
  }

  if (form.consultationTopic === '연애') {
    return `당신이 고른 답변은 "${joined}"입니다. 이 흐름은 마음이 움직여도 바로 밀어붙이기보다 상대의 태도와 관계의 온도를 먼저 확인하려는 연애 패턴으로 이어집니다.`;
  }
  if (form.consultationTopic === '재물') {
    return `당신이 고른 답변은 "${joined}"입니다. 돈을 대할 때 안정과 기회를 함께 보고, 지출이나 투자 전에 스스로 납득할 근거를 찾는 흐름으로 읽힙니다.`;
  }
  if (form.consultationTopic === '직업') {
    return `당신이 고른 답변은 "${joined}"입니다. 일에서는 당장의 감정보다 성장감, 지속 가능성, 다음 선택의 기준을 함께 따지는 경향이 드러납니다.`;
  }
  if (form.consultationTopic === '사업') {
    return `당신이 고른 답변은 "${joined}"입니다. 사업 흐름에서는 감만 믿기보다 리스크를 확인하고, 결정의 책임을 스스로 잡으려는 태도가 강하게 보입니다.`;
  }
  return `당신이 고른 답변은 "${joined}"입니다. 전체 흐름에서는 관계, 일, 마음의 균형을 동시에 보려는 상태로 읽히며, 지금은 한 가지 기준을 세우는 일이 중요합니다.`;
}

function buildFinalCard(form, character, strong, weak) {
  const strongText = behaviorLanguage[strong.key];
  const weakText = behaviorLanguage[weak.key];
  const empathy = answerBasedEmpathy(form);
  const baseCard = {
    name: form.name.trim() || '당신',
    characterName: character.name,
    topic: form.purpose,
    traitSummary: strongText.trait,
    behavior: strongText.example,
    choiceReading: buildChoiceReading(form),
    strength: strongText.strength,
    advice: strongText.advice,
    caution: `${weakText.caution} ${empathy}`,
    futureFlow: strongText.futureFlow,
    keywords: [...strongText.keywords],
  };
  return baseCard;
}

export function buildFortuneResult(form, characterId) {
  const character = characters.find((item) => item.id === characterId) || characters[0];
  const elements = calculateElements(form);
  const ranked = sortedElements(elements);
  const strong = ranked[0];
  const weak = ranked[ranked.length - 1];

  const answers = Object.values(form.consultationAnswers || {}).filter(Boolean);
  const consultationData = {
    userInfo: {
      name: form.name,
      birthDate: form.birthDate,
      birthTime: form.birthTime,
      birthTimeUnknown: form.birthTimeUnknown,
      gender: form.gender,
    },
    characterId: character.id,
    characterName: character.name,
    topic: form.consultationTopic || form.purpose,
    answers,
    elements,
  };
  const engineSummary = generateFinalSummary(consultationData);
  const finalCard = {
    ...buildFinalCard(form, character, strong, weak),
    traitSummary: engineSummary.personalityLine,
    behavior: engineSummary.behaviorExample,
    advice: engineSummary.topicAdvice,
    caution: engineSummary.warning,
    futureFlow: engineSummary.futureFlow,
    keywords: engineSummary.luckKeywords,
    engineSummary,
  };

  return {
    createdAt: new Date().toISOString(),
    character,
    form,
    elements,
    ranked,
    summary: sentenceByTone(character.tone, strong, weak, form.purpose, form),
    purposeReading: purposeReading(character.tone, form.purpose, strong, weak),
    consultationData,
    finalCard,
    disclaimer:
      '이 결과는 MVP용 더미 로직으로 만든 성향 해석입니다. 중요한 결정은 현실 정보와 전문가 조언을 함께 참고해 주세요.',
  };
}

export { elementLabels };
