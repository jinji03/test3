import {
  elementCounselWords,
  elementKorean,
  tenGodDescriptions,
  topicSajuGuides,
  topicTenGodFocus,
} from './sajuDictionary.js';
import { describeElementList } from './sajuEngine.js';

function normalizeTopicKey(topic) {
  const map = {
    career: 'job',
    total: 'general',
    연애: 'love',
    연애운: 'love',
    재물: 'money',
    금전운: 'money',
    직업: 'job',
    직업운: 'job',
    사업: 'business',
    사업운: 'business',
    '올해 운세': 'general',
    '종합 운세': 'general',
  };
  return map[topic] || topic || 'general';
}

function sortedEntries(values = {}) {
  return Object.entries(values).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function getStrongWeakElements(profile) {
  const sorted = sortedEntries(profile.fiveElements);
  return {
    strong: sorted.slice(0, 2).map(([key]) => key),
    weak: [...sorted].reverse().slice(0, 2).map(([key]) => key),
  };
}

function getTopicTenGods(topic, tenGods = {}) {
  const key = normalizeTopicKey(topic);
  const focus = topicTenGodFocus[key] || topicTenGodFocus.general;
  return focus
    .map((name) => ({ name, value: tenGods[name] || 0, description: tenGodDescriptions[name] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);
}

function compact(text = '', max = 78) {
  const cleaned = String(text)
    .replace(/현재 선택값을 보면,?\s*/g, '')
    .replace(/분석 결과|패턴 분석|확률적으로|오행상|토가 강해서|집중형|감정형|안정형|성장형/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= max) return cleaned;
  const sentence = cleaned.split(/(?<=[.!?。요])\s+/)[0];
  if (sentence && sentence.length <= max) return sentence;
  return `${cleaned.slice(0, max - 1).trim()}...`;
}

function answerCorrection(topic, context = {}, answers = []) {
  const key = normalizeTopicKey(context.topic || topic);
  const selected = answers.map((answer) => answer.selectedChoice).filter(Boolean);
  const lastChoice = selected[selected.length - 1];
  const picked = lastChoice ? `방금 고른 "${lastChoice}"도 그 흐름에 닿아 있어요.` : '';

  const lines = {
    love: {
      uncertain: '지금 관계가 애매해서 마음이 먼저 지쳤을 수 있어요.',
      has_interest: '끌리는 마음이 있어 작은 반응도 크게 느껴졌겠네요.',
      in_relationship: '이미 이어진 관계 안에서 안정감을 다시 확인하고 싶어 보여요.',
      single: '지금은 누군가보다 내 마음의 속도를 먼저 보는 때예요.',
    }[context.relationship_status] || '관계에서는 확신과 기다림 사이를 오가고 있어요.',
    money: {
      spending_leak: '돈이 새는 느낌 때문에 마음이 예민해졌겠네요.',
      saving_difficulty: '모으려는 마음은 있는데 흐름이 자꾸 끊긴 것 같아요.',
      investment_property: '큰돈 앞에서는 기회와 손실을 같이 보고 있네요.',
      income_shortage: '수입이 현실을 못 받쳐준다는 압박이 있었겠어요.',
    }[context.money_focus] || '돈 문제는 감정보다 기준이 먼저 필요해 보여요.',
    job: {
      people_stress: '일보다 사람 때문에 더 닳아 있었겠어요.',
      growth_block: '남아도 될지, 더 커질 길이 있는지 계속 걸렸겠네요.',
      reward_gap: '애쓴 만큼 돌아오지 않는 느낌이 컸을 수 있어요.',
    }[context.job_concern] || '일에서는 감정 피로와 조건 확인이 같이 올라와요.',
    business: {
      customer_fit: '아이템보다 사람들의 반응이 더 신경 쓰였겠네요.',
      funding: '자금의 속도가 마음의 속도보다 크게 느껴졌겠어요.',
      partner_people: '사람 문제에서 단호해지는 게 쉽지 않았겠어요.',
    }[context.business_concern] || '사업은 기회와 손실을 동시에 보는 중이에요.',
    general: {
      money_work: '돈과 일이 같이 밀려오니 숨이 막혔겠어요.',
      relationships: '관계의 거리감이 요즘 마음을 크게 건드렸겠네요.',
      self_recovery: '지금은 성과보다 회복이 먼저 필요해 보여요.',
    }[context.life_focus] || '지금은 한 가지 기준으로 마음을 정리할 때예요.',
  };
  return compact(`${lines[key] || lines.general} ${picked}`);
}

function buildCoreLine(profile) {
  const { strong, weak } = getStrongWeakElements(profile);
  const strongWords = strong.flatMap((element) => elementCounselWords[element] || []).slice(0, 3).join(', ');
  const weakWords = weak.flatMap((element) => elementCounselWords[element] || []).slice(0, 2).join(', ');
  return compact(`${profile.dayMaster.label} 일간이라 기본 결은 분명합니다. ${strongWords} 쪽은 살아 있고, ${weakWords} 쪽은 의식해서 보완해야 해요.`);
}

function buildTopicReading(topic, profile) {
  const key = normalizeTopicKey(topic);
  const guide = topicSajuGuides[key] || topicSajuGuides.general;
  const topicGods = getTopicTenGods(key, profile.tenGods);
  const top = topicGods[0];
  const tenGodLine = top?.value > 0
    ? `${guide.title}에서는 ${top.name} 흐름이 먼저 보입니다. ${top.description}이 ${top.value >= 1.5 ? '비교적 또렷해요.' : '약하게 들어와요.'}`
    : `${guide.title}에서는 특정 십성이 강하게 몰리기보다 균형을 다시 잡는 쪽입니다.`;
  return {
    title: guide.title,
    lines: [
      compact(guide.base),
      compact(tenGodLine),
      compact(guide.advice),
    ],
    topicGods,
  };
}

function buildActionLine(topic, profile) {
  const key = normalizeTopicKey(topic);
  const favorable = describeElementList(profile.usefulElements.favorable);
  const base = {
    love: '상대의 말보다 반복되는 행동을 보고, 확인 대화는 짧게 남기세요.',
    money: '고정비, 선택 지출, 투자금을 나눠서 한도를 먼저 정하세요.',
    job: '역할, 보상, 성장 가능성을 따로 적고 감정 피로와 분리하세요.',
    business: '작게 테스트하고 다음 지출의 회수 기준을 숫자로 정하세요.',
    general: '이번 주에는 관계, 돈, 일, 컨디션 중 하나만 먼저 정리하세요.',
  };
  return compact(`${base[key] || base.general} 보완하면 좋은 결은 ${favorable} 쪽입니다.`);
}

function buildEvidenceCard(topic, profile) {
  const { strong, weak } = getStrongWeakElements(profile);
  const topicGods = getTopicTenGods(topic, profile.tenGods);
  return {
    dayMaster: profile.dayMaster.label,
    pillars: {
      year: `${profile.pillars.year.stem}${profile.pillars.year.branch}`,
      month: `${profile.pillars.month.stem}${profile.pillars.month.branch}`,
      day: `${profile.pillars.day.stem}${profile.pillars.day.branch}`,
      hour: profile.pillars.hour.unknown ? '미상' : `${profile.pillars.hour.stem}${profile.pillars.hour.branch}`,
    },
    fiveElements: profile.fiveElements,
    strongElements: strong.map((element) => elementKorean[element]),
    weakElements: weak.map((element) => elementKorean[element]),
    topicTenGods: topicGods.map((item) => `${item.name}${item.value > 0 ? ` ${item.value.toFixed(1)}` : ' 약'}`),
    annualFlow: profile.annualFlow.theme,
    timeNotice: profile.notes?.[0] || '',
  };
}

function buildTopicCards(topic, profile, currentLine) {
  const topicReading = buildTopicReading(topic, profile);
  const action = buildActionLine(topic, profile);
  const common = {
    love: ['사주상 연애 결', '현재 관계 흐름', '상대를 대하는 방식', '지금 조심할 점', '행동 조언'],
    money: ['사주상 재물 흐름', '돈이 모이는 방식', '새는 돈의 길', '투자/부동산 주의점', '행동 조언'],
    job: ['사주상 직업 결', '조직/전문성/이직 흐름', '현재 고민 보정', '지금 조심할 점', '행동 조언'],
    business: ['사주상 사업 결', '확장/자금/사람 문제', '리스크 판단', '지금 조심할 점', '행동 조언'],
    general: ['전체 사주 구조', '올해 흐름', '현재 나이대 흐름', '조심할 점', '행동 조언'],
  };
  const key = normalizeTopicKey(topic);
  const labels = common[key] || common.general;
  const values = [
    topicReading.lines[1],
    key === 'general' ? profile.annualFlow.theme : topicReading.lines[0],
    key === 'general' ? profile.ageFlow.decadeLuckSummary : currentLine,
    profile.strength.reason,
    action,
  ];
  return labels.map((label, index) => ({ label, body: compact(values[index], 96) }));
}

function getYinYangSummary(profile) {
  const yin = profile.yinYangBalance?.yin || 0;
  const yang = profile.yinYangBalance?.yang || 0;
  if (Math.abs(yin - yang) <= 0.8) return '음양이 비교적 고르게 배치되어 상황에 따라 속도 조절이 가능합니다.';
  return yang > yin
    ? '양의 흐름이 앞서 실행과 외부 활동이 빠르게 드러나는 편입니다.'
    : '음의 흐름이 앞서 관찰, 축적, 내부 판단이 먼저 움직이는 편입니다.';
}

function getElementDistributionText(profile) {
  return sortedEntries(profile.fiveElements)
    .map(([key, value]) => `${elementKorean[key]} ${value}`)
    .join(' · ');
}

function buildSajuOverview(profile) {
  const { strong, weak } = getStrongWeakElements(profile);
  return {
    title: '오늘의 사주 종합',
    dayMaster: profile.dayMaster.label,
    fiveElements: getElementDistributionText(profile),
    yinYang: getYinYangSummary(profile),
    luckFlow: `${profile.ageFlow.decadeLuckSummary} ${profile.annualFlow.theme}`,
    oneLine: `${profile.dayMaster.label} 일간에 ${describeElementList(strong)} 흐름이 앞서며, ${describeElementList(weak)} 보완이 핵심입니다.`,
  };
}

function makeSection(id, title, subtitle, summary, detail, advice, tags) {
  return {
    id,
    title,
    subtitle,
    summary: compact(summary, 120),
    detail: compact(detail, 220),
    advice: compact(advice, 160),
    tags,
  };
}

function buildResultSections(topic, profile, currentLine, actionLine) {
  const { strong, weak } = getStrongWeakElements(profile);
  const strongText = describeElementList(strong);
  const weakText = describeElementList(weak);
  const favorableText = describeElementList(profile.usefulElements.favorable);
  const cautionText = describeElementList(profile.usefulElements.caution);
  const tenGods = getTopicTenGods('general', profile.tenGods);
  const moneyGods = getTopicTenGods('money', profile.tenGods);
  const jobGods = getTopicTenGods('job', profile.tenGods);
  const loveGods = getTopicTenGods('love', profile.tenGods);
  const businessGods = getTopicTenGods('business', profile.tenGods);
  const mainTenGod = tenGods[0]?.name || '십성';
  const moneyTenGod = moneyGods[0]?.name || '재성';
  const jobTenGod = jobGods[0]?.name || '관성';
  const loveTenGod = loveGods[0]?.name || '관성';
  const businessTenGod = businessGods[0]?.name || '편재';

  return [
    makeSection(
      'summary',
      '종합 사주 분석',
      '사주의 전체 구조와 핵심 기운',
      `${profile.dayMaster.label} 일간을 중심으로 ${strongText} 흐름이 먼저 드러납니다.`,
      `사주 원국에서는 ${getElementDistributionText(profile)}의 분포가 보입니다. 강한 기운은 판단과 선택의 속도를 만들고, 부족한 기운은 생활에서 의식적으로 보완해야 할 지점입니다. 현재는 ${profile.annualFlow.relationToDayMaster || mainTenGod} 흐름이 올해의 판단 기준으로 작동합니다.`,
      `${weakText} 기운을 일정, 기록, 관계 정리처럼 현실적인 방식으로 채우면 전체 균형이 안정됩니다.`,
      ['일간분석', '오행분포', '전체운'],
    ),
    makeSection(
      'temperament',
      '성격과 기질',
      '타고난 반응 방식과 대인관계',
      `${profile.dayMasterDescription}`,
      `${profile.strength.reason} ${getYinYangSummary(profile)} 대인관계에서는 강한 기운이 장점으로 쓰이면 기준이 분명해지고, 과하면 상대가 압박으로 느낄 수 있습니다.`,
      `감정이 올라오는 순간 바로 결론 내리기보다 한 번 정리한 뒤 말하면 ${profile.dayMaster.label}의 장점이 더 안정적으로 드러납니다.`,
      ['일간', '음양균형', '대인관계'],
    ),
    makeSection(
      'wealth',
      '재물운',
      '돈의 흐름과 재물 형성 방식',
      `재물은 ${moneyTenGod} 흐름과 식상의 작동을 함께 볼 때 방향이 선명해집니다.`,
      `${moneyTenGod}이 재물 판단의 중심에 들어오며, ${strongText} 기운은 돈을 벌 때 쓰는 방식에 영향을 줍니다. 단기적인 한 번의 기회보다 수입 구조, 지출 통제, 회수 기간을 나눠 보는 쪽이 유리합니다.`,
      `무리한 투기보다 전문성 기반 수익과 고정비 관리가 먼저입니다. 좋은 흐름은 올해의 ${profile.annualFlow.relationToDayMaster || '세운'} 기운을 현실 계획으로 바꿀 때 살아납니다.`,
      ['재물운', '수익구조', '장기전략'],
    ),
    makeSection(
      'career',
      '직업운과 적성',
      '커리어 방향과 잘 맞는 업무 환경',
      `직업운은 ${jobTenGod} 흐름과 일간의 힘을 함께 볼 때 강점이 보입니다.`,
      `${jobTenGod}은 책임, 조직, 전문성, 성과 압박을 읽는 기준입니다. 현재 구조에서는 ${profile.strength.dayMasterStrength} 일간이므로 역할이 분명하고 기준이 있는 환경에서 힘을 쓰기 좋습니다.`,
      `성과 기준이 흐린 곳, 감정 소모가 큰 곳은 피로가 커질 수 있습니다. 커리어는 역할, 보상, 성장 가능성을 분리해 판단하세요.`,
      ['직업운', '전문성', '커리어'],
    ),
    makeSection(
      'love',
      '연애운과 결혼운',
      '관계 흐름과 좋은 인연의 시기',
      `연애와 결혼은 ${loveTenGod} 흐름, 표현 방식, 안정감을 함께 봐야 합니다.`,
      `관계에서는 끌림만큼 반복되는 태도와 약속의 온도가 중요합니다. ${currentLine} 사주 흐름상 강한 기운이 관계에서 기준으로 작동하면 선명하지만, 부족한 기운은 기다림과 표현의 엇갈림으로 나타날 수 있습니다.`,
      `상대의 말보다 반복되는 행동을 보세요. 좋은 인연은 올해 흐름에서 책임과 약속이 현실적으로 맞을 때 더 안정됩니다.`,
      ['연애운', '결혼운', '관계흐름'],
    ),
    makeSection(
      'business',
      '사업운',
      '사업 적성과 확장 리스크',
      `사업운은 ${businessTenGod} 흐름과 식상, 비겁의 균형을 함께 봅니다.`,
      `${businessTenGod}은 기회, 거래, 확장 자금을 보는 기준입니다. 혼자 빠르게 밀어붙이는 일은 장점이 될 수 있지만, 동업이나 확장에서는 사람과 돈의 경계를 먼저 정해야 합니다.`,
      `확장은 작게 검증한 뒤 진행하세요. 자금 회수 기준, 역할 분담, 손실 한도를 숫자로 정하면 리스크를 줄일 수 있습니다.`,
      ['사업운', '확장', '리스크관리'],
    ),
    makeSection(
      'health',
      '건강운',
      '생활 균형과 컨디션 관리',
      `${weakText} 기운이 약해질 때 생활 리듬이 먼저 흔들릴 수 있습니다.`,
      `이 해석은 의학적 판단이 아니라 사주 구조 기반의 생활 조언입니다. 강한 기운을 오래 쓰면 과열이나 긴장으로 이어질 수 있고, 부족한 기운은 회복 루틴에서 보완이 필요합니다.`,
      `수면, 식사, 움직임을 한 번에 바꾸기보다 가장 무너진 한 가지부터 회복하세요. 스트레스가 커지는 시기에는 약속과 일정을 줄이는 것이 좋습니다.`,
      ['생활관리', '스트레스', '회복'],
    ),
    makeSection(
      'decade',
      '대운 흐름',
      '10년 단위 운의 변화',
      `현재 나이 흐름은 ${profile.ageFlow.decadeLuckSummary}`,
      `대운은 10년 단위로 삶의 배경을 바꾸는 큰 흐름입니다. 지금 구간에서는 ${favorableText} 기운을 살리는 선택이 앞으로의 안정성을 키웁니다.`,
      `중요한 선택은 단기 감정보다 3년 뒤에도 남을 기준으로 보세요. 앞으로 좋아지는 영역은 보완 기운을 현실 습관으로 만든 곳에서 먼저 열립니다.`,
      ['대운', '10년흐름', '선택방향'],
    ),
    makeSection(
      'year',
      '올해 운세',
      '세운과 올해의 기회',
      `올해는 ${profile.annualFlow.currentYearStemBranch} 세운이며 ${profile.annualFlow.relationToDayMaster || '기본 기운'} 흐름이 들어옵니다.`,
      `${profile.annualFlow.theme} 재물, 직업, 연애, 건강은 각각 따로 움직이기보다 올해의 핵심 기운 안에서 같이 반응합니다. 기회는 빨리 잡되, 조건 확인 없이 확장하는 선택은 주의가 필요합니다.`,
      `올해는 ${actionLine} 월별로는 상반기에는 정리와 검증, 하반기에는 실행과 조정을 중심에 두면 좋습니다.`,
      ['올해운', '세운', '기회와주의'],
    ),
    makeSection(
      'action',
      '실행 조언',
      '앞으로 1년간 집중할 방향',
      `지금은 강한 기운을 더 밀기보다 ${weakText} 보완으로 균형을 잡는 시기입니다.`,
      `피해야 할 선택은 감정이 급해졌을 때 큰돈, 이직, 관계 결정을 한 번에 묶는 것입니다. 살려야 할 강점은 ${strongText}에서 나오는 판단력과 지속력입니다.`,
      `앞으로 1년은 ${favorableText}을 생활 안에 넣고, ${cautionText}이 과하게 쓰이는 상황을 줄이세요.`,
      ['실행조언', '1년방향', '현실전략'],
    ),
  ];
}

export function buildSajuResult({ sajuProfile, consultationData }) {
  const topic = consultationData.topic;
  const answers = consultationData.answers || [];
  const resultContext = consultationData.resultContext || {};
  const topicReading = buildTopicReading(topic, sajuProfile);
  const currentLine = answerCorrection(topic, resultContext, answers);
  const coreLine = buildCoreLine(sajuProfile);
  const actionLine = buildActionLine(topic, sajuProfile);
  const finalLine = compact(`이미 마음은 어느 정도 알고 있는 것 같아요. 올해는 ${sajuProfile.annualFlow.relationToDayMaster} 흐름이라 서두르기보다 기준을 세워야 합니다.`);
  const timeNotice = sajuProfile.notes?.[0];

  return {
    coreLine,
    dayMasterLine: compact(sajuProfile.dayMasterDescription),
    elementLine: compact(`목·화·토·금·수 중 ${describeElementList(getStrongWeakElements(sajuProfile).strong)} 흐름이 먼저 보입니다. 그래서 쉽게 넘기기 어려웠겠네요.`),
    topicLine: topicReading.lines[1],
    currentLine,
    actionLine,
    finalLine,
    topicAdvice: actionLine,
    warning: compact(`${sajuProfile.strength.reason} ${currentLine}`),
    futureFlow: compact(`${sajuProfile.annualFlow.theme} ${sajuProfile.ageFlow.decadeLuckSummary}`),
    luckKeywords: [
      sajuProfile.dayMaster.label,
      ...getStrongWeakElements(sajuProfile).strong.map((element) => elementKorean[element]),
      sajuProfile.annualFlow.relationToDayMaster,
    ].filter(Boolean).slice(0, 5),
    evidenceCard: buildEvidenceCard(topic, sajuProfile),
    topicCards: buildTopicCards(topic, sajuProfile, currentLine),
    sajuOverview: buildSajuOverview(sajuProfile),
    resultSections: buildResultSections(topic, sajuProfile, currentLine, actionLine),
    topicInsight: topicReading,
    timeNotice,
  };
}
