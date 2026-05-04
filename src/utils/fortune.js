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
      `${name}님, 지금 사주의 결을 조용히 짚어보면 ${strong.label}의 빛이 가장 먼저 떠오릅니다. ${strong.meaning}의 감각이 비교적 선명해서 마음이 먼저 흐름을 알아차리는 편으로 보입니다.`,
      `다만 ${weak.label}은 고요하게 비어 있는 자리처럼 느껴집니다. 부족함이라 단정하기보다, 중요한 선택 앞에서 천천히 의식적으로 채워야 할 기운으로 보는 편이 좋겠습니다.`,
      `${purpose}에서는 마음이 보내는 작은 신호를 무시하지 않는 것이 중요합니다. 흐름상 조급하게 결론을 내리기보다, 느껴지는 방향을 현실의 작은 행동으로 옮길 때 길이 더 또렷해질 가능성이 있습니다.`,
    ],
    warm: [
      `${name}님, 괜찮아요. 사주 안에서는 ${strong.label}의 힘이 따뜻하게 살아 있어서 ${strong.meaning}과 연결된 장점이 사람들에게 자연스럽게 전해질 가능성이 있어요.`,
      `${weak.label}이 약하게 보이는 부분도 너무 걱정하지 않으셔도 됩니다. 그건 모자람이라기보다 조금 더 쉬게 해주고, 돌봐주고, 천천히 채워주면 되는 자리로 보여요.`,
      `${purpose}에서는 스스로를 몰아붙이지 않는 게 제일 중요해요. 마음이 편안해지는 선택을 할 때 관계도, 기회도 조금 더 부드럽게 열릴 가능성이 있습니다.`,
    ],
    logical: [
      `${name}님의 입력값을 기준으로 분석하면 ${strong.label} 비중이 가장 높습니다. 이는 ${strong.meaning}에 해당하는 행동 패턴이 반복적으로 나타날 가능성이 있다는 의미입니다.`,
      `${weak.label}은 상대적으로 낮게 산출됩니다. 따라서 해당 영역이 필요한 상황에서는 감정적 확신만으로 움직이기보다 체크리스트, 일정표, 외부 피드백을 함께 쓰는 편이 합리적입니다.`,
      `${purpose} 관점에서는 강점을 키우는 전략과 약점을 보완하는 장치를 분리해야 합니다. 지금 흐름에서는 한 번에 전부 바꾸기보다, 우선순위를 좁혀 실행하는 방식이 가장 효율적입니다.`,
    ],
    poetic: [
      `${name}, 네 마음의 별자리 안에서는 ${strong.label}이 가장 먼저 반짝여. ${strong.meaning}의 기운이 네가 바라보는 장면들을 조용히 앞으로 밀어주고 있어.`,
      `${weak.label}은 아직 안개 속에 놓인 작은 길 같아. 억지로 밝히려고 하지 않아도 돼. 이름을 붙여주고 천천히 바라보면, 그 길은 새로운 감각으로 자라날 수 있어.`,
      `${purpose}의 흐름은 네가 흔들리는 바로 그곳에 힌트가 숨어 있어. 끌림과 불안을 같이 안아볼 때, 지금 필요한 답이 조금 더 선명해질 거야.`,
    ],
    direct: [
      `${name}, 네 사주는 ${strong.label} 기운이 강하게 잡힌다. ${strong.meaning}을 밀고 나가는 힘이 있으니, 기회가 왔을 때는 뒤로 빠지지 말고 확실히 움직이는 편이 맞다.`,
      `다만 ${weak.label}이 약한 부분을 무시하면 결정에 빈틈이 생긴다. 약한 지점은 감으로 덮지 마라. 계획, 숫자, 사람의 검증으로 보완해야 한다.`,
      `${purpose}에서는 망설임을 줄이는 게 핵심이다. 무리한 확신은 버리고, 근거가 쌓인 선택부터 과감하게 실행해라. 흐름상 행동하지 않으면 기회도 흐려질 가능성이 있다.`,
    ],
  };

  return shared[tone];
}

function purposeReading(tone, purpose, strong, weak) {
  const sections = purposeGuides[purpose] || purposeGuides['종합 운세'];
  const toneOpeners = {
    mystic: '흐름을 따라 살펴보면',
    warm: '조심스럽고 다정하게 말씀드리면',
    logical: '구조적으로 분석하면',
    poetic: '네 마음의 장면으로 보면',
    direct: '핵심만 말하면',
  };
  const endings = {
    mystic: '너무 서두르지 않고 흐름을 읽어가면 더 안정적인 선택으로 이어질 가능성이 있습니다.',
    warm: '스스로를 탓하기보다 편안한 리듬을 먼저 회복하면 좋은 가능성이 더 부드럽게 열릴 수 있어요.',
    logical: '변수와 기준을 분리해서 판단하면 불필요한 시행착오를 줄일 수 있습니다.',
    poetic: '흔들림을 외면하지 않으면, 그 마음이 다음 선택의 작은 별빛이 되어줄 거야.',
    direct: '애매하게 끌려가지 말고, 기준을 정한 뒤 바로 움직여라.',
  };
  return sections.map((section, index) => {
    const focus = index % 2 === 0 ? strong : weak;
    return `${section}: ${toneOpeners[tone]} ${focus.label}의 영향이 ${purpose} 안에서 중요한 변수로 보입니다. 성향상 ${focus.meaning}이 선택의 방향을 만들 수 있으니, ${endings[tone]}`;
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
