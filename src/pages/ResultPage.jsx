import CharacterPortrait from '../components/CharacterPortrait.jsx';
import ElementGauge from '../components/ElementGauge.jsx';
import { elementLabels } from '../utils/fortune.js';
import { copyShareLink, generateShareText, saveResultImage, shareToKakao as shareToKakaoResult } from '../utils/share.js';

const sectionTabs = [
  ['summary', '종합'],
  ['temperament', '성격'],
  ['wealth', '재물'],
  ['career', '직업'],
  ['love', '연애'],
  ['business', '사업'],
  ['health', '건강'],
  ['decade', '대운'],
  ['year', '올해운'],
  ['action', '조언'],
];

export function shareToKakao(data) {
  console.log('Kakao share placeholder', data);
}

export async function copyLink(data) {
  return copyShareLink(data);
}

function fallbackSections(card) {
  return [
    {
      id: 'summary',
      title: '종합 사주 분석',
      subtitle: '핵심 흐름 정리',
      summary: card.traitSummary,
      detail: `${card.behavior} ${card.choiceReading}`,
      advice: card.advice,
      tags: card.keywords || ['전체운'],
    },
    {
      id: 'action',
      title: '실행 조언',
      subtitle: '지금 참고할 기준',
      summary: card.futureFlow,
      detail: card.strength,
      advice: card.caution,
      tags: ['실행조언', '주의점'],
    },
  ];
}

function splitText(text = '') {
  const normalized = String(text).replace(/\s+/g, ' ').trim();
  if (!normalized) return [];
  const matches = normalized.match(/[^.?!。]+[.?!。]?/g) || [normalized];
  return matches.map((line) => line.trim()).filter(Boolean);
}

