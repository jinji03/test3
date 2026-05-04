import { characters } from '../data/characters.js';

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
  const shared = {
    mystic: [
      `${name}님의 사주 흐름에서는 ${strong.label}의 결이 먼저 떠오릅니다. 이는 ${strong.meaning}의 감각이 비교적 선명하다는 뜻으로 볼 수 있어요.`,
      `반대로 ${weak.label}의 기운은 조용히 비어 있는 편이라, 중요한 선택 앞에서는 그 영역을 의식적으로 보완할수록 균형이 좋아질 가능성이 있습니다.`,
      `${purpose}을 볼 때도 단정적인 결론보다 흐름을 읽는 태도가 어울립니다. 지금은 마음이 먼저 알아차린 신호를 현실의 작은 행동으로 옮기는 과정이 중요해 보입니다.`,
    ],
    warm: [
      `${name}님에게는 ${strong.label}의 힘이 따뜻하게 살아 있습니다. ${strong.meaning}과 연결된 장점이 사람들에게 자연스럽게 전해질 가능성이 있어요.`,
      `${weak.label}이 약하게 잡히는 부분은 부족함이라기보다 돌봄이 필요한 자리로 보면 좋겠습니다. 서두르지 않고 생활 리듬 안에서 채워가면 충분히 달라질 수 있어요.`,
      `${purpose}에서는 스스로를 몰아붙이기보다 편안해지는 선택을 찾는 것이 좋아 보입니다. 마음이 안정될 때 관계와 기회도 더 부드럽게 열릴 가능성이 있습니다.`,
    ],
    logical: [
      `${name}님의 입력값을 기준으로 보면 ${strong.label} 비중이 가장 높습니다. 이는 ${strong.meaning}에 해당하는 행동 패턴이 반복적으로 나타날 가능성을 뜻합니다.`,
      `${weak.label}은 상대적으로 낮으므로, 해당 영역이 요구되는 상황에서는 감정적 판단보다 체크리스트와 외부 피드백을 함께 쓰는 편이 유리합니다.`,
      `${purpose} 관점에서는 강점을 더 키우는 전략과 약점을 보완하는 장치를 분리해서 보는 것이 좋습니다. 흐름상 한 번에 모든 것을 바꾸기보다 우선순위를 좁히는 방식이 효율적입니다.`,
    ],
    poetic: [
      `${name}님의 별빛 같은 결 안에서는 ${strong.label}이 가장 밝게 반짝입니다. ${strong.meaning}의 기운이 마음의 장면들을 앞으로 밀어주는 모습이에요.`,
      `${weak.label}은 아직 안개 속에 놓인 작은 길처럼 보입니다. 그 길을 억지로 밝히기보다, 천천히 이름을 붙여주면 새로운 감각으로 자라날 가능성이 있습니다.`,
      `${purpose}의 흐름은 마음이 흔들리는 곳에 힌트가 숨어 있습니다. 끌림과 불안을 함께 바라볼 때, 지금 필요한 답이 더 선명해질 수 있어요.`,
    ],
    direct: [
      `${name}님은 ${strong.label} 기운이 강하게 잡힙니다. ${strong.meaning}을 밀고 나가는 힘이 있으니, 흐름을 탈 때는 확실히 전진하는 편이 맞습니다.`,
      `다만 ${weak.label}이 약한 만큼 그 부분을 무시하면 결정의 빈틈이 생길 수 있습니다. 약한 지점은 감으로 덮지 말고 계획으로 보완해야 합니다.`,
      `${purpose}에서는 망설임을 줄이는 것이 핵심입니다. 단, 무리한 확신은 피하고 근거가 쌓인 선택부터 과감하게 실행하는 쪽이 좋아 보입니다.`,
    ],
  };

  return shared[tone];
}

function purposeReading(tone, purpose, strong, weak) {
  const sections = purposeGuides[purpose] || purposeGuides['종합 운세'];
  const toneOpeners = {
    mystic: '흐름상',
    warm: '다정하게 살펴보면',
    logical: '분석하면',
    poetic: '마음의 장면으로 보면',
    direct: '핵심만 말하면',
  };
  return sections.map((section, index) => {
    const focus = index % 2 === 0 ? strong : weak;
    return `${section}: ${toneOpeners[tone]} ${focus.label}의 영향이 ${purpose} 안에서 중요한 변수로 보입니다. 성향상 ${focus.meaning}이 선택의 방향을 만들 수 있으니, 좋은 가능성은 키우고 과한 반응은 한 박자 늦춰 보는 편이 좋습니다.`;
  });
}

export function buildFortuneResult(form, characterId) {
  const character = characters.find((item) => item.id === characterId) || characters[0];
  const elements = calculateElements(form);
  const ranked = sortedElements(elements);
  const strong = ranked[0];
  const weak = ranked[ranked.length - 1];

  return {
    createdAt: new Date().toISOString(),
    character,
    form,
    elements,
    ranked,
    summary: sentenceByTone(character.tone, strong, weak, form.purpose, form),
    purposeReading: purposeReading(character.tone, form.purpose, strong, weak),
    disclaimer:
      '이 결과는 MVP용 더미 로직으로 만든 성향 해석입니다. 중요한 결정은 현실 정보와 전문가 조언을 함께 참고해 주세요.',
  };
}

export { elementLabels };
