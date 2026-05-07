import {
  earthlyBranches,
  elementCounselWords,
  elementKorean,
  heavenlyStems,
  tenGodDescriptions,
} from './sajuDictionary.js';

const stems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const branches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
const cycle = Array.from({ length: 60 }, (_, index) => ({
  stem: stems[index % 10],
  branch: branches[index % 12],
}));

const elementOrder = ['wood', 'fire', 'earth', 'metal', 'water'];
const producedBy = { wood: 'water', fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal' };
const produces = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
const controls = { wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire' };
const controlledBy = { wood: 'metal', fire: 'water', earth: 'wood', metal: 'fire', water: 'earth' };

function mod(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

function getCycleByIndex(index) {
  return cycle[mod(index, 60)];
}

function parseDate(value) {
  const [year, month, day] = String(value || '').split('-').map(Number);
  return { year, month, day, date: new Date(Date.UTC(year || 2000, (month || 1) - 1, day || 1)) };
}

function getYearPillar({ year, month, day }) {
  const sajuYear = month < 2 || (month === 2 && day < 4) ? year - 1 : year;
  return getCycleByIndex(sajuYear - 4);
}

function getMonthBranchIndex(month, day) {
  const solarMonth = day < 4 ? month - 1 : month;
  const normalized = solarMonth < 1 ? 12 : solarMonth;
  return mod(normalized + 1, 12);
}

function getMonthPillar(yearStem, month, day) {
  const branchIndex = getMonthBranchIndex(month, day);
  const tigerStemStart = {
    갑: 2,
    기: 2,
    을: 4,
    경: 4,
    병: 6,
    신: 6,
    정: 8,
    임: 8,
    무: 0,
    계: 0,
  }[yearStem];
  const monthOffsetFromTiger = mod(branchIndex - 2, 12);
  return {
    stem: stems[mod(tigerStemStart + monthOffsetFromTiger, 10)],
    branch: branches[branchIndex],
  };
}

function julianDayNumber(date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function getDayPillar(date) {
  return getCycleByIndex(julianDayNumber(date) + 49);
}

function getHourBranchIndex(time) {
  const [hourText] = String(time || '12:00').split(':');
  const hour = Number(hourText);
  if (hour === 23 || hour === 0) return 0;
  return Math.floor((hour + 1) / 2) % 12;
}

function getHourPillar(dayStem, birthTime, unknown) {
  if (unknown) return { stem: null, branch: null, unknown: true };
  const branchIndex = getHourBranchIndex(birthTime);
  const ratStemStart = {
    갑: 0,
    기: 0,
    을: 2,
    경: 2,
    병: 4,
    신: 4,
    정: 6,
    임: 6,
    무: 8,
    계: 8,
  }[dayStem];
  return {
    stem: stems[mod(ratStemStart + branchIndex, 10)],
    branch: branches[branchIndex],
    unknown: false,
  };
}

function relationToTenGod(dayStem, targetStem) {
  if (!targetStem) return null;
  const day = heavenlyStems[dayStem];
  const target = heavenlyStems[targetStem];
  if (!day || !target) return null;
  const samePolarity = day.yinYang === target.yinYang;

  if (day.element === target.element) return samePolarity ? '비견' : '겁재';
  if (produces[day.element] === target.element) return samePolarity ? '식신' : '상관';
  if (controls[day.element] === target.element) return samePolarity ? '편재' : '정재';
  if (controlledBy[day.element] === target.element) return samePolarity ? '편관' : '정관';
  if (producedBy[day.element] === target.element) return samePolarity ? '편인' : '정인';
  return null;
}

function emptyElements() {
  return { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
}

function addStemProfile(stem, fiveElements, yinYangBalance, tenGods, dayStem, weight = 1) {
  const info = heavenlyStems[stem];
  if (!info) return;
  fiveElements[info.element] += weight;
  yinYangBalance[info.yinYang] += weight;
  const tenGod = relationToTenGod(dayStem, stem);
  if (tenGod) tenGods[tenGod] = (tenGods[tenGod] || 0) + weight;
}

function addBranchProfile(branch, fiveElements, yinYangBalance, tenGods, dayStem) {
  const info = earthlyBranches[branch];
  if (!info) return;
  fiveElements[info.element] += 1;
  yinYangBalance[info.yinYang] += 1;
  for (const hiddenStem of info.hiddenStems || []) {
    addStemProfile(hiddenStem, fiveElements, yinYangBalance, tenGods, dayStem, 0.35);
  }
}

function buildDistribution(pillars, dayStem) {
  const fiveElements = emptyElements();
  const yinYangBalance = { yin: 0, yang: 0 };
  const tenGods = {
    비견: 0,
    겁재: 0,
    식신: 0,
    상관: 0,
    편재: 0,
    정재: 0,
    편관: 0,
    정관: 0,
    편인: 0,
    정인: 0,
  };

  for (const pillar of Object.values(pillars)) {
    if (pillar.unknown) continue;
    addStemProfile(pillar.stem, fiveElements, yinYangBalance, tenGods, dayStem, 1);
    addBranchProfile(pillar.branch, fiveElements, yinYangBalance, tenGods, dayStem);
  }

  return {
    fiveElements: Object.fromEntries(Object.entries(fiveElements).map(([key, value]) => [key, Number(value.toFixed(2))])),
    yinYangBalance: Object.fromEntries(Object.entries(yinYangBalance).map(([key, value]) => [key, Number(value.toFixed(2))])),
    tenGods: Object.fromEntries(Object.entries(tenGods).map(([key, value]) => [key, Number(value.toFixed(2))])),
  };
}

function estimateStrength(dayMasterElement, monthBranch, fiveElements) {
  const monthElement = earthlyBranches[monthBranch]?.element;
  const support = (fiveElements[dayMasterElement] || 0) + (fiveElements[producedBy[dayMasterElement]] || 0);
  const pressure = (fiveElements[produces[dayMasterElement]] || 0) + (fiveElements[controls[dayMasterElement]] || 0) + (fiveElements[controlledBy[dayMasterElement]] || 0);
  const seasonalBonus = monthElement === dayMasterElement || monthElement === producedBy[dayMasterElement] ? 1.2 : 0;
  const score = support + seasonalBonus - pressure * 0.45;
  const label = score >= 3.2 ? '강한 편' : score >= 1.8 ? '중간' : '약한 편';
  const reason = label === '강한 편'
    ? '자기 기운과 도와주는 기운이 충분해 마음의 기준을 오래 지키는 쪽입니다.'
    : label === '중간'
      ? '받쳐주는 힘과 흔드는 힘이 같이 있어 상황에 따라 반응이 달라집니다.'
      : '기운을 밖으로 쓰는 흐름이 많아 쉽게 지치거나 결정을 미루기 쉽습니다.';
  return { dayMasterStrength: label, reason };
}

function estimateUsefulElements(dayMasterElement, strength, fiveElements) {
  const sorted = Object.entries(fiveElements).sort((a, b) => a[1] - b[1]);
  const weakest = sorted.slice(0, 2).map(([key]) => key);
  const strongest = [...sorted].reverse().slice(0, 2).map(([key]) => key);
  const favorable = strength.dayMasterStrength === '강한 편'
    ? [produces[dayMasterElement], controls[dayMasterElement], ...weakest]
    : [dayMasterElement, producedBy[dayMasterElement], ...weakest];
  return {
    favorable: [...new Set(favorable)].slice(0, 3),
    caution: [...new Set(strongest)].slice(0, 2),
  };
}

function buildAnnualFlow(dayStem, fiveElements) {
  const currentYear = new Date().getFullYear();
  const currentYearStemBranch = getCycleByIndex(currentYear - 4);
  const relationToDayMaster = relationToTenGod(dayStem, currentYearStemBranch.stem);
  const branchElement = earthlyBranches[currentYearStemBranch.branch]?.element;
  const elementState = fiveElements[branchElement] <= 1.5 ? '보완' : fiveElements[branchElement] >= 3 ? '과다' : '균형';
  const themeByTenGod = {
    비견: '내 기준이 강해지고 독립적인 선택이 늘어나는 해입니다.',
    겁재: '사람과 돈의 경계가 중요해지는 해입니다.',
    식신: '꾸준히 드러내고 결과를 쌓기 좋은 해입니다.',
    상관: '표현은 강해지지만 말과 충돌을 조심해야 하는 해입니다.',
    편재: '기회와 지출이 함께 커질 수 있는 해입니다.',
    정재: '돈과 현실 계획을 차분히 정리하기 좋은 해입니다.',
    편관: '압박이 있어도 결단하면 방향이 잡히는 해입니다.',
    정관: '책임, 약속, 관계의 틀이 중요해지는 해입니다.',
    편인: '직관과 새로운 배움이 강해지는 해입니다.',
    정인: '보호받고 배우며 기반을 다지기 좋은 해입니다.',
  };
  const supportLine = elementState === '보완'
    ? `${elementKorean[branchElement]}의 기운이 부족한 곳을 채워주는 쪽입니다.`
    : elementState === '과다'
      ? `${elementKorean[branchElement]}의 기운이 이미 많아 과하게 쓰이지 않게 봐야 합니다.`
      : `${elementKorean[branchElement]}의 기운은 비교적 균형 있게 들어옵니다.`;
  return {
    currentYearStemBranch: `${currentYearStemBranch.stem}${currentYearStemBranch.branch}`,
    relationToDayMaster,
    theme: `${themeByTenGod[relationToDayMaster] || '올해 흐름은 기본 기운을 다시 정리하게 합니다.'} ${supportLine}`,
  };
}

function getKoreanAge(birthDate) {
  const { year } = parseDate(birthDate);
  return new Date().getFullYear() - year + 1;
}

function buildAgeFlow(birthInfo) {
  const currentAge = getKoreanAge(birthInfo.birthDate);
  const decade = Math.floor(currentAge / 10) * 10;
  const decadeLuckSummary = decade < 20
    ? '관계, 자기이해, 감정 변화가 크게 들어오는 시기입니다.'
    : decade < 30
      ? '연애, 진로, 경제 독립을 함께 배우는 시기입니다.'
      : decade < 40
        ? '커리어, 결혼, 자산처럼 선택의 책임이 커지는 시기입니다.'
        : decade < 50
          ? '안정, 사업, 자산, 관계 재정리를 현실적으로 보게 되는 시기입니다.'
          : '쌓아온 기준을 다시 정리하고 삶의 균형을 조정하는 시기입니다.';
  return { currentAge, decadeLuckSummary };
}

function normalizeBirthInfo(birthInfo = {}) {
  return {
    name: birthInfo.name || '당신',
    gender: birthInfo.gender || '선택 안 함',
    birthDate: birthInfo.birthDate,
    birthTime: birthInfo.birthTime || '12:00',
    birthTimeUnknown: Boolean(birthInfo.birthTimeUnknown),
  };
}

export function normalizeElementsToPercent(fiveElements) {
  const total = Object.values(fiveElements || {}).reduce((sum, value) => sum + value, 0) || 1;
  const normalized = Object.fromEntries(
    elementOrder.map((key) => [key, Math.round(((fiveElements?.[key] || 0) / total) * 100)]),
  );
  const diff = 100 - Object.values(normalized).reduce((sum, value) => sum + value, 0);
  normalized.water += diff;
  return normalized;
}

export function describeElementList(elements = []) {
  return elements.map((element) => `${elementKorean[element]}(${elementCounselWords[element]?.[0] || ''})`).join(', ');
}

export function generateSajuProfile(rawBirthInfo) {
  const birthInfo = normalizeBirthInfo(rawBirthInfo);
  const parsed = parseDate(birthInfo.birthDate);
  const year = getYearPillar(parsed);
  const month = getMonthPillar(year.stem, parsed.month, parsed.day);
  const day = getDayPillar(parsed.date);
  const hour = getHourPillar(day.stem, birthInfo.birthTime, birthInfo.birthTimeUnknown);
  const pillars = { year, month, day, hour };
  const dayMasterInfo = heavenlyStems[day.stem];
  const { fiveElements, yinYangBalance, tenGods } = buildDistribution(pillars, day.stem);
  const strength = estimateStrength(dayMasterInfo.element, month.branch, fiveElements);
  const usefulElements = estimateUsefulElements(dayMasterInfo.element, strength, fiveElements);
  const annualFlow = buildAnnualFlow(day.stem, fiveElements);
  const ageFlow = buildAgeFlow(birthInfo);

  return {
    pillars,
    dayMaster: {
      stem: day.stem,
      element: dayMasterInfo.element,
      yinYang: dayMasterInfo.yinYang,
      label: dayMasterInfo.label,
    },
    fiveElements,
    yinYangBalance,
    tenGods,
    strength,
    usefulElements,
    annualFlow,
    ageFlow,
    notes: birthInfo.birthTimeUnknown
      ? ['태어난 시간이 없어 일부 해석은 간략화됩니다.']
      : [],
    dayMasterDescription: dayMasterInfo.description,
    tenGodDescriptions,
  };
}