function scrollToSection(id) {
  document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ResultPage({ result, characters, onHome, onRetry, onOtherCharacter }) {
  const { character, form, elements, finalCard, disclaimer } = result;
  const card = {
    strength: '사주 구조 안에서 오래 관찰하고 기준을 세우는 힘이 보입니다.',
    choiceReading: '답변은 현재 상황을 보정하는 참고값으로 반영했습니다.',
    futureFlow: '가까운 흐름에서는 작은 확인과 현실적인 기준이 중요합니다.',
    keywords: [],
    ...finalCard,
  };
  const sajuEvidence = card.sajuEvidence || null;
  const overview = card.sajuOverview || {
    title: '오늘의 사주 종합',
    dayMaster: sajuEvidence?.dayMaster || '-',
    fiveElements: sajuEvidence?.fiveElements
      ? Object.entries(sajuEvidence.fiveElements).map(([key, value]) => `${elementLabels[key]} ${value}`).join(' · ')
      : '-',
    yinYang: '입력값을 기준으로 사주 균형을 계산했습니다.',
    luckFlow: sajuEvidence?.annualFlow || card.futureFlow,
    oneLine: card.traitSummary || card.futureFlow,
  };
  const resultSections = card.resultSections?.length ? card.resultSections : fallbackSections(card);

  const share = () => {
    shareToKakaoResult(result);
  };

  const handleCopyLink = async () => {
    await copyLink(card);
    alert('링크를 클립보드에 복사했습니다.');
  };

  const nativeShare = async () => {
    const text = generateShareText(result);
    if (navigator.share) {
      await navigator.share({ title: '운명상담소 사주 결과', text });
      return;
    }
    await navigator.clipboard.writeText(text);
    alert('공유 문구를 클립보드에 복사했습니다.');
  };

  return (
    <div id="result-container" className="result-page mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
      <header id="result-header" className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#e7c873]">운명상담소 명리 리포트</p>
          <h1 className="font-serif text-3xl font-black text-white sm:text-4xl">{form.name || '당신'}님의 사주 분석</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onHome} className="button-ghost">처음으로</button>
          <button type="button" onClick={onRetry} className="button-ghost">다시 보기</button>
          <button type="button" onClick={share} className="button-gold">공유하기</button>
        </div>
      </header>

      <section className="result-overview">
        <div className="result-overview-main">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#e7c873]">{overview.title}</p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-white">{overview.oneLine}</h2>
            </div>
            <div className="result-face">
              <CharacterPortrait character={character} size="small" state="smile" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoTile label="일간" value={overview.dayMaster} />
            <InfoTile label="음양 균형" value={overview.yinYang} />
            <InfoTile label="오행 분포" value={overview.fiveElements} wide />
            <InfoTile label="대운·세운 흐름" value={overview.luckFlow} wide />
          </div>
        </div>

        <div className="result-evidence">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-xl font-bold text-white">기본 사주 요약</h2>
            <span className="rounded-[8px] bg-white/[0.08] px-3 py-1 text-xs text-white/58">{form.purpose}</span>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <dt>생년월일</dt>
            <dd>{form.birthDate}</dd>
            <dt>태어난 시간</dt>
            <dd>{form.birthTimeUnknown ? '미상' : form.birthTime}</dd>
            <dt>년월일시</dt>
            <dd>{sajuEvidence ? `${sajuEvidence.pillars.year} · ${sajuEvidence.pillars.month} · ${sajuEvidence.pillars.day} · ${sajuEvidence.pillars.hour}` : '-'}</dd>
            <dt>강한 기운</dt>
            <dd>{sajuEvidence?.strongElements?.join(', ') || '-'}</dd>
            <dt>보완 기운</dt>
            <dd>{sajuEvidence?.weakElements?.join(', ') || '-'}</dd>
            <dt>주요 십성</dt>
            <dd>{sajuEvidence?.topicTenGods?.join(', ') || '-'}</dd>
          </dl>
        </div>
      </section>

      <nav className="result-tabs" aria-label="사주 항목 목차">
        {sectionTabs.map(([id, label]) => (
          <button key={id} type="button" onClick={() => scrollToSection(id)}>
            {label}
          </button>
        ))}
      </nav>

      <section className="result-distribution">
        <div>
          <p className="text-sm font-semibold text-[#e7c873]">오행 분포</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-white">기운의 강약을 먼저 확인하세요</h2>
        </div>
        <div className="grid gap-3">
          {Object.entries(elements).map(([type, value]) => (
            <ElementGauge key={type} type={type} label={elementLabels[type]} value={value} />
          ))}
        </div>
      </section>

      <main className="result-section-list">
        {resultSections.map((section, index) => (
          <article key={section.id} id={`section-${section.id}`} className="result-analysis-card">
            <div className="result-section-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#e7c873]">{section.subtitle}</p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-white">{section.title}</h2>

              <div className="result-block highlight">
                <h3>한 줄 요약</h3>
                <p>{section.summary}</p>
              </div>

              <div className="result-block">
                <h3>상세 풀이</h3>
                {splitText(section.detail).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="result-block advice">
                <h3>실전 조언</h3>
                {splitText(section.advice).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="result-tags">
                {(section.tags || []).map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </main>

      <section id="result-actions" className="rounded-[8px] border border-white/12 bg-white/[0.06] p-5">
        <h2 className="font-serif text-2xl font-bold text-white">다른 상담가로 다시 보기</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">
          {characters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOtherCharacter(item.id)}
              className="rounded-[8px] border border-white/10 bg-white/[0.06] px-3 py-3 text-sm text-white/78 transition hover:border-[#e7c873]/60 hover:text-white"
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={nativeShare} className="button-gold">간단 공유</button>
          <button type="button" onClick={handleCopyLink} className="button-ghost">링크 복사</button>
          <button type="button" onClick={() => saveResultImage(result)} className="button-ghost">결과 이미지 저장</button>
        </div>
        <p className="mt-4 rounded-[8px] border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/50">
          {disclaimer}
        </p>
      </section>
    </div>
  );
}

function InfoTile({ label, value, wide = false }) {
  return (
    <div className={`result-info-tile ${wide ? 'sm:col-span-2' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
