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
    topicInsight: topicReading,
    timeNotice,
  };
}
