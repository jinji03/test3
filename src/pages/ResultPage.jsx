import AdSlot from '../components/AdSlot.jsx';
import CharacterPortrait from '../components/CharacterPortrait.jsx';
import ElementGauge from '../components/ElementGauge.jsx';
import { elementLabels } from '../utils/fortune.js';

export function shareToKakao(data) {
  console.log('Kakao share placeholder', data);
}

export async function copyLink(data) {
  const params = new URLSearchParams({
    character: data.characterName,
    topic: data.topic,
  });
  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  await navigator.clipboard.writeText(url);
  return url;
}

export default function ResultPage({ result, characters, onHome, onRetry, onOtherCharacter }) {
  const { character, form, elements, summary, purposeReading, finalCard, disclaimer } = result;
  const card = {
    strength: '상황을 오래 관찰하고 쉽게 포기하지 않는 힘이 있습니다.',
    choiceReading: '상담 중 선택한 답변을 바탕으로 현재 행동 패턴을 함께 읽었습니다.',
    futureFlow: '가까운 흐름에서는 작은 확인과 현실적인 대화가 다음 선택을 선명하게 만들 수 있습니다.',
    ...finalCard,
  };

  const share = () => {
    shareToKakao(card);
  };

  const handleCopyLink = async () => {
    await copyLink(card);
    alert('링크를 클립보드에 복사했습니다.');
  };

  const nativeShare = async () => {
    const text = `운명상담소에서 ${character.name}에게 ${form.purpose} 상담을 봤어요. ${card.traitSummary}.`;
    if (navigator.share) {
      await navigator.share({ title: '운명상담소 상담 결과', text });
      return;
    }
    await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
    alert('공유 문구를 클립보드에 복사했습니다.');
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#e7c873]">{character.name}의 상담 결과</p>
          <h1 className="font-serif text-3xl font-black text-white sm:text-4xl">{form.purpose} 흐름 해석</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onHome} className="button-ghost">처음으로</button>
          <button type="button" onClick={onRetry} className="button-ghost">결과 다시 보기</button>
          <button type="button" onClick={share} className="button-gold">공유하기</button>
          <button type="button" onClick={handleCopyLink} className="button-ghost">링크 복사</button>
        </div>
      </header>

      <section className="relative overflow-hidden rounded-[8px] border border-white/12 bg-[#130d2b] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_18%,rgba(231,200,115,0.18),transparent_24%),radial-gradient(circle_at_22%_28%,rgba(124,58,237,0.2),transparent_28%),linear-gradient(180deg,#201548_0%,#100b24_64%,#080510_100%)]" />
        <div className="relative z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/18 px-4 text-sm text-white/64 backdrop-blur sm:px-6">
          <span>{form.purpose} 상담실</span>
          <span>{character.title}</span>
        </div>
        <div className="relative z-10 grid items-stretch gap-4 px-4 py-5 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div className="space-y-4">
            <div className="rounded-[8px] border border-white/10 bg-black/22 p-4 backdrop-blur">
            <h2 className="font-serif text-2xl font-bold text-white">오행 분석</h2>
            <div className="mt-4 space-y-3">
              {Object.entries(elements).map(([type, value]) => (
                <ElementGauge key={type} type={type} label={elementLabels[type]} value={value} />
              ))}
            </div>
            </div>

            <div className="rounded-[8px] border border-[#e7c873]/35 bg-[#0b0718]/88 p-4 shadow-[0_0_34px_rgba(0,0,0,0.35)] backdrop-blur sm:p-5">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-[8px] bg-[#e7c873] px-4 py-2 font-serif text-lg font-bold text-[#25130a]">{character.name}</span>
                <span className="text-sm text-white/52">지금 당신에게 전하는 말</span>
              </div>
              <div className="space-y-3 text-sm leading-7 text-white/84 sm:text-base sm:leading-8">
                <p className="font-semibold text-[#f8e7aa]">오행 기반 성향 해석</p>
                {summary.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p className="pt-2 font-semibold text-[#f8e7aa]">{form.purpose} 상담</p>
                {purposeReading.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="result-stage min-h-[520px] overflow-hidden rounded-[8px] border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(231,200,115,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.12))]">
            <CharacterPortrait character={character} size="novel" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-4">
          <div className="rounded-[8px] border border-white/12 bg-white/[0.07] p-5">
            <h2 className="font-serif text-2xl font-bold text-white">입력 정보 요약</h2>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <dt className="text-white/52">이름</dt>
              <dd className="text-right text-white">{form.name}</dd>
              <dt className="text-white/52">생년월일</dt>
              <dd className="text-right text-white">{form.birthDate}</dd>
              <dt className="text-white/52">태어난 시간</dt>
              <dd className="text-right text-white">{form.birthTimeUnknown ? '기억나지 않음' : form.birthTime}</dd>
              <dt className="text-white/52">성별</dt>
              <dd className="text-right text-white">{form.gender}</dd>
              <dt className="text-white/52">상담 목적</dt>
              <dd className="text-right text-white">{form.purpose}</dd>
            </dl>
          </div>
        </aside>

        <section className="space-y-4">
          <div className="rounded-[8px] border border-white/12 bg-white/[0.07] p-5 text-sm leading-7 text-white/72">
            <h2 className="font-serif text-2xl font-bold text-white">상담 기록</h2>
            <p className="mt-3">위 대화창에 표시된 결과를 다시 정리했습니다. 같은 입력값은 같은 오행 비율로 계산되며, 캐릭터별 상담 스타일만 다르게 표현됩니다.</p>
          </div>

          <AdSlot label="추가 상세 운세 보기 전 광고 영역" />

          <div className="rounded-[8px] border border-[#e7c873]/35 bg-[#e7c873]/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#f8e7aa]">최종 결론 카드</p>
                <h2 className="text-xl font-bold text-white">{card.name}님의 {card.topic}</h2>
              </div>
              <button type="button" onClick={nativeShare} className="button-gold">간단 공유</button>
            </div>
            <div className="mt-5 grid gap-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
              <p><strong className="text-white">캐릭터</strong><br />{card.characterName}</p>
              <p><strong className="text-white">성향 요약</strong><br />{card.traitSummary}.</p>
              <p><strong className="text-white">선택 기반 해석</strong><br />{card.choiceReading}</p>
              <p><strong className="text-white">행동 설명</strong><br />{card.behavior}</p>
              <p><strong className="text-white">장점</strong><br />{card.strength}</p>
              <p><strong className="text-white">조언</strong><br />{card.advice}</p>
              <p><strong className="text-white">주의점</strong><br />{card.caution}</p>
              <p><strong className="text-white">미래 흐름</strong><br />{card.futureFlow}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.keywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-[#e7c873]/30 bg-black/18 px-3 py-1 text-sm text-[#ffe9a6]">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/50">
            {disclaimer}
          </div>
        </section>
      </section>

      <section className="rounded-[8px] border border-white/12 bg-white/[0.06] p-5">
        <h2 className="font-serif text-2xl font-bold text-white">다른 운명가에게 다시 보기</h2>
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
      </section>
    </div>
  );
}
